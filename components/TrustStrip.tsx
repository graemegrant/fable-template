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
        <p className={`text-center font-body text-2xs uppercase tracking-25 xl:hidden ${dark ? 'text-goldbright' : 'text-gold'}`}>
          {t('bookDirectLabel')}
        </p>
        {/* Stacked list up to xl (1280px). sm (640px) let phones in
            landscape (routinely 650-930px wide, e.g. an iPhone 14 is
            844px landscape) slip into the inline pill row; even lg
            (1024px) wasn't enough — this specific set of trust items
            doesn't fit on one inline row until ~1180px (measured by
            screenshotting the actual render at each width), so 1024-1180
            was still wrapping mid-row in the same arbitrary-looking way.
            xl covers every practical phone width in both orientations
            *and* clears the actual fit threshold with margin; a tablet
            in portrait gets the (still perfectly clean) stacked list too
            — a fine trade for never looking broken.
            NOTE — content-dependent: that ~1180px fit threshold is a
            function of this specific trust-item copy. A client with
            longer item text (hotel.config.ts trustItems) could need the
            breakpoint re-checked the same way (screenshot at a few
            widths around xl, look for premature wrapping).
            No pill borders on the stacked version — wildly different
            item lengths ("No Booking Fees" vs "Complimentary Welcome
            Dram") never have to fight for space in a fixed-width box the
            way an equal-width grid of pills did (overflowed on the
            longer items). */}
        <ul
          className={`mt-4 flex flex-col divide-y xl:mt-0 xl:flex-row xl:flex-wrap xl:items-center xl:justify-center xl:gap-x-4 xl:gap-y-3 xl:divide-y-0 ${
            dark ? 'divide-parchment/15' : 'divide-ink/10'
          }`}
        >
          <li className="hidden items-center gap-4 xl:flex">
            <span className={`font-body text-2xs uppercase tracking-25 ${dark ? 'text-goldbright' : 'text-gold'}`}>
              {t('bookDirectLabel')}
            </span>
            <span className={`h-4 w-px ${dark ? 'bg-parchment/25' : 'bg-ink/15'}`} aria-hidden />
          </li>
          {hotelConfig.trustItems.map((item, i) => (
            <li key={i} className="py-3 text-center xl:py-0">
              <span
                className={`font-body text-2xs uppercase tracking-25 xl:inline-block xl:whitespace-nowrap xl:rounded-full xl:border xl:px-4 xl:py-1.5 ${
                  dark ? 'text-parchment xl:border-parchment/25' : 'text-ink xl:border-ink/25'
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
