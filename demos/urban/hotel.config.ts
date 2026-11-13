/**
 * Urban demo: The Ardlow, a fictional sixteen-room townhouse hotel in
 * Glasgow's Merchant City. Swapped in for hotel.config.ts when built with
 * DEMO=urban (see demos/README.md). Same shape as the template's config;
 * everything here is invented for the demo, so `noindex` keeps it out of
 * search and `demoNotice` says so in the footer.
 */
import type { HotelConfig } from '../../hotel.config';
import type { Look } from '../../themes/looks';
import type { Locale } from '../../lib/locales';

export const hotelConfig: HotelConfig = {
  look: 'urban' as Look,
  languages: ['en'] as Locale[],
  noindex: true,
  demoNotice: {
    en: 'A Codero demo. The Ardlow is a fictional hotel, made to show the Urban look.',
  },
  coderoCredit: true,
  name: 'The Ardlow',
  tagline: { en: 'Sixteen rooms in the middle of everything.' },
  description: {
    en: 'A sixteen-room townhouse hotel in Glasgow’s Merchant City. Late check-out, a bar that knows its whisky, and the best of the city within a ten-minute walk.',
  },
  location: {
    street: '14 Ardlow Lane',
    locality: 'Merchant City',
    region: 'Glasgow',
    // Invented for the demo.
    postalCode: 'G1 1ZZ',
    country: 'GB',
    address: '14 Ardlow Lane, Merchant City, Glasgow, G1 1ZZ',
    regionLabel: { en: 'Glasgow, Scotland' },
    lat: 55.8593,
    lng: -4.2463,
  },
  contact: {
    // Ofcom's drama range for Glasgow: reserved for fiction, never a real line.
    phone: '+44 (0)141 496 0372',
    phoneHref: '+441414960372',
    email: 'hello@theardlow.co.uk',
    instagram: '',
    facebook: '',
  },
  reception: {
    display: { en: 'Open 24 hours. Someone is always on the desk.' },
    opens: '00:00',
    closes: '23:59',
  },
  amenities: [
    { en: 'Restaurant' },
    { en: 'Cocktail bar' },
    { en: 'Free breakfast' },
    { en: '24-hour reception' },
    { en: 'Late check-out' },
    { en: 'Dog-friendly rooms' },
    { en: 'Step-free access' },
    { en: 'Free Wi-Fi' },
  ],
  petsAllowed: true,
  seo: {
    descriptor: { en: 'Townhouse Hotel' },
    locationLabel: { en: 'Merchant City, Glasgow' },
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  bookingEngine: { provider: 'auto', currency: 'GBP' },
  directBookingPerk: { en: 'Late check-out until 2pm and a drink at the bar on us.' },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  rooms: 16,
  stats: [
    { value: 16, label: { en: 'Rooms, no two alike' } },
    { value: 1872, label: { en: 'Built as a merchant’s warehouse' } },
    { value: 5, suffix: ' min', label: { en: 'Walk to Glasgow Central' } },
    { value: 120, label: { en: 'Whiskies behind the bar' } },
  ],
  stayIncludes: [
    { en: 'Free breakfast' },
    { en: 'Free Wi-Fi' },
    { en: 'Late check-out on request' },
    { en: 'A city guide from the desk' },
  ],
  reviewSummary: null,
  starRating: 4,
  priceRange: '££',
  checkIn: { en: '3.00pm' },
  checkOut: { en: '12.00pm' },
  checkInISO: '15:00:00',
  checkOutISO: '12:00:00',
  trustItems: [
    { en: 'Best Rate Guaranteed' },
    { en: 'No Booking Fees' },
    { en: 'Late Check-out' },
    { en: 'Loved by Our Guests' },
  ],
};
