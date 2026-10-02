import { getTranslations } from 'next-intl/server';
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
import SectionLabel from '@/components/SectionLabel';
import { Link } from '@/i18n/navigation';

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
  const t = await getTranslations('roomsPage');
  const showSize = rooms.some((r) => r.sqm);

  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} · ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.room1}
      />
      <TrustStrip />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-body text-ink/80">
            {t('intro')}
          </p>
        </FadeUp>
        <div className="mt-14">
          <RoomsFilter rooms={rooms} />
        </div>

        {/* Compare at a glance */}
        <FadeUp className="mt-24">
          <SectionLabel>{t('compareLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-medium text-ink">{t('compareHeading')}</h2>
          <div className="mt-10 overflow-x-auto rounded-card border border-ink/10">
            <table className="w-full text-left">
              <thead className="bg-canvasalt">
                <tr className="font-body text-2xs uppercase tracking-20 text-ink/70">
                  <th scope="col" className="px-6 py-4 font-normal">{t('colRoom')}</th>
                  {showSize && <th scope="col" className="hidden px-6 py-4 font-normal sm:table-cell">{t('colSize')}</th>}
                  <th scope="col" className="px-6 py-4 font-normal">{t('colSleeps')}</th>
                  <th scope="col" className="px-6 py-4 font-normal">{t('colFrom')}</th>
                  <th scope="col" className="hidden px-6 py-4 sm:table-cell"><span className="sr-only">{t('viewRoom')}</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {rooms.map((room) => (
                  <tr key={room.slug} className="font-body text-sm text-ink/85">
                    <th scope="row" className="px-6 py-5 font-heading text-lg font-medium text-ink">
                      <Link href={`/rooms/${room.slug}`} className="inline-flex min-h-11 items-center transition-colors hover:text-accent">{room.roomType}</Link>
                    </th>
                    {showSize && <td className="hidden px-6 py-5 sm:table-cell">{room.sqm ? `${room.sqm} ${t('sqmUnit')}` : '—'}</td>}
                    <td className="px-6 py-5">{room.occupancy}</td>
                    <td className="whitespace-nowrap px-6 py-5">£{room.rate} <span className="text-ink/70">{t('perNight')}</span></td>
                    <td className="hidden px-6 py-5 text-right sm:table-cell">
                      <Link href={`/rooms/${room.slug}`} className="inline-flex min-h-11 items-center whitespace-nowrap font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
                        {t('viewRoom')} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-body text-xs text-ink/70">{t('compareNote')}</p>
        </FadeUp>
      </section>
      <DirectBookingBanner />
    </>
  );
}
