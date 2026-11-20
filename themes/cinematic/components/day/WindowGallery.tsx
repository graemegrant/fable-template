'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { imgSrc } from '@/lib/image';
import { useScene } from '@/lib/ui/gsap/engine';

/**
 * A room's photographs seen through an arched window (A day at the house),
 * the room detail page's opening. `intro` (the page's h1, the room's hook,
 * its rate and the booking button, rendered by the server) sits beside the
 * window. Still: the window shows the first photograph, and the full
 * gallery follows further down the page.
 *
 * Desktop (`roomsReel`, pinned): the opening holds while the scroll brings
 * each photograph into the window in turn, with a slant of sunlight
 * crossing the glass and a "1 / 4" count beneath. Scrubbed by the visitor's
 * own scroll; the booking button is in the intro and stays usable.
 * Phones and tablets: the still window.
 */
export default function WindowGallery({ images, alt, intro }: { images: unknown[]; alt: string; intro: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const photos = images.slice(0, 5);

  useScene(ref, 'roomsReel', ({ gsap, scale }, el) => {
    const frames = [...el.querySelectorAll<HTMLElement>('[data-room-photo]')];
    const light = el.querySelector<HTMLElement>('[data-room-light]');
    const count = el.querySelector<HTMLElement>('[data-window-count]');
    if (frames.length < 2) return;
    el.setAttribute('data-rooms-active', '');
    gsap.set(frames.slice(1), { autoAlpha: 0 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round((frames.length - 1) * 45 * scale)}%`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (count) count.textContent = `${Math.min(frames.length, 1 + Math.floor(self.progress * frames.length))} / ${frames.length}`;
        },
      },
    });
    frames.forEach((frame, i) => {
      if (i === 0) return;
      tl.to(frame, { autoAlpha: 1, duration: 0.6, ease: 'power1.inOut' }, i - 0.8).fromTo(
        frame.firstElementChild,
        { scale: 1.12 },
        { scale: 1, duration: 1 },
        i - 0.8,
      );
    });
    if (light) tl.fromTo(light, { xPercent: -70 }, { xPercent: 70, duration: tl.duration() }, 0);
    return () => el.removeAttribute('data-rooms-active');
  });

  return (
    <div ref={ref} className="rooms-window relative flex items-center lg:min-h-svh">
      <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 pb-16 pt-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:pb-10">
        <div className="lg:col-span-6">{intro}</div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="window-arch relative mx-auto aspect-tall w-full max-w-lg overflow-hidden bg-canvas/5">
            {photos.map((img, i) => (
              <div key={i} data-room-photo className="absolute inset-0">
                <div className="absolute inset-0">
                  <Image
                    src={imgSrc(img, 1100)}
                    alt={i === 0 ? alt : ''}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 36vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
            <div data-room-light aria-hidden className="window-light absolute -inset-x-1/2 inset-y-0" />
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-canvas/40" />
            <span aria-hidden className="absolute inset-x-0 top-1/3 h-px bg-canvas/40" />
          </div>
          {photos.length > 1 && (
            <p aria-hidden data-window-count className="mt-4 text-center font-mono text-xs uppercase tracking-25 text-canvas/70">
              1 / {photos.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
