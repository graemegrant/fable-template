'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { imgSrc } from '@/lib/image';
import { formatCoordinates } from '@/lib/ui/geo';
import { introFor, motionSettings, useScene } from '@/lib/ui/gsap/engine';
import { BookButton } from './BookingModal';

/**
 * Cinematic homepage hero, the look's first signature moment.
 *
 * Still (phones, tablets, reduced motion, motion off): a full-bleed
 * photograph under a lens vignette, the hotel's name set huge in the
 * didone, the tagline in italic, the booking CTA and the trust strip along
 * the foot, all visible from the first paint.
 *
 * On desktop with the motion layer:
 * - On load the photograph settles out of a slow zoom and the name rises
 *   letter by letter (`splitHeadings`).
 * - Scrolling holds the hero while the photograph closes into a framed
 *   aperture, the name's letters draw apart in depth, and the tagline
 *   resolves beneath the frame (`heroAperture`, pinned). Then the page
 *   moves on.
 *
 * The hero's CTA is never hidden or delayed; the navbar's "Check
 * availability" stays fixed above the whole scene. `children` is the trust
 * strip (a server component), kept inside the first screen (AGENTS.md §5).
 */
export default function CinematicHero({ image, children }: { image: unknown; children?: ReactNode }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('home');
  const tShared = useTranslations('shared');
  const { lat, lng } = hotelConfig.location;
  const ref = useRef<HTMLElement>(null);
  const tagline = pickLocale(hotelConfig.tagline, locale);
  const introClass = motionSettings.enabled ? ' motion-intro' : '';

  useScene(ref, null, ({ gsap, SplitText, scale, settings }, el) => {
    const { patterns } = settings;
    const q = (s: string) => el.querySelector<HTMLElement>(`[data-hero="${s}"]`);
    const [title, aperture, photo, drift, fore, caption, cue, dateline] = [
      'title', 'aperture', 'photo', 'drift', 'fore', 'caption', 'cue', 'dateline',
    ].map(q);
    const feet = [...el.querySelectorAll<HTMLElement>('[data-hero="foot"]')];
    const shades = [...el.querySelectorAll<HTMLElement>('[data-hero="shade"]')];
    if (!title || !aperture || !photo) return;

    // Load: the photograph begins a slow drift (from where it was painted, so
    // nothing jumps), the dateline and cue fade up, the name rises.
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (drift) gsap.to(drift, { scale: 1 + 0.06 * scale, duration: 16, ease: 'sine.out' });
    if (dateline) intro.from(dateline, { opacity: 0, y: 12, duration: 1.2 }, 0.5);
    if (cue) intro.from(cue, { opacity: 0, duration: 1 }, 1.4);

    let letters: HTMLElement[] = [];
    if (patterns.splitHeadings || patterns.heroAperture) {
      const split = SplitText.create(title, { type: 'chars', charsClass: 'split-char', mask: 'chars', aria: 'auto' });
      letters = split.masks as HTMLElement[];
      intro.from(split.chars, { yPercent: 110, duration: 1.4, stagger: 0.045 }, 0.2);
    } else {
      intro.from(title, { opacity: 0, duration: 1.2 }, 0.2);
    }

    if (!patterns.heroAperture) return;

    // Scroll: hold the hero, close the aperture, draw the name apart.
    const mid = (letters.length - 1) / 2;
    if (caption) gsap.set(caption, { autoAlpha: 0, y: 30 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: el, start: 'top top', end: `+=${Math.round(80 * scale)}%`, pin: true, scrub: 0.9 },
    });
    tl.to(aperture, { scale: 0.46, ease: 'power2.inOut' }, 0)
      .to(photo, { scale: 1.28, ease: 'power1.inOut' }, 0)
      // House lights up: the shade that kept the title legible lifts off the framed photograph.
      .to(shades, { opacity: 0.15, ease: 'power1.in' }, 0)
      .to(letters, { xPercent: (i) => (i - mid) * 55 * scale, opacity: 0, ease: 'power2.in' }, 0)
      .to([fore, ...feet].filter(Boolean), { opacity: 0, y: -24, duration: 0.35 }, 0);
    if (cue) tl.to(cue, { opacity: 0, duration: 0.15 }, 0);
    if (caption) tl.to(caption, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.55);
  });

  return (
    <section ref={ref} className="relative flex min-h-85vh flex-col overflow-hidden bg-primarydeep lg:h-svh">
      {/* The photograph, in a frame the scroll scene closes into an aperture. */}
      <div data-hero="aperture" className="absolute inset-0 origin-center overflow-hidden rounded-img">
        <div data-hero="photo" className="absolute inset-0">
          <div data-hero="drift" className="absolute inset-0">
          <Image
            src={imgSrc(image, 1920)}
            alt={`${hotelConfig.name}, ${pickLocale(hotelConfig.location.regionLabel, locale)}`}
            fill
            priority
            fetchPriority="high"
            quality={68}
            sizes="100vw"
            className="object-cover"
          />
          </div>
        </div>
        <div data-hero="shade" aria-hidden className="vignette absolute inset-0" />
        <div data-hero="shade" aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep via-primarydeep/30 to-primarydeep/40" />
      </div>

      {/* Dateline under the navbar. */}
      <p
        data-hero="dateline"
        className={`relative mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1 px-5 pt-28 font-mono text-xs uppercase tracking-25 text-canvas/85${introClass}`}
      >
        <span className="text-accentondark">{pickLocale(hotelConfig.seo.descriptor, locale)}</span>
        <span>{pickLocale(hotelConfig.seo.locationLabel, locale)}</span>
        <span className="hidden sm:inline">{formatCoordinates(lat, lng)}</span>
      </p>

      {/* The name, centred and huge. */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <h1
          data-hero="title"
          className={`font-heading text-mega font-normal tracking-tight text-canvas${introFor('splitHeadings') ? ' motion-intro' : ''}`}
        >
          {hotelConfig.name}
        </h1>
        {tagline && (
          <p data-hero="fore" className="mt-6 max-w-xl font-heading text-2xl italic leading-snug text-canvas/90 md:text-3xl">
            {tagline}
          </p>
        )}
      </div>

      {/* Foot: one primary CTA, a quieter secondary, the book-direct reason. */}
      <div data-hero="foot" className="relative mx-auto grid w-full max-w-screen-2xl items-end gap-6 px-5 pb-8 lg:grid-cols-3 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookButton className="inline-flex min-h-14 items-center justify-center gap-4 whitespace-nowrap rounded-ctrl bg-accentfill px-7 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas hover:text-primary" />
          <Link
            href="/rooms"
            className="inline-flex min-h-14 items-center justify-center gap-4 whitespace-nowrap rounded-ctrl border border-canvas/40 px-7 font-mono text-sm uppercase tracking-18 text-canvas transition-colors hover:border-canvas hover:bg-canvas/10"
          >
            {t('viewTheRooms')}
          </Link>
        </div>
        <span data-hero="cue" aria-hidden className="hidden justify-center lg:flex">
          <span className="h-14 w-px bg-gradient-to-b from-transparent to-canvas/60" />
        </span>
        <div className="hidden justify-self-end border-l border-accentondark pl-5 lg:block">
          <p className="font-mono text-xs uppercase tracking-18 text-accentondark">{tShared('bookDirectLabel')}</p>
          <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-canvas/85">
            {pickLocale(hotelConfig.directBookingPerk ?? hotelConfig.trustItems[0], locale)}
          </p>
        </div>
      </div>

      {/* Revealed beneath the closed aperture (desktop motion only). A visual
          echo of the tagline above, so it's hidden from screen readers. */}
      {tagline && (
        <p
          data-hero="caption"
          aria-hidden
          className="pointer-events-none invisible absolute inset-x-0 bottom-16 hidden px-5 text-center font-heading text-4xl italic text-canvas lg:block"
        >
          {tagline}
        </p>
      )}

      {children && (
        <div data-hero="foot" className="relative">
          {children}
        </div>
      )}
    </section>
  );
}
