import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { ROOMS_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms, IMG } from '@/lib/data';
import type { RoomI18n } from '@/lib/types';
import { resolveRoom } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import RoomsFilter from '@/components/RoomsFilter';
import TrustStrip from '@/components/TrustStrip';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp } from '@/components/Motion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Rooms & Suites in ${hotelConfig.location.locality}`,
    description: `The rooms of ${hotelConfig.name}: classic rooms, deluxe doubles and suites, each facing the glen, the garden or the river.`,
    path: '/rooms',
  });
}

export default async function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawRooms = await sanityFetch<RoomI18n[]>(ROOMS_QUERY, {}, fallbackRooms);
  const rooms = rawRooms.map((r) => resolveRoom(r, locale));

  return (
    <>
      <PageHero
        eyebrow={`Stay · ${hotelConfig.location.locality}`}
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
