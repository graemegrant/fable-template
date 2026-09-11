import { defineRouting } from 'next-intl/routing';
import { LOCALE_IDS, DEFAULT_LOCALE } from '@/lib/locales';

/** Shared next-intl routing config — every locale gets a URL prefix,
 *  including the default (`/en/rooms`, `/fr/rooms`), so canonical/hreflang
 *  stay unambiguous. See lib/locales.ts for the locale set itself. */
export const routing = defineRouting({
  locales: LOCALE_IDS,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});
