import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { DEFAULT_LOCALE } from '@/lib/locales';

/** Deep-merges `messages` over `base` so any namespace/key a locale hasn't
 *  translated yet falls back to the default locale's copy instead of
 *  rendering blank — the hard fallback rule from AGENTS.md §9. */
function deepMergeMessages(
  base: Record<string, unknown>,
  messages: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...base };
  for (const key of Object.keys(messages)) {
    const baseValue = base[key];
    const value = messages[key];
    merged[key] =
      baseValue &&
      value &&
      typeof baseValue === 'object' &&
      typeof value === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(value)
        ? deepMergeMessages(baseValue as Record<string, unknown>, value as Record<string, unknown>)
        : value;
  }
  return merged;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  let defaultMessages = (await import(`../messages/${DEFAULT_LOCALE}.json`)).default;
  // A demo build (DEMO, see demos/README.md) lays its hotel's own copy over
  // the template's; keys it doesn't override keep the template's wording.
  const demo = process.env.DEMO;
  if (demo) {
    defaultMessages = deepMergeMessages(defaultMessages, (await import(`../demos/${demo}/messages/${DEFAULT_LOCALE}.json`)).default);
  }
  const messages =
    locale === DEFAULT_LOCALE
      ? defaultMessages
      : deepMergeMessages(defaultMessages, (await import(`../messages/${locale}.json`)).default);

  return { locale, messages };
});
