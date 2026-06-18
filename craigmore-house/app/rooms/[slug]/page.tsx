import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
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

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

/* SEO from static data only — never blocks on the CMS. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = fallbackRooms.find((r) => r.slug === slug);
  if (!room) return { title: 'Rooms & Suites' };
  return {
    title: `${room.name} — ${room.type} Room`,
    description: `${room.name} at ${hotelConfig.name}: ${room.sqm} sqm, sleeps ${room.occupancy}, from £${room.rate} per night.`,
  };
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

  const roomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    occupancy: { '@type': 'QuantitativeValue', maxValue: room.occupancy },
    floorSize: { '@type': 'QuantitativeValue', value: room.sqm, unitCode: 'MTK' },
    containedInPlace: { '@type': 'LodgingBusiness', name: hotelConfig.name, url: hotelConfig.siteUrl },
    offers: { '@type': 'Offer', price: room.rate, priceCurrency: 'GBP' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      <PageHero eyebrow={`${room.type} room`} title={room.name} subtitle={room.view} image={room.heroImage} />

      <section className="mx-auto max-w-7xl px-6 py-20 pb-32 lg:px-10 lg:py-28 lg:pb-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
          <div>
            <FadeUp>
              <SectionLabel>The room</SectionLabel>
              <p className="mt-6 font-body text-lg font-light leading-[1.9] text-ink/85">{room.description}</p>
            </FadeUp>

            <FadeUp className="mt-16">
              <SectionLabel>In the room</SectionLabel>
              <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex gap-3 font-body text-sm text-ink/80">
                    <span className="mt-[9px] h-px w-5 shrink-0 bg-gold" aria-hidden />
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
              <p className="font-body text-[11px] uppercase tracking-[0.25em] text-ink/60">From</p>
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
                    <dt className="font-body text-[11px] uppercase tracking-[0.2em] text-ink/50">{k}</dt>
                    <dd className="text-right font-body text-sm text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <BookButton roomHint={room.name} className="mt-8 w-full bg-forest px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest">
                Check availability
              </BookButton>
              <p className="mt-5 text-center font-body text-xs text-ink/60">
                Or call{' '}
                <a href={`tel:${hotelConfig.contact.phone.replace(/[^+\d]/g, '')}`} className="text-forest underline decoration-gold underline-offset-4">
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
