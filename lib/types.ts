/* Shared content types. Image fields accept either a Sanity image object
   (when the CMS is configured) or a plain URL string (static fallback). */
import type { LocaleField } from './locales';

export type Img = unknown;

/**
 * "Resolved" types below (Room, Experience, ...) are what every
 * presentational component consumes — always flat, single-locale strings,
 * regardless of source. The `*I18n` types are the raw shape coming out of
 * Sanity or lib/data.ts, with translatable fields as LocaleField objects;
 * lib/resolveLocale.ts converts *I18n -> the flat type for the current
 * request's locale. Components never see the raw *I18n shape.
 */

export interface Room {
  _id?: string;
  name: string;
  slug: string;
  type: 'Classic' | 'Deluxe' | 'Suite';
  description: string;
  heroImage: Img;
  imageAlt?: string;
  gallery?: Img[];
  rate: number;
  sqm: number;
  occupancy: number;
  floor?: string;
  view?: string;
  amenities: string[];
  featured?: boolean;
  active?: boolean;
}

export interface Experience {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  heroImage: Img;
  imageAlt?: string;
  duration: string;
  price: string;
  seasons?: string[];
  includes?: string[];
}

export interface Offer {
  _id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  tag?: string;
  image: Img;
  inclusions?: string[];
  validFrom?: string;
  validUntil?: string;
  type?: string;
}

export interface JournalPost {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime?: string;
  excerpt: string;
  body?: unknown[];
  heroImage: Img;
  imageAlt?: string;
  featured?: boolean;
}

export interface Testimonial {
  _id?: string;
  guestName: string;
  quote: string;
  rating: number;
  roomStayed?: string;
  date?: string;
  source?: string;
  featured?: boolean;
}

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  headshot: Img;
  department?: string;
  displayOrder?: number;
}

export interface RoomI18n extends Omit<Room, 'name' | 'description' | 'imageAlt' | 'amenities'> {
  name: LocaleField;
  description: LocaleField;
  imageAlt?: LocaleField;
  amenities: LocaleField[];
}

export interface ExperienceI18n extends Omit<Experience, 'name' | 'description' | 'imageAlt' | 'duration' | 'price' | 'includes'> {
  name: LocaleField;
  description: LocaleField;
  imageAlt?: LocaleField;
  duration: LocaleField;
  price: LocaleField;
  includes?: LocaleField[];
}

export interface OfferI18n extends Omit<Offer, 'title' | 'subtitle' | 'description' | 'tag' | 'inclusions'> {
  title: LocaleField;
  subtitle?: LocaleField;
  description: LocaleField;
  tag?: LocaleField;
  inclusions?: LocaleField[];
}

export interface JournalPostI18n extends Omit<JournalPost, 'title' | 'readingTime' | 'excerpt' | 'body' | 'imageAlt'> {
  title: LocaleField;
  readingTime?: LocaleField;
  excerpt: LocaleField;
  body?: LocaleField<unknown[]>;
  imageAlt?: LocaleField;
}

export interface TestimonialI18n extends Omit<Testimonial, 'quote'> {
  quote: LocaleField;
}

export interface TeamMemberI18n extends Omit<TeamMember, 'role' | 'bio'> {
  role: LocaleField;
  bio: LocaleField;
}
