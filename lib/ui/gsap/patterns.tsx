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
 * - Nothing runs on phones, tablets or under reduced motion (engine.tsx).
 */
import { useRef, type ElementType, type ReactNode } from 'react';
import { introFor, useScene } from './engine';

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
    <Element ref={ref} className={`${className ?? ''}${onLoad && introFor('splitHeadings') ? ' motion-intro' : ''}`}>
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
  useScene(ref, 'roomsReel', ({ gsap }, el) => {
    const track = el.querySelector<HTMLElement>('[data-reel-track]');
    const bar = el.querySelector<HTMLElement>('[data-reel-progress]');
    if (!track) return;
    el.setAttribute('data-reel-active', '');
    const distance = () => Math.max(0, track.scrollWidth - el.clientWidth);
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
        onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
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
