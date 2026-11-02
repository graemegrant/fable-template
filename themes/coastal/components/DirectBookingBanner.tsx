import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { BookButton } from './BookingModal';

/** A rounded gold panel reminding guests why booking direct is the right
 *  call. Shows hotelConfig.directBookingPerk when the hotel has agreed one,
 *  otherwise shared.bookDirectBody. */
export default async function DirectBookingBanner() {
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  const perk = hotelConfig.directBookingPerk;
  return (
    <div className="px-3 py-6 sm:px-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-card bg-accentfill px-6 py-7 sm:flex-row sm:px-10">
        <p className="text-center font-body text-base text-onaccent sm:text-left">
          <span className="font-heading text-lg font-semibold">{t('bookDirectLabel')}</span>{' '}
          {perk ? pickLocale(perk, locale) : t('bookDirectBody')}
        </p>
        {/* No children: BookButton uses common.checkAvailability (AGENTS.md §9). */}
        <BookButton className="min-h-12 shrink-0 rounded-ctrl bg-primary px-7 py-3 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5" />
      </div>
    </div>
  );
}
