import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';

/**
 * The direct-booking trust items as a slow mono ticker, led by "Book
 * direct" so they read as the direct-booking pitch. `light` runs on a paper
 * band, `dark` on the black page. Screen readers get the list once; the
 * duplicate that makes the loop seamless is hidden from them, and the
 * ticker stands still under reduced motion.
 */
export default async function TrustStrip({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const dark = variant === 'dark';
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('shared');
  const items = [t('bookDirectLabel'), ...hotelConfig.trustItems.map((item) => pickLocale(item, locale) ?? '')];
  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...items, ...items].map((item, i) => (
        <li key={i} className="flex items-center gap-8 pr-8 font-mono text-sm uppercase tracking-18">
          <span className={i % items.length === 0 ? (dark ? 'text-accentondark' : 'text-accent') : ''}>{item}</span>
          <span aria-hidden className={dark ? 'text-accentondark' : 'text-accent'}>
            ✳
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden border-y py-4 ${dark ? 'border-canvas/10 text-canvas' : 'border-ink bg-canvas text-ink'}`}>
      <div className="animate-marquee flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
