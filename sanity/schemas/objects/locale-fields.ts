import { defineField, defineType } from 'sanity';
import { LOCALES, DEFAULT_LOCALE } from '../../../lib/locales';

/**
 * Generates one Studio sub-field per configured locale (lib/locales.ts).
 * The default locale is required (with a warning, not a hard block, so
 * editors can still save while translation is in progress) — every other
 * locale is optional and falls back to it at read time
 * (lib/resolveLocale.ts pickLocale()). See AGENTS.md §9.
 */
function localeFields(type: 'string' | 'text', extra: Record<string, unknown> = {}) {
  return LOCALES.map((locale) =>
    defineField({
      name: locale.id,
      title: locale.label,
      type,
      ...extra,
      validation:
        locale.id === DEFAULT_LOCALE
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (rule: any) =>
              rule
                .required()
                .warning(
                  `${locale.label} is the fallback locale — leave this blank and every other locale shows nothing here until translated.`,
                )
          : undefined,
    }),
  );
}

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized text',
  type: 'object',
  fields: localeFields('string'),
  options: { columns: LOCALES.length <= 2 ? LOCALES.length : 2 },
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text (long)',
  type: 'object',
  fields: localeFields('text', { rows: 4 }),
});

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized rich text',
  type: 'object',
  fields: LOCALES.map((locale) =>
    defineField({
      name: locale.id,
      title: locale.label,
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', type: 'string' }] },
      ],
    }),
  ),
});
