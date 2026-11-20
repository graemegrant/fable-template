'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/image';
import { useScene } from '@/lib/ui/gsap/engine';
import type { Room } from '@/lib/types';

/**
 * Late morning: the rooms, seen through an arched window (A day at the
 * house). Every room is listed beside the window as a link, with its size,
 * sleeps and "from" rate, so the section is complete without motion: the
 * still window shows the first room.
 *
 * Desktop (`roomsReel`, pinned): the section holds and the scroll brings
 * each room into the window in turn, its name lighting up in the list,
 * while a slant of sunlight crosses the glass. The hold lasts as long as
 * the rooms do and is scrubbed by the visitor's own scroll.
 * Phones and tablets: the still window and the list.
 *
 * `intro` is the chapter's opening (hour, heading, line), rendered by the
 * server above the list.
 */
/** How far the rooms not in the window dim: never below this, so their
 *  names, sizes and rates still read at 4.5:1 or more on the paper. */
const DIM = 0.65;

export default function RoomsWindow({ rooms, intro, footer }: { rooms: Room[]; intro: ReactNode; footer?: ReactNode }) {
  const t = useTranslations('shared');
  const ref = useRef<HTMLDivElement>(null);

  useScene(ref, 'roomsReel', ({ gsap, scale }, el) => {
    const photos = [...el.querySelectorAll<HTMLElement>('[data-room-photo]')];
    const items = [...el.querySelectorAll<HTMLElement>('[data-room-item]')];
    const light = el.querySelector<HTMLElement>('[data-room-light]');
    if (photos.length < 2) return;
    el.setAttribute('data-rooms-active', '');
    gsap.set(photos.slice(1), { autoAlpha: 0 });
    gsap.set(items.slice(1), { opacity: DIM });
    const steps = photos.length - 1;
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${Math.round(steps * 55 * scale)}%`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
    });
    photos.forEach((photo, i) => {
      if (i === 0) return;
      const at = i - 1;
      tl.to(photo, { autoAlpha: 1, duration: 0.6, ease: 'power1.inOut' }, at + 0.2)
        .fromTo(photo.firstElementChild, { scale: 1.12 }, { scale: 1, duration: 1 }, at + 0.2)
        .to(items[i - 1], { opacity: DIM, duration: 0.3 }, at + 0.35)
        .to(items[i], { opacity: 1, duration: 0.3 }, at + 0.35);
    });
    tl.to({}, { duration: 0.3 }); // a beat on the last room before the page moves on
    if (light) tl.fromTo(light, { xPercent: -70 }, { xPercent: 70, duration: tl.duration() }, 0);
    return () => el.removeAttribute('data-rooms-active');
  });

  return (
    <div ref={ref} className="rooms-window flex items-center lg:min-h-svh">
      <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 py-24 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:pb-10 lg:pt-28">
        <div className="lg:col-span-5">
          {intro}
          <ol className="mt-8 border-t border-ink/15">
            {rooms.map((room, i) => {
              const specs = [room.sqm ? `${room.sqm} ${t('sqm')}` : '', `${t('sleeps')} ${room.occupancy}`].filter(Boolean);
              return (
                <li key={room.slug} data-room-item className="border-b border-ink/15">
                  <Link href={`/rooms/${room.slug}`} data-cursor className="group flex min-h-14 items-baseline gap-5 py-3">
                    <span className="w-6 shrink-0 font-mono text-xs text-ink">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">
                      <span className="block font-heading text-2xl leading-tight text-ink transition-colors group-hover:italic group-hover:text-accent">
                        {room.roomType}
                      </span>
                      <span className="mt-1 block font-mono text-xs uppercase tracking-18 text-ink">{specs.join(' / ')}</span>
                    </span>
                    <span className="whitespace-nowrap font-mono text-xs uppercase tracking-18 text-ink">
                      {t('from')} £{room.rate}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          {footer}
        </div>

        {/* The window: each room's photograph stacked behind arched glass. */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="window-arch relative mx-auto aspect-tall w-full max-w-xl overflow-hidden bg-ink/10 lg:w-3/4">
            {rooms.map((room, i) => (
              <div key={room.slug} data-room-photo className="absolute inset-0">
                <div className="absolute inset-0">
                  <Image
                    src={imgSrc(room.heroImage, 1100)}
                    alt={i === 0 ? (room.imageAlt ?? `${room.roomType}${room.view ? `, ${room.view}` : ''}`) : ''}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
            <div data-room-light aria-hidden className="window-light absolute -inset-x-1/2 inset-y-0" />
            {/* Glazing bars. */}
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-canvas/50" />
            <span aria-hidden className="absolute inset-x-0 top-1/3 h-px bg-canvas/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
