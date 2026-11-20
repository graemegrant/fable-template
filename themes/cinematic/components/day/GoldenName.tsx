'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { imgSrc } from '@/lib/image';
import { useScene } from '@/lib/ui/gsap/engine';
import { SplitHeading } from '@/lib/ui/gsap/patterns';

/**
 * Golden hour: the land seen through the hotel's name (A day at the house).
 * The name is set huge with the photograph inside its letters, and a low
 * sun sets behind it. Decorative (the name is the page's h1), so it is
 * hidden from screen readers; the photograph's place is described in the
 * chapter copy that follows (`children`).
 *
 * Desktop (`expandPlates`, pinned): the section holds while the name grows
 * towards you until its letters open into the whole photograph, and the
 * sun sinks. Phones and tablets (soft): the name grows gently as it
 * passes, unpinned. Still: the name with the land in it, under the sun.
 */
export default function GoldenName({
  name,
  image,
  intro,
  line,
  children,
}: {
  name: string;
  image: unknown;
  /** The hour mark, above the name. */
  intro?: ReactNode;
  /** A line set large in the light going down, before the name. */
  line?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const src = imgSrc(image, 1920);

  useScene(ref, 'expandPlates', ({ gsap, scale, mode }, el) => {
    const q = (s: string) => el.querySelector<HTMLElement>(`[data-golden="${s}"]`);
    const [word, sun, photo, top] = ['word', 'sun', 'photo', 'top'].map(q);
    if (!word || !sun || !photo) return;
    if (mode === 'soft') {
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 } })
        .fromTo(word, { scale: 0.9 }, { scale: 1.25 }, 0)
        .fromTo(sun, { yPercent: -10 }, { yPercent: 25 }, 0);
      return;
    }
    gsap.set(photo, { autoAlpha: 0 });
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: `+=${Math.round(120 * scale)}%`, pin: true, scrub: 0.9 },
      })
      .to(word, { scale: 9, ease: 'power3.in', duration: 1 }, 0)
      .to(sun, { yPercent: 60, opacity: 0.3, duration: 1 }, 0)
      .to(top, { opacity: 0, y: -20, duration: 0.2 }, 0)
      .to(photo, { autoAlpha: 1, duration: 0.25 }, 0.7)
      .to(word, { opacity: 0, duration: 0.1 }, 0.9)
      .to({}, { duration: 0.25 });
  });

  return (
    <>
      {/* The afternoon going down into the golden hour (home page only:
          given a `line`, the light falls for most of a screen first). */}
      {line && (
        <div className="flex h-80vh items-center justify-center px-5">
          <SplitHeading as="p" by="words" className="max-w-4xl text-center font-heading text-4xl italic leading-heading text-ink md:text-6xl">
            {line}
          </SplitHeading>
        </div>
      )}
      <div ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">
        <div data-golden="sun" aria-hidden className="sun-low absolute inset-x-0 top-1/4 mx-auto aspect-square w-full sm:w-2/3 lg:w-2/5" />
        {intro && (
          <div data-golden="top" className="relative mx-auto w-full max-w-screen-2xl px-5 pt-28 lg:px-16">
            {intro}
          </div>
        )}
        <div className="relative flex flex-1 items-center justify-center px-5 py-16">
          <p
            data-golden="word"
            aria-hidden
            className="through-name text-center font-heading text-mega italic leading-none"
            style={{ backgroundImage: `url(${src})` }}
          >
            {name}
          </p>
        </div>
        <div data-golden="photo" aria-hidden className="pointer-events-none invisible absolute inset-0">
          <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
          <div className="golden-grade absolute inset-0" />
          <div className="vignette absolute inset-0" />
          <div className="golden-fade absolute inset-0" />
        </div>
      </div>
      {children}
    </>
  );
}
