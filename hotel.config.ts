/**
 * hotel.config.ts — single source of truth for client identity.
 * Cloning for a new hotel: edit this file, swap the Tailwind colour
 * tokens (lib/tokens.ts), point env vars at the new Sanity project +
 * booking engine. Every field below must carry the client's real value
 * before launch — see NEW-CLIENT-CHECKLIST.md §2.
 *
 * Translatable fields use the LocaleField shape ({ en: '...' }) — see
 * lib/locales.ts. Only fill in the locales you have real copy for; a
 * missing locale falls back to the default (AGENTS.md §9). Everything
 * else here (address parts, contact info, coordinates, ISO times) stays
 * a flat, unlocalized value.
 */
import type { LocaleField } from './lib/locales';

export const hotelConfig = {
  name: 'Craigmore House',
  tagline: { en: 'Highland solitude, done properly.' } as LocaleField,
  description: {
    en: 'A twelve-room country house hotel in Highland Perthshire. Open fires, serious cooking, and four hundred acres of silence.',
  } as LocaleField,
  location: {
    // Structured parts — used for schema.org PostalAddress and local SEO.
    // A vague address breaks hotel rich results.
    street: 'Craigmore Road',
    locality: 'Aberfeldy',
    region: 'Perthshire',
    postalCode: 'PH15 2NR',
    country: 'GB',
    // Human-readable single line for footers / contact page.
    address: 'Craigmore Road, Aberfeldy, Perthshire, PH15 2NR',
    // Longer display label used in hero eyebrows / footer legal line.
    regionLabel: { en: 'Perthshire, Scotland' } as LocaleField,
    // Rooftop coordinates to 5 d.p. — feeds JSON-LD geo and the /location
    // map pin. Set to the real building before launch.
    lat: 56.62194,
    lng: -3.86694,
  },
  contact: {
    // Display form (spacing, national prefix in brackets).
    phone: '+44 (0)1887 000 000',
    // Dialable E.164 form — used for tel: links and schema.org telephone.
    // Never derive this from `phone` at runtime; keep it explicit.
    phoneHref: '+441887000000',
    email: 'enquiries@craigmorehouse.com',
    instagram: 'https://instagram.com/craigmorehouse',
    facebook: 'https://facebook.com/craigmorehouse',
  },
  /** Reception desk hours — display string plus 24h forms for schema. */
  reception: {
    display: { en: '7am – 11pm daily. Night porter on duty after hours.' } as LocaleField,
    opens: '07:00',
    closes: '23:00',
  },
  /** Guest-facing amenities — drives schema amenityFeature and can be
   *  surfaced on-page. Keep to things that are actually true. */
  amenities: [
    'Free on-site parking',
    'EV charging',
    'Dog-friendly rooms',
    'Restaurant',
    'Free breakfast',
    'Step-free access',
    'Family rooms',
    'Free Wi-Fi',
  ].map((v): LocaleField => ({ en: v })),
  petsAllowed: true,
  /** SEO copy that varies per client. */
  seo: {
    /** Short human descriptor used in the homepage <title> and hero eyebrows. */
    descriptor: { en: 'Country House Hotel' } as LocaleField,
    /** Location phrase appended to titles and used in fallback meta. */
    locationLabel: { en: 'Aberfeldy, Perthshire' } as LocaleField,
    /**
     * Emit an aggregateRating in the Hotel JSON-LD, derived from the
     * featured testimonials. Only set true once those testimonials are
     * genuine, verifiable guest reviews — a fabricated rating risks a
     * Google manual action.
     */
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.craigmorehouse.com',
  rooms: 12,
  starRating: 4,
  priceRange: '£££',
  // Display strings for the page; checkInISO / checkOutISO are the
  // schema.org Time values (ISO 8601, "HH:MM:SS") — keep both in sync,
  // schema.org needs the unlocalized ISO form regardless of locale.
  checkIn: { en: '3.00pm' } as LocaleField,
  checkOut: { en: '11.00am' } as LocaleField,
  checkInISO: '15:00:00',
  checkOutISO: '11:00:00',
  trustItems: [
    'Best Rate Guaranteed',
    'No Booking Fees',
    'Complimentary Welcome Dram',
    'Loved by Our Guests',
  ].map((v): LocaleField => ({ en: v })),
};

export type HotelConfig = typeof hotelConfig;
