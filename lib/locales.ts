/**
 * lib/locales.ts — single source of truth for a client's locale set.
 *
 * ALL_LOCALES is every language the template ships messages for; a site
 * publishes the ones listed in hotel.config.ts `languages` (LOCALES).
 * Every other i18n-aware file (middleware, Sanity schema generation, the
 * messages loader, sitemap/hreflang, the language switcher) reads LOCALES
 * from here rather than hardcoding a locale list of its own.
 */
import { hotelConfig } from '../hotel.config';

export const ALL_LOCALES = [
  { id: 'en', label: 'English', bcp47: 'en-GB' },
  { id: 'fr', label: 'Français', bcp47: 'fr-FR' },
  { id: 'de', label: 'Deutsch', bcp47: 'de-DE' },
  { id: 'es', label: 'Español', bcp47: 'es-ES' },
] as const;

export type Locale = (typeof ALL_LOCALES)[number]['id'];

export const DEFAULT_LOCALE: Locale = 'en';

/** The languages this site is published in, in catalogue order. The
 *  default locale is always included: every fallback resolves to it. */
export const LOCALES = ALL_LOCALES.filter((l) => l.id === DEFAULT_LOCALE || hotelConfig.languages.includes(l.id));

export const LOCALE_IDS = LOCALES.map((l) => l.id) as Locale[];

export function isLocale(value: string): value is Locale {
  return (LOCALE_IDS as string[]).includes(value);
}

export function bcp47For(locale: Locale): string {
  return ALL_LOCALES.find((l) => l.id === locale)?.bcp47 ?? ALL_LOCALES[0].bcp47;
}

/** Shape shared by every translatable field, Sanity-sourced or static
 *  fallback — only the locales that have been translated are present;
 *  everything else resolves to DEFAULT_LOCALE via pickLocale(). */
export type LocaleField<T = string> = Partial<Record<Locale, T>>;
