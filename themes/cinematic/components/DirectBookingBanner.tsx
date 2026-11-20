import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { BookButton } from './BookingModal';

/** A champagne glass panel: why booking direct is the right call.
 *  Shows hotelConfig.directBookingPerk when the hotel has agreed one,
 *  otherwise shared.bookDirectBody. */
export default async function DirectBookingBanner() {
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  const perk = hotelConfig.directBookingPerk;
  return (
    <div className="p-2 lg:px-3">
      <div className="glass-gold mx-auto flex max-w-screen-2xl flex-col items-stretch gap-3 rounded-card p-2 text-canvas sm:flex-row sm:items-center">
        <p className="flex-1 p-4 font-body text-base lg:px-6">
          <span className="mr-3 font-mono text-xs uppercase tracking-18 text-accentondark">{t('bookDirectLabel')}</span>
          {perk ? pickLocale(perk, locale) : t('bookDirectBody')}
        </p>
        {/* No children: BookButton uses common.checkAvailability (AGENTS.md §9). */}
        <BookButton className="min-h-14 shrink-0 rounded-ctrl bg-accentfill px-8 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas" />
      </div>
    </div>
  );
}
