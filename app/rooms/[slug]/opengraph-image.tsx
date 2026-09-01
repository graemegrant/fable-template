import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { sanityFetch } from '@/lib/sanity';
import { ROOM_BY_SLUG_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms } from '@/lib/data';
import type { Room } from '@/lib/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `A room at ${hotelConfig.name}`;

export function generateStaticParams() {
  return fallbackRooms.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await sanityFetch<Room | null>(
    ROOM_BY_SLUG_QUERY,
    { slug },
    fallbackRooms.find((r) => r.slug === slug) ?? null,
  );
  return renderOgImage({
    eyebrow: room ? `${room.type} Room · ${hotelConfig.seo.locationLabel}` : hotelConfig.seo.locationLabel,
    title: room ? room.name : 'Rooms & Suites',
    footer: room ? `From £${room.rate} / night` : undefined,
  });
}
