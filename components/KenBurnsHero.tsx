'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { HeroEntrance } from './Motion';
import { BookButton } from './BookingModal';
import { imgSrc } from '@/lib/sanity';
import { useCookieConsent } from '@/lib/useCookieConsent';

/** Full-screen homepage hero with a slow Ken Burns drift and staged text entrance. */
export default function KenBurnsHero({ image }: { image: unknown }) {
  // While the cookie banner is still up it can cover the lower CTA on short
  // mobile viewports (AGENTS.md §5 — BookButton must stay reachable), so the
  // centered content reserves the same height the banner occupies elsewhere
  // (tailwind.config.ts `cookiebar` token) until the visitor makes a choice.
  const consentDecided = useCookieConsent();
  const locale = useLocale() as Locale;
  const t = useTranslations('home');

  return (
    <section className="relative flex min-h-85vh items-center justify-center overflow-hidden bg-forest">
      <div className="animate-kenburns absolute inset-0">
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
      {/* Independent scrim: contrast holds whether or not the photo loads.
          Kept light enough that the photo itself still reads clearly —
          the eyebrow line below carries its own dedicated dark badge
          rather than the whole hero being darkened just for one line of
          small text (that was the previous approach and it drowned the
          photo out entirely). This lighter scrim only needs to clear
          AA's 3:1 for the large/bold h1/tagline (drop-shadow below is a
          second line of defence for any client photo brighter than this
          one) — measured by sampling actual rendered pixels: 0.42/0.24/0.5
          ≈ 3.6:1 at the h1. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(27,21,16,0.42) 0%, rgba(27,21,16,0.24) 45%, rgba(27,21,16,0.5) 100%)',
        }}
      />

      <div className={`relative px-6 text-center ${consentDecided ? '' : 'pb-cookiebar'}`}>
        <HeroEntrance delay={0.2}>
          {/* Own dark badge rather than relying on the hero scrim: the
              scrim above is intentionally too light to guarantee 4.5:1 for
              small text on its own — measured ~5.8:1 against this badge. */}
          <p className="inline-block rounded-full bg-forestdeep/60 px-5 py-2 font-body text-2xs uppercase tracking-40 text-goldbright backdrop-blur-sm">
            {pickLocale(hotelConfig.seo.descriptor, locale)} · {pickLocale(hotelConfig.seo.locationLabel, locale)}
          </p>
        </HeroEntrance>
        <HeroEntrance delay={0.45}>
          <h1 className="mt-6 font-heading text-6xl font-medium leading-none text-parchment drop-shadow-sm md:text-8xl">
            {hotelConfig.name}
          </h1>
        </HeroEntrance>
        <HeroEntrance delay={0.7}>
          <p className="mt-6 font-heading text-xl font-medium italic text-parchment/90 drop-shadow-sm md:text-2xl">
            {pickLocale(hotelConfig.tagline, locale)}
          </p>
        </HeroEntrance>
        <HeroEntrance delay={0.95}>
          {/* One primary CTA (booking, solid) per AGENTS.md §5; rooms is the
              quieter secondary. */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookButton className="w-64 rounded-ctrl bg-gold px-8 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-parchment sm:w-auto" />
            <Link
              href="/rooms"
              className="w-64 rounded-ctrl border border-parchment/60 px-8 py-4 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-parchment hover:text-forest sm:w-auto"
            >
              {t('viewTheRooms')}
            </Link>
          </div>
        </HeroEntrance>
      </div>

      <HeroEntrance delay={1.4} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="h-14 w-px bg-parchment/40" aria-hidden />
      </HeroEntrance>
    </section>
  );
}
