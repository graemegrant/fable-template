'use client';

/**
 * The GSAP motion engine (AGENTS.md §5a), shared by any look that uses it.
 *
 * - Loads GSAP, ScrollTrigger, SplitText and (if enabled) Lenis after
 *   hydration, and only when MOTION_QUERY matches: a desktop-width screen
 *   with no reduced-motion preference. None of it is in the JavaScript a
 *   phone downloads, so mobile Core Web Vitals are untouched.
 * - Tears everything down if the query stops matching (window narrowed,
 *   reduced motion switched on), and every scene reverts to the still page.
 * - Pauses Lenis whenever something locks page scroll (the menu and the
 *   booking modal set body overflow: hidden), so they scroll natively.
 * - Everything fails visible: scenes set their start states from
 *   JavaScript, so with no JS, a slow network or an error the page simply
 *   shows. The only CSS-hidden elements are `.motion-intro` ones, and
 *   motion.css shows those after 2.5 s regardless.
 */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';
import { hotelConfig } from '@/hotel.config';
import { MOTION_QUERY, resolveMotion, type MotionPatterns, type ResolvedMotion } from './settings';
import './motion.css';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type SplitTextType = typeof import('gsap/SplitText').SplitText;

export interface MotionEngine {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerType;
  SplitText: SplitTextType;
  lenis: Lenis | null;
  settings: ResolvedMotion;
  /** Multiply travel distances and durations by this (intensity). */
  scale: number;
}

/** The hotel's resolved settings. Safe on the server. */
export const motionSettings = resolveMotion(hotelConfig.motion);

const EngineContext = createContext<MotionEngine | null>(null);

/** The running engine, or null (phones, reduced motion, still loading, off). */
export function useMotionEngine() {
  return useContext(EngineContext);
}

export function GsapEngine({ children }: { children: ReactNode }) {
  const [engine, setEngine] = useState<MotionEngine | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!motionSettings.enabled) return;
    const root = document.documentElement;
    const mq = window.matchMedia(MOTION_QUERY);
    let running: { lenis: Lenis | null; stop: () => void } | null = null;
    let generation = 0;

    const start = async () => {
      const mine = ++generation;
      try {
        const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('gsap/SplitText'),
        ]);
        gsap.registerPlugin(ScrollTrigger, SplitText);
        let lenis: Lenis | null = null;
        let raf: ((time: number) => void) | null = null;
        if (motionSettings.smoothScroll) {
          const { default: LenisClass } = await import('lenis');
          lenis = new LenisClass({ lerp: 0.09, smoothWheel: true, anchors: true, autoRaf: false });
          lenis.on('scroll', ScrollTrigger.update);
          raf = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(raf);
          gsap.ticker.lagSmoothing(0);
        }
        if (mine !== generation) {
          lenis?.destroy();
          if (raf) gsap.ticker.remove(raf);
          return;
        }

        // Menu or booking modal open → native scrolling for them, page held.
        const lock = new MutationObserver(() => {
          if (document.body.style.overflow === 'hidden') lenis?.stop();
          else lenis?.start();
        });
        lock.observe(document.body, { attributes: true, attributeFilter: ['style'] });

        // Measure again once fonts and late images have settled.
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener('load', refresh, { once: true });

        running = {
          lenis,
          stop: () => {
            lock.disconnect();
            window.removeEventListener('load', refresh);
            if (raf) gsap.ticker.remove(raf);
            lenis?.destroy();
          },
        };
        setEngine({ gsap, ScrollTrigger, SplitText, lenis, settings: motionSettings, scale: motionSettings.scale });
      } catch {
        // Never leave intro elements hidden because a chunk failed to load.
        root.classList.add('motion-failed');
      }
    };

    const stop = () => {
      generation++;
      setEngine(null); // scenes revert on this render
      running?.stop();
      running = null;
      root.classList.remove('motion-ready');
    };

    const sync = () => (mq.matches ? running || start() : stop());
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      stop();
    };
  }, []);

  // Scenes' effects run before this one (children first), so intro elements
  // already hold their start state when .motion-intro stops hiding them.
  useEffect(() => {
    if (engine) document.documentElement.classList.add('motion-ready');
  }, [engine]);

  // A new page: re-measure scenes once its content is in.
  useEffect(() => {
    if (!engine) return;
    engine.lenis?.resize();
    const id = requestAnimationFrame(() => engine.ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [engine, pathname]);

  return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>;
}

/**
 * Runs a scene on an element while the engine is running and the pattern is
 * on. Everything created inside `build` (tweens, ScrollTriggers, SplitText)
 * is reverted on unmount, on navigation, or when the engine stops; `build`
 * may also return its own cleanup.
 */
export function useScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  pattern: keyof MotionPatterns | null,
  build: (engine: MotionEngine, el: T) => void | (() => void),
) {
  const engine = useMotionEngine();
  const buildRef = useRef(build);
  buildRef.current = build;
  useEffect(() => {
    const el = ref.current;
    if (!engine || !el) return;
    if (pattern && !engine.settings.patterns[pattern]) return;
    const ctx = engine.gsap.context(() => buildRef.current(engine, el), el);
    return () => ctx.revert();
  }, [engine, pattern, ref]);
}

/** True when a pattern will run on desktop for this hotel, so its intro
 *  element may render with `.motion-intro`. Safe on the server. */
export function introFor(pattern: keyof MotionPatterns) {
  return motionSettings.enabled && motionSettings.patterns[pattern];
}
