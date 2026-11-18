import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { BookButton } from './BookingModal';

/** A full-width signal-orange bar: why booking direct is the right call.
 *  Shows hotelConfig.directBookingPerk when the hotel has agreed one,
 *  otherwise shared.bookDirectBody. */
export default async function DirectBookingBanner() {
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  const perk = hotelConfig.directBookingPerk;
  return (
    <div className="bg-accentfill text-onaccent">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-stretch sm:flex-row sm:items-center">
        <p className="flex-1 px-5 py-6 font-body text-base lg:px-8">
          <span className="mr-3 font-mono text-xs uppercase tracking-18">{t('bookDirectLabel')}</span>
          {perk ? pickLocale(perk, locale) : t('bookDirectBody')}
        </p>
        {/* No children: BookButton uses common.checkAvailability (AGENTS.md §9). */}
        <BookButton className="min-h-16 shrink-0 bg-ink px-8 font-mono text-sm uppercase tracking-18 text-canvas transition-colors hover:bg-primarydeep" />
      </div>
    </div>
  );
}
