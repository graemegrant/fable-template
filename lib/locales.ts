/**
 * lib/locales.ts — single source of truth for a client's locale set.
 *
 * Cloning for a new client: edit LOCALES here (add/remove/reorder), the
 * same way hotel.config.ts is rewritten per client (see AGENTS.md §4, §9).
 * Every other i18n-aware file (middleware, Sanity schema generation, the
 * messages loader, hotel.config.ts, sitemap/hreflang) reads from this file
 * rather than hardcoding a locale list of its own.
 */
export const LOCALES = [
  { id: 'en', label: 'English', bcp47: 'en-GB' },
  { id: 'fr', label: 'Français', bcp47: 'fr-FR' },
  { id: 'de', label: 'Deutsch', bcp47: 'de-DE' },
] as const;

export type Locale = (typeof LOCALES)[number]['id'];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_IDS = LOCALES.map((l) => l.id) as Locale[];

export function isLocale(value: string): value is Locale {
  return (LOCALE_IDS as string[]).includes(value);
}

export function bcp47For(locale: Locale): string {
  return LOCALES.find((l) => l.id === locale)?.bcp47 ?? LOCALES[0].bcp47;
}

/** Shape shared by every translatable field, Sanity-sourced or static
 *  fallback — only the locales that have been translated are present;
 *  everything else resolves to DEFAULT_LOCALE via pickLocale(). */
export type LocaleField<T = string> = Partial<Record<Locale, T>>;
