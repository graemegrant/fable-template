import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { sanityFetch } from '@/lib/sanity';
import { ROOM_BY_SLUG_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms } from '@/lib/data';
import type { RoomI18n } from '@/lib/types';
import { pickLocale, resolveRoom } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `A room at ${hotelConfig.name}`;

export function generateStaticParams() {
  return LOCALE_IDS.flatMap((locale) => fallbackRooms.map((r) => ({ locale, slug: r.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawRoom = await sanityFetch<RoomI18n | null>(
    ROOM_BY_SLUG_QUERY,
    { slug },
    fallbackRooms.find((r) => r.slug === slug) ?? null,
  );
  const room = rawRoom ? resolveRoom(rawRoom, locale) : null;
  const locationLabel = pickLocale(hotelConfig.seo.locationLabel, locale);
  return renderOgImage({
    eyebrow: room ? `${room.type} Room · ${locationLabel}` : locationLabel,
    title: room ? room.name : 'Rooms & Suites',
    footer: room ? `From £${room.rate} / night` : undefined,
  });
}
