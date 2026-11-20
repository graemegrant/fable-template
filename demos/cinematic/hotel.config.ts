/**
 * Cinematic demo: Wythe Glass, a fictional nine-room glass pavilion on the
 * shore of Wythe Water, an invented fell lake in the western Lake District.
 * Swapped in for hotel.config.ts when built with DEMO=cinematic (see
 * demos/README.md). Same shape as the template's config; everything here is
 * invented for the demo, so `noindex` keeps it out of search and
 * `demoNotice` says so in the footer.
 */
import type { HotelConfig } from '../../hotel.config';
import type { MotionIntensity, MotionSettings } from '../../lib/ui/gsap/settings';
import type { Look } from '../../themes/looks';
import type { Locale } from '../../lib/locales';

export const hotelConfig: HotelConfig = {
  look: 'cinematic' as Look,
  languages: ['en'] as Locale[],
  noindex: true,
  demoNotice: {
    en: 'A Codero demo. Wythe Glass and Wythe Water are fictional, made to show the Cinematic look.',
  },
  coderoCredit: true,
  /** The GSAP motion layer (lib/ui/gsap, AGENTS.md §5a): the showcase, so
   *  everything on. Full on desktop, soft on phones and tablets, never under
   *  reduced motion. */
  motion: {
    intensity: 'immersive' as MotionIntensity,
    smoothScroll: true,
    mobile: 'soft' as 'soft' | 'off',
    patterns: {
      heroAperture: true,
      splitHeadings: true,
      wordReveal: true,
      roomsReel: true,
      imageCurtain: true,
      parallax: true,
      menuOverlay: true,
      reveals: true,
      scrollMarquee: true,
      expandPlates: true,
      cursor: true,
    },
  } satisfies MotionSettings,
  name: 'Wythe Glass',
  tagline: { en: 'Nine rooms of glass on a quiet fell lake.' },
  description: {
    en: 'A glass pavilion with nine rooms on the shore of Wythe Water, in the quiet western Lakes. Floor-to-ceiling windows, a lakeshore sauna, rowing boats on the jetty and a kitchen that cooks what the fells and the water give it.',
  },
  location: {
    street: 'Wythe Water',
    locality: 'Loweswater',
    region: 'Cumbria',
    // Invented for the demo.
    postalCode: 'CA13 9ZZ',
    country: 'GB',
    address: 'Wythe Water, Loweswater, Cockermouth, Cumbria, CA13 9ZZ',
    regionLabel: { en: 'The Lake District, Cumbria' },
    lat: 54.5853,
    lng: -3.3612,
  },
  contact: {
    // Ofcom's drama range: reserved for fiction, never a real line.
    phone: '+44 (0)1632 960418',
    phoneHref: '+441632960418',
    email: 'stay@wytheglass.example',
    instagram: '',
    facebook: '',
  },
  reception: {
    display: { en: 'Open 7am to 11pm. After that, ring the bell and someone will come.' },
    opens: '07:00',
    closes: '23:00',
  },
  amenities: [
    { en: 'Restaurant' },
    { en: 'Lakeshore sauna' },
    { en: 'Rowing boats' },
    { en: 'Free breakfast' },
    { en: 'EV charging' },
    { en: 'Step-free rooms' },
    { en: 'Free Wi-Fi' },
  ],
  petsAllowed: false,
  seo: {
    descriptor: { en: 'Lakeside Hotel' },
    locationLabel: { en: 'Wythe Water, Lake District' },
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  bookingEngine: { provider: 'auto', currency: 'GBP' },
  directBookingPerk: { en: 'A morning in the sauna and a boat on the lake, on us.' },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  rooms: 9,
  stats: [
    { value: 9, label: { en: 'Rooms, every one facing the water' } },
    { value: 46, suffix: ' m', label: { en: 'Of glass along the shore' } },
    { value: 40, suffix: ' m', label: { en: 'From your bed to the lake' } },
    { value: 6, label: { en: 'Rowing boats on the jetty' } },
  ],
  stayIncludes: [
    { en: 'Free breakfast' },
    { en: 'The lakeshore sauna' },
    { en: 'A rowing boat whenever you like' },
    { en: 'Free Wi-Fi' },
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
    { en: 'Sauna and Boats Included' },
    { en: 'Loved by Our Guests' },
  ],
};
