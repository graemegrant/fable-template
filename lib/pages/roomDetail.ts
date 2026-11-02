import { notFound } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch, imgSrc } from '@/lib/sanity';
import { breadcrumbList, HOTEL_ID } from '@/lib/schema';
import { ROOM_BY_SLUG_QUERY, ROOMS_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms } from '@/lib/data';
import type { RoomI18n } from '@/lib/types';
import { resolveRoom } from '@/lib/resolveLocale';
import { bcp47For, type Locale } from '@/lib/locales';


/** Data for the RoomDetail page, shared by every look. */
export async function loadRoomDetail(locale: Locale, slug: string) {
  const rawRoom = await sanityFetch<RoomI18n | null>(
    ROOM_BY_SLUG_QUERY,
    { slug },
    fallbackRooms.find((r) => r.slug === slug) ?? null,
  );
  if (!rawRoom) notFound();
  const room = resolveRoom(rawRoom, locale);
  const rawAllRooms = await sanityFetch<RoomI18n[]>(ROOMS_QUERY, {}, fallbackRooms);
  const related = rawAllRooms
    .filter((r) => r.slug !== room.slug)
    .slice(0, 3)
    .map((r) => resolveRoom(r, locale));
  const roomUrl = `${hotelConfig.siteUrl}/${locale}/rooms/${room.slug}`;
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  const roomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.roomType,
    description: room.description,
    url: roomUrl,
    inLanguage: bcp47For(locale),
    image: [imgSrc(room.heroImage, 1200)],
    occupancy: { '@type': 'QuantitativeValue', maxValue: room.occupancy },
    ...(room.sqm ? { floorSize: { '@type': 'QuantitativeValue', value: room.sqm, unitCode: 'MTK' } } : {}),
    containedInPlace: { '@id': HOTEL_ID, '@type': 'Hotel', name: hotelConfig.name, url: hotelConfig.siteUrl },
    offers: {
      '@type': 'Offer',
      price: room.rate,
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: roomUrl,
      priceValidUntil,
    },
  };
  const breadcrumbs = breadcrumbList([
    ['Home', '/'],
    ['Rooms & Suites', '/rooms'],
    [room.roomType, `/rooms/${room.slug}`],
  ], locale);
  return { room, related, roomSchema, breadcrumbs };
}

export type RoomDetailData = Awaited<ReturnType<typeof loadRoomDetail>>;
