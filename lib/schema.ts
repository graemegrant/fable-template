import { hotelConfig } from '@/hotel.config';
import { imgSrc } from '@/lib/sanity';
import { IMG, testimonials } from '@/lib/data';
import { bcp47For, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import { pickLocale } from '@/lib/resolveLocale';

/** Stable node id for the hotel entity — referenced from HotelRoom,
 *  BreadcrumbList and page-level blocks so everything resolves to one place. */
export const HOTEL_ID = `${hotelConfig.siteUrl}/#hotel`;

/**
 * The primary business entity. `@type: "Hotel"` (a LodgingBusiness subtype)
 * is Google's preferred type for hotel structured data.
 */
export function hotelSchema(locale: Locale = DEFAULT_LOCALE) {
  const { location, contact, reception } = hotelConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': HOTEL_ID,
    name: hotelConfig.name,
    description: pickLocale(hotelConfig.description, locale),
    url: hotelConfig.siteUrl,
    image: [imgSrc(IMG.heroHouse, 1200)],
    inLanguage: bcp47For(locale),
    telephone: contact.phoneHref,
    email: contact.email,
    priceRange: hotelConfig.priceRange,
    currenciesAccepted: 'GBP',
    starRating: { '@type': 'Rating', ratingValue: hotelConfig.starRating, bestRating: 5 },
    numberOfRooms: hotelConfig.rooms,
    checkinTime: hotelConfig.checkInISO,
    checkoutTime: hotelConfig.checkOutISO,
    petsAllowed: hotelConfig.petsAllowed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${hotelConfig.name}, ${location.address}`,
    )}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: reception.opens,
        closes: reception.closes,
      },
    ],
    amenityFeature: hotelConfig.amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name: pickLocale(name, locale),
      value: true,
    })),
    // Off by default. Enable via hotelConfig.seo.publishAggregateRating only
    // when the featured testimonials are genuine, verifiable reviews.
    ...(hotelConfig.seo.publishAggregateRating && testimonials.length
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue:
              Math.round(
                (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
                  testimonials.length) *
                  10,
              ) / 10,
            reviewCount: testimonials.length,
            bestRating: 5,
          },
        }
      : {}),
    sameAs: [contact.instagram, contact.facebook],
  };
}

/** BreadcrumbList for a deep page. Pass ordered [name, path] pairs
 *  including the current page; paths are root-relative and WITHOUT the
 *  locale prefix — this function adds it, so callers don't duplicate that
 *  logic (same convention as lib/seo.ts pageMetadata()). */
export function breadcrumbList(trail: Array<[name: string, path: string]>, locale: Locale = DEFAULT_LOCALE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${hotelConfig.siteUrl}/${locale}${path}`,
    })),
  };
}
