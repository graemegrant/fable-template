import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch, imgSrc } from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbList, HOTEL_ID } from '@/lib/schema';
import { ROOM_BY_SLUG_QUERY, ROOMS_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms } from '@/lib/data';
import type { Room } from '@/lib/types';
import PageHero from '@/components/PageHero';
import GalleryLightbox from '@/components/GalleryLightbox';
import RoomCard from '@/components/RoomCard';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';
import { BookButton } from '@/components/BookingModal';
import MobileBookBar from '@/components/MobileBookBar';

/* Prebuild the rooms we ship statically; CMS-only slugs render on demand
   and then cache for the same window. */
export const revalidate = 600;
export function generateStaticParams() {
  return fallbackRooms.map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/* Reads the CMS (with the static entry as fallback) so a room authored
   only in Sanity still gets a real title, description and canonical. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await sanityFetch<Room | null>(
    ROOM_BY_SLUG_QUERY,
    { slug },
    fallbackRooms.find((r) => r.slug === slug) ?? null,
  );
  if (!room) return { title: 'Rooms & Suites' };
  return pageMetadata({
    title: `${room.name} — ${room.type}, ${hotelConfig.location.locality}`,
    description: `${room.name} at ${hotelConfig.name}, ${hotelConfig.location.locality}: ${room.sqm} sqm, sleeps ${room.occupancy}, from £${room.rate} per night.`,
    path: `/rooms/${room.slug}`,
    image: `/rooms/${room.slug}/opengraph-image`,
  });
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = await sanityFetch<Room | null>(
    ROOM_BY_SLUG_QUERY,
    { slug },
    fallbackRooms.find((r) => r.slug === slug) ?? null,
  );
  if (!room) notFound();

  const allRooms = await sanityFetch<Room[]>(ROOMS_QUERY, {}, fallbackRooms);
  const related = allRooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  const roomUrl = `${hotelConfig.siteUrl}/rooms/${room.slug}`;
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  const roomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    url: roomUrl,
    image: [imgSrc(room.heroImage, 1200)],
    occupancy: { '@type': 'QuantitativeValue', maxValue: room.occupancy },
    floorSize: { '@type': 'QuantitativeValue', value: room.sqm, unitCode: 'MTK' },
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
    [room.name, `/rooms/${room.slug}`],
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero eyebrow={`${room.type} room · ${hotelConfig.location.locality}`} title={room.name} subtitle={room.view} image={room.heroImage} imageAlt={room.imageAlt} />

      <section className="mx-auto max-w-7xl px-6 py-20 pb-32 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-360">
          <div>
            <FadeUp>
              <SectionLabel>The room</SectionLabel>
              <p className="mt-6 font-body text-lg font-light leading-body text-ink/85">{room.description}</p>
            </FadeUp>

            <FadeUp className="mt-16">
              <SectionLabel>In the room</SectionLabel>
              <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex gap-3 font-body text-sm text-ink/80">
                    <span className="mt-9px h-px w-5 shrink-0 bg-gold" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {room.gallery && room.gallery.length > 0 && (
              <FadeUp className="mt-16">
                <SectionLabel>Gallery</SectionLabel>
                <div className="mt-6">
                  <GalleryLightbox images={room.gallery} alt={room.name} />
                </div>
              </FadeUp>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <aside>
            <div className="border border-ink/10 bg-warmgrey p-8 lg:sticky lg:top-28">
              <p className="font-body text-2xs uppercase tracking-25 text-ink/60">From</p>
              <p className="mt-2 font-heading text-5xl font-medium text-forest">
                £{room.rate}
                <span className="font-body text-sm font-light text-ink/60"> / night</span>
              </p>
              <dl className="mt-8 space-y-3 border-t border-ink/10 pt-7">
                {[
                  ['Size', `${room.sqm} sqm`],
                  ['Sleeps', `${room.occupancy}`],
                  ['Floor', room.floor],
                  ['Outlook', room.view],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">{k}</dt>
                    <dd className="text-right font-body text-sm text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <BookButton roomHint={room.name} className="mt-8 w-full rounded-ctrl bg-forest px-8 py-4 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest">
                Check availability
              </BookButton>
              <p className="mt-5 text-center font-body text-xs text-ink/60">
                Or call{' '}
                <a href={`tel:${hotelConfig.contact.phoneHref}`} className="text-forest underline decoration-gold underline-offset-4">
                  {hotelConfig.contact.phone}
                </a>
              </p>
              <ul className="mt-6 space-y-2 border-t border-ink/10 pt-6">
                {hotelConfig.trustItems.slice(0, 3).map((t) => (
                  <li key={t} className="flex items-center gap-3 font-body text-xs text-ink/70">
                    <span className="h-px w-4 bg-gold" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Related rooms */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp>
            <SectionLabel>Also worth a look</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink">Other rooms</h2>
          </FadeUp>
          <StaggerGrid className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}><RoomCard room={r} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Mobile sticky booking bar — hidden on desktop where sidebar handles this */}
      <MobileBookBar rate={room.rate} roomName={room.name} />
    </>
  );
}
