/**
 * lib/resolveLocale.ts — converts raw *I18n content (Sanity or lib/data.ts
 * fallback, same shape either way — see lib/queries.ts comment) into the
 * flat, single-locale types every presentational component consumes.
 *
 * pickLocale() is the one place the fallback rule lives: a missing
 * translation for the requested locale falls back to DEFAULT_LOCALE,
 * never renders blank. See AGENTS.md §9.
 */
import { DEFAULT_LOCALE, type Locale, type LocaleField } from './locales';
import type {
  Room, RoomI18n,
  Experience, ExperienceI18n,
  Offer, OfferI18n,
  JournalPost, JournalPostI18n,
  Testimonial, TestimonialI18n,
  TeamMember, TeamMemberI18n,
} from './types';

export function pickLocale<T>(field: LocaleField<T> | undefined, locale: Locale): T | undefined {
  return field?.[locale] ?? field?.[DEFAULT_LOCALE];
}

function pickLocaleArray<T>(fields: LocaleField<T>[] | undefined, locale: Locale): T[] {
  if (!fields) return [];
  return fields.map((f) => pickLocale(f, locale)).filter((v): v is T => v !== undefined);
}

export function resolveRoom(raw: RoomI18n, locale: Locale): Room {
  return {
    ...raw,
    name: pickLocale(raw.name, locale) ?? '',
    description: pickLocale(raw.description, locale) ?? '',
    imageAlt: pickLocale(raw.imageAlt, locale),
    amenities: pickLocaleArray(raw.amenities, locale),
  };
}

export function resolveExperience(raw: ExperienceI18n, locale: Locale): Experience {
  return {
    ...raw,
    name: pickLocale(raw.name, locale) ?? '',
    description: pickLocale(raw.description, locale) ?? '',
    imageAlt: pickLocale(raw.imageAlt, locale),
    duration: pickLocale(raw.duration, locale) ?? '',
    price: pickLocale(raw.price, locale) ?? '',
    includes: raw.includes ? pickLocaleArray(raw.includes, locale) : undefined,
  };
}

export function resolveOffer(raw: OfferI18n, locale: Locale): Offer {
  return {
    ...raw,
    title: pickLocale(raw.title, locale) ?? '',
    subtitle: pickLocale(raw.subtitle, locale),
    description: pickLocale(raw.description, locale) ?? '',
    tag: pickLocale(raw.tag, locale),
    inclusions: raw.inclusions ? pickLocaleArray(raw.inclusions, locale) : undefined,
  };
}

export function resolveJournalPost(raw: JournalPostI18n, locale: Locale): JournalPost {
  return {
    ...raw,
    title: pickLocale(raw.title, locale) ?? '',
    readingTime: pickLocale(raw.readingTime, locale),
    excerpt: pickLocale(raw.excerpt, locale) ?? '',
    body: pickLocale(raw.body, locale),
    imageAlt: pickLocale(raw.imageAlt, locale),
  };
}

export function resolveTestimonial(raw: TestimonialI18n, locale: Locale): Testimonial {
  return { ...raw, quote: pickLocale(raw.quote, locale) ?? '' };
}

export function resolveTeamMember(raw: TeamMemberI18n, locale: Locale): TeamMember {
  return {
    ...raw,
    role: pickLocale(raw.role, locale) ?? '',
    bio: pickLocale(raw.bio, locale) ?? '',
  };
}
