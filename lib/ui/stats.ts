import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';

export interface Stat {
  value: number;
  render: (n: number) => string;
  label: string;
}

/**
 * The hotel's stats band figures (hotelConfig.stats), shared by every look,
 * so a client build can never inherit another hotel's numbers. `metric`
 * swaps in a metric value/unit for non-English locales (e.g. 19 mi → 31 km)
 * rather than leaving a mistranslated unit.
 */
export function hotelStats(locale: Locale): Stat[] {
  const isMetric = locale !== 'en';
  return hotelConfig.stats.map((s) => {
    const m = isMetric && s.metric ? s.metric : null;
    const prefix = s.prefix ?? '';
    const suffix = m ? m.suffix : (s.suffix ?? '');
    return { value: m ? m.value : s.value, render: (n) => `${prefix}${n}${suffix}`, label: pickLocale(s.label, locale) ?? '' };
  });
}
