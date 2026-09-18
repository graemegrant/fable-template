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
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <li className="flex items-center gap-4">
            <span className={`font-body text-2xs uppercase tracking-25 ${dark ? 'text-goldbright' : 'text-gold'}`}>
              {t('bookDirectLabel')}
            </span>
            <span className={`h-4 w-px ${dark ? 'bg-parchment/25' : 'bg-ink/15'}`} aria-hidden />
          </li>
          {hotelConfig.trustItems.map((item, i) => (
            <li key={i}>
              <span
                className={`inline-block rounded-full border px-4 py-1.5 font-body text-2xs uppercase tracking-25 ${
                  dark ? 'border-parchment/25 text-parchment' : 'border-ink/25 text-ink'
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
