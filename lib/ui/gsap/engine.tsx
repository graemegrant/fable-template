'use client';

/**
 * The GSAP motion engine (AGENTS.md §5a), shared by any look that uses it.
 *
 * - Loads GSAP, ScrollTrigger, SplitText and (desktop only) Lenis after
 *   hydration, as separate chunks: nothing is in the page's main bundle.
 * - Runs in `full` mode on desktop and `soft` mode on phones and tablets
 *   (if the hotel allows it; see settings.ts). Never under reduced motion.
 * - Restarts in the right mode if the window crosses the breakpoint, and
 *   tears down completely (every scene reverts to the still page) if
 *   reduced motion is switched on.
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
import { MOTION_QUERY, SOFT_QUERY, resolveMotion, type MotionMode, type MotionPatterns, type ResolvedMotion } from './settings';
import './motion.css';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type SplitTextType = typeof import('gsap/SplitText').SplitText;

export interface MotionEngine {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerType;
  SplitText: SplitTextType;
  lenis: Lenis | null;
  /** `full` on desktop, `soft` on phones and tablets. */
  mode: MotionMode;
  settings: ResolvedMotion;
  /** Multiply travel distances and durations by this (intensity and mode). */
  scale: number;
}

/** The hotel's resolved settings for desktop. Safe on the server. */
export const motionSettings = resolveMotion(hotelConfig.motion);

const EngineContext = createContext<MotionEngine | null>(null);

/** The running engine, or null (reduced motion, still loading, off). */
export function useMotionEngine() {
  return useContext(EngineContext);
}

/** Which mode this screen should run in, or null for the still page. */
function currentMode(): MotionMode | null {
  if (window.matchMedia(MOTION_QUERY).matches) return 'full';
  if (motionSettings.soft && window.matchMedia(SOFT_QUERY).matches) return 'soft';
  return null;
}

/** True when the engine arrived after motion.css's failsafe has already
 *  shown the intro elements: playing their entrance then would hide them
 *  again, so scenes skip it and leave them as they are. */
export function lateIntro() {
  return !document.documentElement.classList.contains('motion-ready') && performance.now() > 2300;
}

export function GsapEngine({ children }: { children: ReactNode }) {
  const [engine, setEngine] = useState<MotionEngine | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!motionSettings.enabled) return;
    const root = document.documentElement;
    const queries = [window.matchMedia(MOTION_QUERY), window.matchMedia(SOFT_QUERY)];
    let running: { mode: MotionMode; stop: () => void } | null = null;
    let generation = 0;

    const start = async (mode: MotionMode) => {
      const mine = ++generation;
      try {
        const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('gsap/SplitText'),
        ]);
        gsap.registerPlugin(ScrollTrigger, SplitText);
        const settings = resolveMotion(hotelConfig.motion, mode);
        let lenis: Lenis | null = null;
        let raf: ((time: number) => void) | null = null;
        if (settings.smoothScroll) {
          const { default: LenisClass } = await import('lenis');
          lenis = new LenisClass({ lerp: 0.09, smoothWheel: true, anchors: true, autoRaf: false });
          lenis.on('scroll', ScrollTrigger.update);
          raf = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(raf);
          gsap.ticker.lagSmoothing(0);
        } else {
          // Phones: the address bar showing and hiding resizes the
          // viewport; don't re-measure every scene for it.
          ScrollTrigger.config({ ignoreMobileResize: true });
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
          mode,
          stop: () => {
            lock.disconnect();
            window.removeEventListener('load', refresh);
            if (raf) gsap.ticker.remove(raf);
            lenis?.destroy();
          },
        };
        root.dataset.motion = mode;
        setEngine({ gsap, ScrollTrigger, SplitText, lenis, mode, settings, scale: settings.scale });
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
      delete root.dataset.motion;
    };

    const sync = () => {
      const mode = currentMode();
      if (running?.mode === mode) return;
      if (running) stop();
      if (mode) start(mode);
    };
    sync();
    queries.forEach((q) => q.addEventListener('change', sync));
    return () => {
      queries.forEach((q) => q.removeEventListener('change', sync));
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

/** Classes for an element that plays an entrance on load: hidden by
 *  motion.css until the engine has set its start state, on desktop and
 *  (when the hotel has soft mobile motion) on phones too. Empty when the
 *  pattern won't run. Safe on the server. */
export function introClass(pattern: keyof MotionPatterns | null) {
  if (!motionSettings.enabled || (pattern && !motionSettings.patterns[pattern])) return '';
  return motionSettings.soft ? ' motion-intro motion-intro-soft' : ' motion-intro';
}
