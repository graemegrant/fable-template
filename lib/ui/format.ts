import { bcp47For, type Locale } from '@/lib/locales';

/** A post's date in the visitor's language, e.g. "2 October 2026". Shared by every look. */
export function formatDate(d: string | undefined, locale: Locale) {
  if (!d) return '';
  return new Date(d).toLocaleDateString(bcp47For(locale), { day: 'numeric', month: 'long', year: 'numeric' });
}
