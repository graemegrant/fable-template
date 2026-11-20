'use client';

/**
 * Reusable motion patterns (AGENTS.md §5a). Behaviour only: each renders a
 * plain element and takes its look's classes, so any look can use them.
 *
 * Rules every pattern keeps:
 * - Real HTML text and headings. SplitText's `aria: 'auto'` labels the
 *   element with its full text and hides the split pieces from screen
 *   readers; crawlers read the server HTML, which is never split.
 * - Transform and opacity only, so the browser composites on the GPU and
 *   nothing reflows.
 * - Start states are set from JavaScript (fail visible), except elements
 *   given `.motion-intro`, which motion.css times out after 2.5 s.
 * - Desktop gets everything (`full`); phones and tablets get the soft mode
 *   at lighter travel, without pinned scenes or the cursor; reduced
 *   motion gets nothing (engine.tsx).
 */
import { Children, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { introClass, lateIntro, useMotionEngine, useScene } from './engine';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span' | 'blockquote';

/** How the split pieces are exposed to assistive technology. ARIA lets
 *  headings and blockquotes carry an aria-label (SplitText labels them with
 *  the full text and hides the pieces); paragraphs and spans may not, so
 *  there the pieces stay as plain inline spans that read as normal text. */
const ariaFor = (tag: Tag) =>
  (['h1', 'h2', 'h3', 'blockquote'].includes(tag) ? { aria: 'auto', tag: 'div' } : { aria: 'none', tag: 'span' }) as {
    aria: 'auto' | 'none';
    tag: string;
  };

/**
 * A heading that rises in, masked by its own lines.
 * - by="chars": letter by letter (display titles, short words)
 * - by="lines": line by line (longer headings and statements)
 * `onLoad` plays it straight away (above the fold) instead of on scroll.
 */
export function SplitHeading({
  as = 'h2',
  by = 'lines',
  onLoad = false,
  delay = 0,
  className,
  children,
}: {
  as?: Tag;
  by?: 'chars' | 'words' | 'lines';
  onLoad?: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const Element = as as ElementType;
  useScene(ref, 'splitHeadings', ({ gsap, SplitText, scale }, el) => {
    // Too late for an entrance: motion.css has already shown it.
    if (onLoad && lateIntro()) return;
    SplitText.create(el, {
      type: by === 'lines' ? 'lines' : `lines,${by}`,
      linesClass: 'split-line',
      mask: 'lines',
      ...ariaFor(as),
      autoSplit: true,
      onSplit(self) {
        const targets = by === 'chars' ? self.chars : by === 'words' ? self.words : self.lines;
        return gsap.from(targets, {
          yPercent: 115,
          rotate: by === 'chars' ? 4 : 0,
          duration: 0.9 + 0.35 * scale,
          ease: 'expo.out',
          stagger: by === 'chars' ? 0.025 : by === 'words' ? 0.05 : 0.11,
          delay,
          ...(onLoad ? {} : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
        });
      },
    });
  });
  return (
    <Element ref={ref} className={`${className ?? ''}${onLoad ? introClass('splitHeadings') : ''}`}>
      {children}
    </Element>
  );
}

/**
 * A statement paragraph that lights up word by word, tied to the scroll
 * position (the manifesto intro). Readable at every point: words start dim,
 * never invisible.
 */
export function WordReveal({ as = 'p', className, children }: { as?: Tag; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const Element = as as ElementType;
  useScene(ref, 'wordReveal', ({ gsap, SplitText }, el) => {
    SplitText.create(el, {
      type: 'words',
      ...ariaFor(as),
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
          },
        );
      },
    });
  });
  return (
    <Element ref={ref} className={className}>
      {children}
    </Element>
  );
}

/**
 * A photograph that opens like a curtain from below and settles from a
 * slight zoom. The frame (className) holds the layout and clips; give it
 * an aspect ratio or a height. Children fill it (e.g. next/image `fill`).
 */
export function Curtain({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, 'imageCurtain', ({ gsap, scale }, el) => {
    const [mover, counter] = [el.firstElementChild, el.firstElementChild?.firstElementChild];
    if (!mover || !counter) return;
    const tl = gsap.timeline({
      defaults: { duration: 1.1 + 0.4 * scale, ease: 'expo.inOut' },
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
    tl.from(mover, { yPercent: 100 }).from(counter, { yPercent: -100 }, 0).from(counter, { scale: 1 + 0.18 * scale, duration: 1.8 + 0.4 * scale, ease: 'expo.out' }, 0.15);
  });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}

/**
 * A photograph drifting slower than the page inside its frame. The image is
 * scaled up slightly so the drift never shows an edge.
 */
export function Parallax({ className, depth = 1, children }: { className?: string; depth?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, 'parallax', ({ gsap, scale }, el) => {
    const inner = el.firstElementChild;
    if (!inner) return;
    const travel = 8 * depth * scale;
    gsap.set(inner, { scale: 1 + (travel * 2.4) / 100 });
    gsap.fromTo(
      inner,
      { yPercent: -travel },
      { yPercent: travel, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

/**
 * A film strip: on desktop the section holds while its track runs sideways
 * with the scroll; elsewhere the track is a native swipe/scroll row with
 * snap points. `track` classes must make it a horizontal flex row with
 * overflow-x-auto. `aside` renders beside the strip (heading, counter).
 * Scrolling stays in the visitor's hands throughout: no snapping, no
 * auto-advance, and the scroll distance matches the track's width.
 */
export function Reel({
  className,
  trackClassName,
  progressClassName,
  children,
}: {
  className?: string;
  trackClassName?: string;
  /** Classes for a thin progress bar under the strip (desktop only). */
  progressClassName?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, 'roomsReel', ({ gsap, scale }, el) => {
    const track = el.querySelector<HTMLElement>('[data-reel-track]');
    const bar = el.querySelector<HTMLElement>('[data-reel-progress]');
    if (!track) return;
    el.setAttribute('data-reel-active', '');
    const distance = () => Math.max(0, track.scrollWidth - el.clientWidth);
    // The strip leans into the motion with the scroll's speed, like film
    // running through a gate, and straightens when the scroll stops.
    const lean = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' });
    const maxLean = 4 * scale;
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'center center',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress });
          lean(gsap.utils.clamp(-maxLean, maxLean, self.getVelocity() / -500));
        },
        onScrubComplete: () => lean(0),
      },
    });
    return () => el.removeAttribute('data-reel-active');
  });
  return (
    <div ref={ref} className={className}>
      <div data-reel-track className={trackClassName}>
        {children}
      </div>
      {progressClassName && <div aria-hidden data-reel-progress className={progressClassName} />}
    </div>
  );
}

/**
 * Children rise into place as they scroll into view, a few at a time
 * (card grids, figures, quotes). Each direct child is one item.
 */
export function Reveal({
  as = 'div',
  className,
  stagger = 0.09,
  children,
}: {
  as?: 'div' | 'ul' | 'ol' | 'section';
  className?: string;
  stagger?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const Element = as as ElementType;
  useScene(ref, 'reveals', ({ gsap, ScrollTrigger, scale }, el) => {
    const items = [...el.children] as HTMLElement[];
    if (!items.length) return;
    gsap.set(items, { autoAlpha: 0, y: 60 * scale });
    ScrollTrigger.batch(items, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1 + 0.3 * scale, ease: 'expo.out', stagger, overwrite: true }),
    });
  });
  return (
    <Element ref={ref} className={className}>
      {children}
    </Element>
  );
}

