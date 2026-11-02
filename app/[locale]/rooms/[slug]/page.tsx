import type { Metadata } from 'next';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { ROOM_BY_SLUG_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms } from '@/lib/data';
import type { RoomI18n } from '@/lib/types';
import { resolveRoom } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';
import RoomDetailView from '@look/views/RoomDetailView';
import { loadRoomDetail } from '@/lib/pages/roomDetail';

/* Prebuild the rooms we ship statically; CMS-only slugs render on demand
   and then cache for the same window. */
export const revalidate = 600;

export function generateStaticParams() {
  return LOCALE_IDS.flatMap((locale) => fallbackRooms.map((r) => ({ locale, slug: r.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

/* Reads the CMS (with the static entry as fallback) so a room authored
   only in Sanity still gets a real title, description and canonical. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawRoom = await sanityFetch<RoomI18n | null>(
    ROOM_BY_SLUG_QUERY,
    { slug },
    fallbackRooms.find((r) => r.slug === slug) ?? null,
  );
  if (!rawRoom) return { title: 'Rooms & Suites' };
  const room = resolveRoom(rawRoom, locale);
  return pageMetadata({
    locale,
    title: `${room.roomType} — ${hotelConfig.location.locality}`,
    description: `${room.roomType} at ${hotelConfig.name}, ${hotelConfig.location.locality}: ${room.sqm ? `${room.sqm} sqm, ` : ''}sleeps ${room.occupancy}, from £${room.rate} per night.`,
    path: `/rooms/${room.slug}`,
    image: `/rooms/${room.slug}/opengraph-image`,
  });
}

export default async function RoomDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadRoomDetail(locale, slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.roomSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbs) }} />
      <RoomDetailView locale={locale} {...data} />
    </>
  );
}
