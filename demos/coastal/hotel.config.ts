/**
 * Coastal demo: Polvarra Cove, a fictional fourteen-room hotel above a cove
 * near St Agnes, North Cornwall. Swapped in for hotel.config.ts when built
 * with DEMO=coastal (see demos/README.md). Same shape as the template's
 * config; everything here is invented for the demo, so `noindex` keeps it
 * out of search and `demoNotice` says so in the footer.
 */
import type { HotelConfig } from '../../hotel.config';
import type { Look } from '../../themes/looks';
import type { Locale } from '../../lib/locales';

export const hotelConfig: HotelConfig = {
  look: 'coastal' as Look,
  languages: ['en'] as Locale[],
  noindex: true,
  demoNotice: {
    en: 'A Codero demo. Polvarra Cove is a fictional hotel, made to show the Coastal look.',
  },
  name: 'Polvarra Cove',
  tagline: { en: 'Sand on the stairs, salt in the air.' },
  description: {
    en: 'A fourteen-room hotel above a sandy cove on the North Cornwall coast. Sea views from every room, a kitchen that buys from the boats, and the coast path at the garden gate.',
  },
  location: {
    street: 'Cove Lane',
    locality: 'St Agnes',
    region: 'Cornwall',
    // Invented for the demo.
    postalCode: 'TR5 0ZZ',
    country: 'GB',
    address: 'Cove Lane, St Agnes, Cornwall, TR5 0ZZ',
    regionLabel: { en: 'North Cornwall' },
    lat: 50.31982,
    lng: -5.21851,
  },
  contact: {
    // Ofcom's drama range: reserved for fiction, never a real line.
    phone: '+44 (0)1632 960 214',
    phoneHref: '+441632960214',
    email: 'stay@polvarracove.co.uk',
    instagram: '',
    facebook: '',
  },
  reception: {
    display: { en: '7am to 10pm daily. A night manager is on call after hours.' },
    opens: '07:00',
    closes: '22:00',
  },
  amenities: [
    { en: 'Free on-site parking' },
    { en: 'EV charging' },
    { en: 'Dog-friendly rooms' },
    { en: 'Restaurant' },
    { en: 'Free breakfast' },
    { en: 'Sea-view terrace' },
    { en: 'Wood-fired sauna' },
    { en: 'Free Wi-Fi' },
  ],
  petsAllowed: true,
  seo: {
    descriptor: { en: 'Seaside Hotel' },
    locationLabel: { en: 'St Agnes, Cornwall' },
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  bookingEngine: { provider: 'auto', currency: 'GBP' },
  directBookingPerk: { en: 'Cream tea on the terrace when you arrive.' },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  rooms: 14,
  stats: [
    { value: 14, label: { en: 'Rooms, every one facing the sea' } },
    { value: 1898, label: { en: 'Built for a mine captain' } },
    { value: 3, suffix: ' min', label: { en: 'From your room to the sand' } },
    { value: 6, label: { en: 'Coves within an easy walk' } },
  ],
  stayIncludes: [
    { en: 'Free breakfast' },
    { en: 'Free Wi-Fi' },
    { en: 'Free on-site parking' },
    { en: 'Beach towels and a bucket for rock-pooling' },
  ],
  reviewSummary: null,
  starRating: 4,
  priceRange: '£££',
  checkIn: { en: '3.00pm' },
  checkOut: { en: '11.00am' },
  checkInISO: '15:00:00',
  checkOutISO: '11:00:00',
  trustItems: [
    { en: 'Best Rate Guaranteed' },
    { en: 'No Booking Fees' },
    { en: 'Cream Tea on Arrival' },
    { en: 'Loved by Our Guests' },
  ],
};
