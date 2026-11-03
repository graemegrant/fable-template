'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { imgSrc } from '@/lib/image';
import { formatCoordinates } from '@/lib/ui/geo';
import { HeroEntrance } from './Motion';
import { BookButton } from './BookingModal';

/**
 * Urban homepage hero: a full-bleed photograph, the hotel's name set huge
 * in condensed capitals along the bottom, and a mono dateline (descriptor,
 * place, coordinates) above it. One primary CTA (booking) and a quieter
 * secondary (rooms), per AGENTS.md §5; the book-direct reason sits in a
 * boxed note on larger screens.
 */
export default function UrbanHero({ image }: { image: unknown }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('home');
  const tShared = useTranslations('shared');
  const { lat, lng } = hotelConfig.location;

  return (
    <section className="relative flex min-h-85vh items-end overflow-hidden bg-primarydeep md:min-h-screen">
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
      {/* Bottom-weighted shade keeps the type on near-black over any photo. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep via-primarydeep/50 to-primarydeep/20" />

      <div className="relative w-full px-5 pb-10 pt-32 lg:px-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl">
          <HeroEntrance delay={0.1}>
            <p className="flex flex-wrap gap-x-4 gap-y-1 border-b border-canvas/20 pb-4 font-mono text-xs uppercase tracking-18 text-canvas/80">
              <span className="text-accentondark">{pickLocale(hotelConfig.seo.descriptor, locale)}</span>
              <span>{pickLocale(hotelConfig.seo.locationLabel, locale)}</span>
              <span className="hidden sm:inline">{formatCoordinates(lat, lng)}</span>
            </p>
          </HeroEntrance>
          <HeroEntrance delay={0.25}>
            <h1 className="font-condensed mt-6 font-heading text-6xl font-extrabold uppercase leading-none tracking-tight text-canvas sm:text-8xl lg:text-9xl">
              {hotelConfig.name}
            </h1>
          </HeroEntrance>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
            <HeroEntrance delay={0.4} className="lg:col-span-4">
              <p className="max-w-md font-body text-xl leading-snug text-canvas/90">{pickLocale(hotelConfig.tagline, locale)}</p>
            </HeroEntrance>
            <HeroEntrance delay={0.55} className="lg:col-span-5">
              <div className="flex flex-col gap-px sm:flex-row">
                <BookButton className="inline-flex min-h-14 items-center justify-between gap-6 whitespace-nowrap bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas" />
                <Link
                  href="/rooms"
                  className="inline-flex min-h-14 items-center justify-between gap-6 whitespace-nowrap border border-canvas/40 px-6 font-mono text-sm uppercase tracking-18 text-canvas transition-colors hover:bg-canvas hover:text-ink"
                >
                  {t('viewTheRooms')} <span aria-hidden>→</span>
                </Link>
              </div>
            </HeroEntrance>
            <HeroEntrance delay={0.7} className="hidden lg:col-span-3 lg:block">
              <div className="border-l border-accentondark pl-5">
                <p className="font-mono text-xs uppercase tracking-18 text-accentondark">{tShared('bookDirectLabel')}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-canvas/80">
                  {pickLocale(hotelConfig.directBookingPerk ?? hotelConfig.trustItems[0], locale)}
                </p>
              </div>
            </HeroEntrance>
          </div>
        </div>
      </div>
    </section>
  );
}
