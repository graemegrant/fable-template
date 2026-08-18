import type { Metadata } from 'next';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { ROOMS_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms, IMG } from '@/lib/data';
import type { Room } from '@/lib/types';
import PageHero from '@/components/PageHero';
import RoomsFilter from '@/components/RoomsFilter';
import TrustStrip from '@/components/TrustStrip';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Rooms & Suites',
  description: `The twelve rooms of ${hotelConfig.name}: classic rooms, deluxe doubles and suites, each facing the glen, the garden or the river.`,
};

export default async function RoomsPage() {
  const rooms = await sanityFetch<Room[]>(ROOMS_QUERY, {}, fallbackRooms);

  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Rooms & suites"
        subtitle="Twelve rooms, no two alike, every one facing something worth waking up to."
        image={IMG.room1}
      />
      <TrustStrip />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-body text-ink/80">
            Every room comes with breakfast, the run of four hundred acres, and housekeeping that
            believes in hospital corners. Suites add space and sitting rooms; Classics add the
            particular smugness of having chosen well for less.
          </p>
        </FadeUp>
        <div className="mt-14">
          <RoomsFilter rooms={rooms} />
        </div>
      </section>
      <DirectBookingBanner />
    </>
  );
}
