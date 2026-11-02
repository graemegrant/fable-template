'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { imgSrc } from '@/lib/image';
import { HeroEntrance } from './Motion';
import { BookButton } from './BookingModal';

/**
 * Coastal homepage hero: a rounded photo card inset from the page edges,
 * the name and tagline set bottom-left over a soft sea-to-clear gradient,
 * and a floating "book direct" sticker. One primary CTA (booking) and a
 * quieter secondary (rooms), per AGENTS.md §5.
 */
export default function CoastalHero({ image }: { image: unknown }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('home');
  const tShared = useTranslations('shared');

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="relative mx-auto flex min-h-85vh max-w-screen-2xl items-end overflow-hidden rounded-card bg-primary">
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
        {/* Gradient from the bottom keeps the text on deep sea, whatever the
            photo: measured well above 4.5:1 for the tagline and badge. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep/85 via-primarydeep/25 to-primarydeep/10" />

        <div className="relative w-full px-6 pb-10 pt-32 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
          <HeroEntrance delay={0.15}>
            <p className="inline-flex items-center gap-2 rounded-ctrl bg-canvas/15 px-4 py-2 font-body text-xs font-semibold text-canvas backdrop-blur-sm">
              <span aria-hidden className="size-1.5 rounded-full bg-accentondark" />
              {pickLocale(hotelConfig.seo.descriptor, locale)} · {pickLocale(hotelConfig.seo.locationLabel, locale)}
            </p>
          </HeroEntrance>
          <HeroEntrance delay={0.35}>
            <h1 className="mt-5 max-w-4xl font-heading text-6xl font-semibold leading-display tracking-tight text-canvas md:text-8xl">
              {hotelConfig.name}
            </h1>
          </HeroEntrance>
          <HeroEntrance delay={0.55}>
            <p className="mt-4 max-w-xl font-heading text-xl italic text-canvas/90 md:text-2xl">
              {pickLocale(hotelConfig.tagline, locale)}
            </p>
          </HeroEntrance>
          <HeroEntrance delay={0.75}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton className="min-h-12 rounded-ctrl bg-accentfill px-8 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5" />
              <Link
                href="/rooms"
                className="inline-flex min-h-12 items-center justify-center rounded-ctrl border border-canvas/50 px-8 py-3.5 font-body text-base font-medium text-canvas backdrop-blur-sm transition-colors duration-300 hover:bg-canvas hover:text-primary"
              >
                {t('viewTheRooms')}
              </Link>
            </div>
          </HeroEntrance>
        </div>

        {/* Floating sticker: the direct-booking reason, desktop only */}
        <div className="absolute right-8 top-28 hidden lg:block">
          <div className="animate-float shadow-sand flex size-36 flex-col items-center justify-center rounded-full bg-accentfill p-4 text-center">
            <span className="font-heading text-lg font-semibold leading-tight text-onaccent">{tShared('bookDirectLabel')}</span>
            <span className="mt-1 font-body text-xs leading-snug text-onaccent/85">
              {pickLocale(hotelConfig.directBookingPerk ?? hotelConfig.trustItems[0], locale)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
