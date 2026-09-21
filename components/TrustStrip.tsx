import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';

/**
 * Horizontal strip of direct-booking trust items. Light and dark variants.
 * Leads with a "Book direct" label (reusing the same shared.bookDirectLabel
 * translation DirectBookingBanner uses) — without it, "Best rate guaranteed"
 * etc. read as generic hotel amenities rather than the direct-booking pitch
 * they're actually making.
 */
export default async function TrustStrip({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const dark = variant === 'dark';
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('shared');
  return (
    <div className={dark ? 'bg-forest text-parchment' : 'bg-warmgrey text-ink'}>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <p className={`text-center font-body text-2xs uppercase tracking-25 sm:hidden ${dark ? 'text-goldbright' : 'text-gold'}`}>
          {t('bookDirectLabel')}
        </p>
        {/* Mobile: a plain divided list, each row full-width and centered —
            no pill borders, so wildly different item lengths ("No Booking
            Fees" vs "Complimentary Welcome Dram") never have to fight for
            space in a fixed-width box the way a 2-column grid of pills did
            (that overflowed on the longer items). Desktop keeps the
            existing inline pill row unchanged. */}
        <ul
          className={`mt-4 flex flex-col divide-y sm:mt-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 sm:gap-y-3 sm:divide-y-0 ${
            dark ? 'divide-parchment/15' : 'divide-ink/10'
          }`}
        >
          <li className="hidden items-center gap-4 sm:flex">
            <span className={`font-body text-2xs uppercase tracking-25 ${dark ? 'text-goldbright' : 'text-gold'}`}>
              {t('bookDirectLabel')}
            </span>
            <span className={`h-4 w-px ${dark ? 'bg-parchment/25' : 'bg-ink/15'}`} aria-hidden />
          </li>
          {hotelConfig.trustItems.map((item, i) => (
            <li key={i} className="py-3 text-center sm:py-0">
              <span
                className={`font-body text-2xs uppercase tracking-25 sm:inline-block sm:whitespace-nowrap sm:rounded-full sm:border sm:px-4 sm:py-1.5 ${
                  dark ? 'text-parchment sm:border-parchment/25' : 'text-ink sm:border-ink/25'
                }`}
              >
                {pickLocale(item, locale)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
