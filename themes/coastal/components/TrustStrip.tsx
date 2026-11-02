import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';

/**
 * Direct-booking trust items as soft sand chips with a tick, led by the
 * "Book direct" label so they read as the direct-booking pitch rather than
 * generic amenities. `dark` sets them on deep sea.
 */
export default async function TrustStrip({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const dark = variant === 'dark';
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('shared');
  return (
    <div className={dark ? 'bg-primarydeep' : ''}>
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2.5 px-6 py-7 lg:px-10">
        <li className={`mr-1 font-heading text-lg font-semibold italic ${dark ? 'text-accentondark' : 'text-accent'}`}>
          {t('bookDirectLabel')}
        </li>
        {hotelConfig.trustItems.map((item, i) => (
          <li
            key={i}
            className={`inline-flex items-center gap-2 rounded-ctrl px-4 py-2 font-body text-sm ${
              dark ? 'bg-canvas/10 text-canvas' : 'bg-canvasalt text-ink'
            }`}
          >
            <span aria-hidden className={`text-xs ${dark ? 'text-accentondark' : 'text-accent'}`}>✓</span>
            {pickLocale(item, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}
