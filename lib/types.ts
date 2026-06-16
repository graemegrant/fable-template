/* Shared content types. Image fields accept either a Sanity image object
   (when the CMS is configured) or a plain URL string (static fallback). */

export type Img = unknown;

export interface Room {
  _id?: string;
  name: string;
  slug: string;
  type: 'Classic' | 'Deluxe' | 'Suite';
  description: string;
  heroImage: Img;
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
