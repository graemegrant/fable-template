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
import { BookButton } from './BookingModal';

/**
 * Cinematic homepage hero, the look's first signature moment.
 *
 * Still (reduced motion, motion off): the photograph in a rounded frame
 * inset from the screen's edge, under a lens vignette, the hotel's name
 * set huge in the didone, the tagline in italic, the booking CTA, a glass
 * book-direct panel and the trust strip in a glass band along the foot,
 * all visible from the first paint.
 *
 * With the motion layer:
 * - On load the photograph begins a slow drift and the name rises letter
 *   by letter (`splitHeadings`), on every screen size.
 * - Desktop: scrolling holds the hero while the photograph closes into a
 *   framed aperture, the name's letters draw apart in depth, and the
 *   tagline resolves beneath the frame (`heroAperture`, pinned).
 * - Phones and tablets (soft): no pin. As the hero scrolls away the frame
 *   eases back, the photograph deepens and the name lifts and fades.
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
  const fadeIn = introClass(null);

  useScene(ref, null, ({ gsap, SplitText, scale, settings, mode }, el) => {
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
    // If the engine arrived after motion.css had already shown everything,
    // the entrance is jumped to its end: replaying it would hide the title.
    const late = lateIntro();
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (drift) gsap.to(drift, { scale: 1 + 0.08 * scale, duration: 16, ease: 'sine.out' });
    if (dateline) intro.from(dateline, { opacity: 0, y: 12, duration: 1.2 }, 0.5);
    if (cue) intro.from(cue, { opacity: 0, duration: 1 }, 1.4);

    let letters: HTMLElement[] = [];
    if (patterns.splitHeadings || patterns.heroAperture) {
      // Words keep their letters together, so the name wraps between words.
      const split = SplitText.create(title, { type: 'words,chars', charsClass: 'split-char', mask: 'chars', aria: 'auto' });
      letters = split.masks as HTMLElement[];
      intro.from(split.chars, { yPercent: 110, duration: 1.4, stagger: 0.045 }, 0.2);
    } else {
      intro.from(title, { opacity: 0, duration: 1.2 }, 0.2);
    }
    if (late) intro.progress(1);

    if (!patterns.heroAperture) return;

    // Phones and tablets: an unpinned, scroll-tied farewell.
    if (mode === 'soft') {
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.4 } })
        .to(aperture, { scale: 0.9, yPercent: 8 }, 0)
        .to(photo, { scale: 1.15 }, 0)
        .to(title, { yPercent: -45, opacity: 0 }, 0)
        .to([fore, dateline].filter(Boolean), { opacity: 0, y: -20 }, 0);
      return;
    }

    // Scroll: hold the hero, close the aperture, draw the name apart.
    const mid = (letters.length - 1) / 2;
    if (caption) gsap.set(caption, { autoAlpha: 0, y: 30 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: el, start: 'top top', end: `+=${Math.round(80 * scale)}%`, pin: true, scrub: 0.9 },
    });
    // The corners are counter-scaled so the frame keeps its rounding as it
    // shrinks.
    tl.to(aperture, { scale: 0.46, borderRadius: 64, ease: 'power2.inOut' }, 0)
      .to(photo, { scale: 1.28, ease: 'power1.inOut' }, 0)
      // House lights up: the shade that kept the title legible lifts off the framed photograph.
      .to(shades, { opacity: 0.15, ease: 'power1.in' }, 0)
      .to(letters, { xPercent: (i) => (i - mid) * 55 * scale, opacity: 0, ease: 'power2.in' }, 0)
      .to([fore, ...feet].filter(Boolean), { opacity: 0, y: -24, duration: 0.35 }, 0);
    if (cue) tl.to(cue, { opacity: 0, duration: 0.15 }, 0);
    if (caption) tl.to(caption, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.55);
  });

  return (
    <section ref={ref} className="relative flex min-h-85vh flex-col overflow-hidden lg:h-svh">
      {/* The photograph, in a rounded frame inset from the screen's edge,
          which the scroll scene closes into an aperture. */}
      <div data-hero="aperture" className="absolute inset-2 origin-center overflow-hidden rounded-card bg-primarydeep lg:inset-3">
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
        className={`glass-deep relative mx-auto mt-24 flex flex-wrap justify-center gap-x-6 gap-y-1 rounded-ctrl px-5 py-2 font-mono text-xs uppercase tracking-25 text-canvas/85 lg:mt-28${fadeIn}`}
      >
        <span className="text-accentondark">{pickLocale(hotelConfig.seo.descriptor, locale)}</span>
        <span>{pickLocale(hotelConfig.seo.locationLabel, locale)}</span>
        <span className="hidden sm:inline">{formatCoordinates(lat, lng)}</span>
      </p>

      {/* The name, centred and huge. */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <h1
          data-hero="title"
          className={`font-heading text-mega font-normal tracking-tight text-canvas${introClass('splitHeadings')}`}
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
      <div data-hero="foot" className="relative mx-auto grid w-full max-w-screen-2xl items-end gap-6 px-6 pb-6 lg:grid-cols-3 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookButton className="inline-flex min-h-14 items-center justify-center gap-4 whitespace-nowrap rounded-ctrl bg-accentfill px-7 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas hover:text-primary" />
          <Link
            href="/rooms"
            className="glass inline-flex min-h-14 items-center justify-center gap-4 whitespace-nowrap rounded-ctrl px-7 font-mono text-sm uppercase tracking-18 text-canvas transition-colors hover:bg-canvas/20"
          >
            {t('viewTheRooms')}
          </Link>
        </div>
        <span data-hero="cue" aria-hidden className="hidden justify-center lg:flex">
          <span className="h-14 w-px bg-gradient-to-b from-transparent to-canvas/60" />
        </span>
        <div className="glass-gold hidden max-w-sm justify-self-end rounded-card p-5 lg:block">
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
        <div data-hero="foot" className="relative px-4 pb-4 lg:px-6 lg:pb-6">
          {children}
        </div>
      )}
    </section>
  );
}
