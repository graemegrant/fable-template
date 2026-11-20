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
import { introClass, lateIntro, useScene } from '@/lib/ui/gsap/engine';
import { BookButton } from '../BookingModal';
import { HourMark } from './DayChapter';

/**
 * The home page opens before dawn (A day at the house, DayChapter).
 *
 * Still (reduced motion, motion off, no JS): the house under the night's
 * blue with the first rose of light on the horizon and the sun just below
 * it, mist on the water, the hotel's name huge in the didone, the booking
 * CTA, the book-direct reason and the trust strip, all from first paint.
 *
 * With the motion layer:
 * - On load (desktop) the name rises letter by letter out of the mist.
 * - Desktop (`heroAperture`, pinned): scrolling is the sunrise. The sun
 *   climbs, the night lifts off the photograph, the rose warms, the mist
 *   burns away and the letters of the name drift up like it.
 * - Phones and tablets (soft): the same sunrise, unpinned, as the hero
 *   scrolls away.
 *
 * The hero CTA is never hidden on arrival or delayed; the navbar's "Check
 * availability" stays fixed above the whole scene. `children` is the trust
 * strip, kept inside the first screen (AGENTS.md §5).
 */
export default function DawnHero({
  image,
  time,
  label,
  line,
  cue,
  children,
}: {
  image: unknown;
  time: string;
  label: string;
  /** One quiet line beneath the tagline. */
  line?: string;
  /** "Scroll to pass the day". */
  cue?: string;
  children?: ReactNode;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations('home');
  const tShared = useTranslations('shared');
  const { lat, lng } = hotelConfig.location;
  const ref = useRef<HTMLDivElement>(null);
  const tagline = pickLocale(hotelConfig.tagline, locale);

  useScene(ref, null, ({ gsap, SplitText, scale, settings, mode }, el) => {
    const { patterns } = settings;
    const q = (s: string) => el.querySelector<HTMLElement>(`[data-dawn="${s}"]`);
    const [title, photo, night, rose, sun, mist, top, quiet, cueEl] = ['title', 'photo', 'night', 'rose', 'sun', 'mist', 'top', 'quiet', 'cue'].map(q);
    const feet = [...el.querySelectorAll<HTMLElement>('[data-dawn="foot"]')];
    if (!title || !photo || !night || !rose || !sun) return;

    // Load (desktop): the name rises out of the mist. Everything else is
    // there from the first paint, and only fades as the sun comes up. Phones
    // play no entrance: the name is there from the first paint too.
    const late = lateIntro() || mode === 'soft';
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    let letters: HTMLElement[] = [];
    if (mode === 'full' && (patterns.splitHeadings || patterns.heroAperture)) {
      const split = SplitText.create(title, { type: 'words,chars', charsClass: 'split-char', mask: 'chars', aria: 'auto' });
      letters = split.masks as HTMLElement[];
      intro.from(split.chars, { yPercent: 110, opacity: 0, duration: 1.8, stagger: 0.06 }, 0.2);
    } else if (!late) {
      intro.from(title, { opacity: 0, duration: 1.2 }, 0.2);
    }
    if (late) intro.progress(1);

    if (!patterns.heroAperture) return;

    // Scroll: the sunrise. Pinned on desktop, as the hero leaves on phones.
    const soft = mode === 'soft';
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: soft
        ? { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.4 }
        : { trigger: el, start: 'top top', end: `+=${Math.round(110 * scale)}%`, pin: true, scrub: 0.9 },
    });
    tl.to(sun, { yPercent: soft ? -45 : -95, ease: 'power1.out' }, 0)
      .to(night, { opacity: 0.12, ease: 'power2.in' }, 0)
      .to(rose, { opacity: 1 }, 0)
      .fromTo(photo, { scale: 1.12 }, { scale: 1, ease: 'power1.out' }, 0);
    if (mist) tl.to(mist, { opacity: 0, yPercent: -10 }, 0.2);
    // The letters lift away like the mist, each at its own pace.
    if (letters.length) {
      tl.to(letters, { y: (i) => -(70 + ((i * 53) % 110)) * scale, opacity: 0, ease: 'power2.in', duration: 0.7 }, soft ? 0 : 0.25);
    } else {
      tl.to(title, { yPercent: -40, opacity: 0, duration: 0.7 }, 0.25);
    }
    tl.to([top, quiet, cueEl, ...feet].filter(Boolean), { opacity: 0, y: -24, duration: soft ? 0.3 : 0.2, ease: 'power1.in' }, 0);
  });

  return (
    <div ref={ref} className="relative flex min-h-85vh flex-col overflow-hidden lg:h-svh">
      {/* The house before dawn, in a rounded frame inset from the screen's edge. */}
      <div className="absolute inset-2 overflow-hidden rounded-card bg-primarydeep lg:inset-3">
        <div data-dawn="photo" className="absolute inset-0">
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
        <div data-dawn="night" aria-hidden className="dawn-night absolute inset-0" />
        <div data-dawn="rose" aria-hidden className="dawn-rose absolute inset-0 opacity-40" />
        <div data-dawn="sun" aria-hidden className="sun absolute inset-x-0 top-3/4 mx-auto aspect-square w-full sm:w-3/4 lg:w-1/2" />
        <div data-dawn="mist" aria-hidden className="mist absolute -inset-x-1/4 bottom-0 h-2/3" />
        <div aria-hidden className="vignette absolute inset-0" />
        {/* A shade under the buttons, the book-direct panel and the trust
            strip, so they read on the brightest part of the dawn. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primarydeep/85 via-primarydeep/40 to-transparent" />
      </div>

      {/* The hour, and where. */}
      <div
        data-dawn="top"
        className="relative mx-auto mt-24 flex w-full max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-6 lg:mt-28 lg:px-16"
      >
        <HourMark time={time} label={label} />
        <p className="font-mono text-xs uppercase tracking-25 text-canvas/80">
          {pickLocale(hotelConfig.seo.locationLabel, locale)}
          <span className="hidden sm:inline"> / {formatCoordinates(lat, lng)}</span>
        </p>
      </div>

      {/* The name, centred and huge. */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <h1 data-dawn="title" className={`font-heading text-mega font-normal tracking-tight text-canvas${introClass('splitHeadings')}`}>
          {hotelConfig.name}
        </h1>
        {tagline && (
          <p data-dawn="foot" className="mt-6 max-w-xl font-heading text-2xl italic leading-snug text-canvas/90 md:text-3xl">
            {tagline}
          </p>
        )}
        {line && (
          <p data-dawn="quiet" className="mt-5 font-mono text-xs uppercase tracking-25 text-canvas/75">
            {line}
          </p>
        )}
      </div>

      {/* Foot: one primary CTA, a quieter secondary, the book-direct reason. */}
      <div data-dawn="foot" className="relative mx-auto grid w-full max-w-screen-2xl items-end gap-6 px-6 pb-6 lg:grid-cols-3 lg:px-16">
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookButton className="inline-flex min-h-14 items-center justify-center gap-4 whitespace-nowrap rounded-ctrl bg-accentfill px-7 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas hover:text-primary" />
          <Link
            href="/rooms"
            className="glass inline-flex min-h-14 items-center justify-center gap-4 whitespace-nowrap rounded-ctrl px-7 font-mono text-sm uppercase tracking-18 text-canvas transition-colors hover:bg-canvas/20"
          >
            {t('viewTheRooms')}
          </Link>
        </div>
        {cue ? (
          <p data-dawn="cue" aria-hidden className="hidden flex-col items-center gap-3 font-mono text-xs uppercase tracking-25 text-canvas/75 lg:flex">
            {cue}
            <span className="h-10 w-px bg-gradient-to-b from-canvas/60 to-transparent" />
          </p>
        ) : (
          <span className="hidden lg:block" />
        )}
        <div className="glass-gold hidden max-w-sm justify-self-end rounded-card p-5 lg:block">
          <p className="font-mono text-xs uppercase tracking-18 text-accentondark">{tShared('bookDirectLabel')}</p>
          <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-canvas/85">
            {pickLocale(hotelConfig.directBookingPerk ?? hotelConfig.trustItems[0], locale)}
          </p>
        </div>
      </div>

      {children && (
        <div data-dawn="foot" className="relative px-4 pb-4 lg:px-16 lg:pb-6">
          {children}
        </div>
      )}
    </div>
  );
}
