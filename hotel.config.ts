/**
 * hotel.config.ts — single source of truth for client identity.
 * Cloning for a new hotel: edit this file, swap the Tailwind colour
 * tokens, point env vars at the new Sanity project + booking engine.
 */
export const hotelConfig = {
  name: 'Craigmore House',
  tagline: 'Highland solitude, done properly.',
  description:
    'A twelve-room country house hotel in Highland Perthshire. Open fires, serious cooking, and four hundred acres of silence.',
  location: {
    address: 'Perthshire, PH15 2NR',
    region: 'Perthshire, Scotland',
    lat: 56.6,
    lng: -3.9,
  },
  contact: {
    phone: '+44 (0)1796 000 000',
    email: 'enquiries@craigmorehouse.com',
    instagram: 'https://instagram.com/craigmorehouse',
    facebook: 'https://facebook.com/craigmorehouse',
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.craigmorehouse.com',
  rooms: 12,
  starRating: 4,
  priceRange: '£££',
  checkIn: '3.00pm',
  checkOut: '11.00am',
  trustItems: [
    'Best Rate Guaranteed',
    'No Booking Fees',
    'Complimentary Welcome Dram',
    'Rated 5 Stars by Guests',
  ],
};

export type HotelConfig = typeof hotelConfig;