/**
 * A line of huge type that slides sideways as the page scrolls, in either
 * direction. Decorative (the words repeat), so it is hidden from screen
 * readers: give it nothing that isn't said elsewhere on the page. Still,
 * it is simply a cropped line of type.
 */
export function ScrollMarquee({
  direction = 1,
  className,
  children,
}: {
  /** 1 slides right as you scroll down, -1 slides left. */
  direction?: 1 | -1;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, 'scrollMarquee', ({ gsap, scale }, el) => {
    const track = el.firstElementChild;
    if (!track) return;
    const travel = 22 * Math.max(scale, 0.6);
    gsap.fromTo(
      track,
      { xPercent: direction > 0 ? -travel - 4 : -4 },
      {
        xPercent: direction > 0 ? -4 : -travel - 4,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      },
    );
  });
  const run = Children.toArray(children);
  return (
    <div ref={ref} aria-hidden className={`overflow-hidden ${className ?? ''}`}>
      <div className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="flex shrink-0">
            {run}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * A photograph that starts as a smaller plate and widens to its full frame
 * as it scrolls into view, tied to the scroll (never pinned). The frame
 * (frameClassName: position and rounded corners) clips the photograph; the
 * section's text sits outside it in `children`, so it never scales.
 */
export function ExpandPlate({
  className,
  frameClassName,
  image,
  children,
}: {
  className?: string;
  frameClassName?: string;
  image: ReactNode;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, 'expandPlates', ({ gsap, scale }, el) => {
    const frame = el.firstElementChild;
    const photo = frame?.firstElementChild;
    if (!frame || !photo) return;
    const from = 1 - 0.2 * Math.min(scale, 1.2);
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 15%', scrub: 0.6 } })
      .fromTo(frame, { scale: from, y: 60 * scale }, { scale: 1, y: 0, ease: 'none' }, 0)
      .fromTo(photo, { scale: 1.25 }, { scale: 1, ease: 'none' }, 0);
  });
  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <div className={`absolute overflow-hidden ${frameClassName ?? 'inset-0'}`}>
        <div className="absolute inset-0">{image}</div>
      </div>
      {children}
    </div>
  );
}

/**
 * A soft ring cursor that trails the pointer and swells over links and
 * buttons, more so over anything marked `data-cursor` (photographs and
 * cards), which also shows the glyph. Desktop with a mouse only; the system
 * cursor stays as it is, so this is decoration, never the only pointer.
 * Render once, inside the engine's provider. `className` styles the disc
 * (a translucent ring; no backdrop blur, which would smear the text it
 * passes over) and must centre its content.
 */
export function Cursor({ className, glyph = '↗' }: { className?: string; glyph?: string }) {
  const engine = useMotionEngine();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(!!engine?.settings.patterns.cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, [engine]);

  useEffect(() => {
    const el = ref.current;
    if (!on || !engine || !el) return;
    const { gsap } = engine;
    const disc = el.firstElementChild as HTMLElement;
    const mark = disc.firstElementChild as HTMLElement;
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsap.set(mark, { autoAlpha: 0, scale: 0.2 });
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    let shown = false;
    let state = '';

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x(e.clientX);
      y(e.clientY);
      if (!shown) {
        shown = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.4 });
      }
    };
    const over = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const next = target?.closest('[data-cursor]')
        ? 'view'
        : target?.closest('a, button, [role="button"], label, select, input')
          ? 'link'
          : '';
      if (next === state) return;
      state = next;
      gsap.to(disc, { scale: next === 'view' ? 2.6 : next === 'link' ? 1.6 : 1, duration: 0.6, ease: 'expo.out' });
      gsap.to(mark, { autoAlpha: next === 'view' ? 1 : 0, scale: next === 'view' ? 0.4 : 0.2, duration: 0.4 });
    };
    const leave = () => {
      shown = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      gsap.killTweensOf([el, disc, mark]);
    };
  }, [on, engine]);

  if (!on) return null;
  return (
    <div ref={ref} aria-hidden className="motion-cursor">
      <div className={className}>
        <span className="text-5xl leading-none">{glyph}</span>
      </div>
    </div>
  );
}
