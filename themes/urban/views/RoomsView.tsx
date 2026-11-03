import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import RoomsFilter from '../components/RoomsFilter';
import TrustStrip from '../components/TrustStrip';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp } from '../components/Motion';
import SectionLabel from '../components/SectionLabel';
import { Link } from '@/i18n/navigation';
import type { RoomsData } from '@/lib/pages/rooms';

/** Rooms page, Coastal look. Data comes from lib/pages/rooms.ts. */
export default async function RoomsView({ rooms, showSize }: { locale: Locale } & RoomsData) {
  const t = await getTranslations('roomsPage');
  const cell = 'px-5 py-4 sm:px-6';
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} · ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.room1}
      />
      <TrustStrip />
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10 lg:pb-28">
        <FadeUp>
          <p className="max-w-3xl font-heading text-2xl leading-snug text-primary md:text-3xl">{t('intro')}</p>
        </FadeUp>
        <div className="mt-12">
          <RoomsFilter rooms={rooms} />
        </div>

        {/* Compare at a glance */}
        <FadeUp className="mt-24">
          <SectionLabel>{t('compareLabel')}</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('compareHeading')}</h2>
          <div className="shadow-sand mt-10 overflow-x-auto rounded-card bg-canvas p-2">
            <table className="w-full text-left">
              <thead>
                <tr className="font-body text-sm font-semibold text-primary">
                  <th scope="col" className={`${cell} rounded-l-img bg-canvasalt`}>{t('colRoom')}</th>
                  {showSize && <th scope="col" className={`${cell} hidden bg-canvasalt sm:table-cell`}>{t('colSize')}</th>}
                  <th scope="col" className={`${cell} bg-canvasalt`}>{t('colSleeps')}</th>
                  <th scope="col" className={`${cell} bg-canvasalt max-sm:rounded-r-img`}>{t('colFrom')}</th>
                  <th scope="col" className={`${cell} hidden rounded-r-img bg-canvasalt sm:table-cell`}>
                    <span className="sr-only">{t('viewRoom')}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {rooms.map((room) => (
                  <tr key={room.slug} className="font-body text-sm text-ink/85">
                    <th scope="row" className={`${cell} font-heading text-lg font-semibold text-primary`}>
                      <Link href={`/rooms/${room.slug}`} className="inline-flex min-h-11 items-center transition-colors hover:text-accent">
                        {room.roomType}
                      </Link>
                    </th>
                    {showSize && <td className={`${cell} hidden sm:table-cell`}>{room.sqm ? `${room.sqm} ${t('sqmUnit')}` : '—'}</td>}
                    <td className={cell}>{room.occupancy}</td>
                    <td className={`${cell} whitespace-nowrap`}>
                      <span className="font-heading text-base font-semibold text-primary">£{room.rate}</span>{' '}
                      <span className="text-ink/75">{t('perNight')}</span>
                    </td>
                    <td className={`${cell} hidden text-right sm:table-cell`}>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex min-h-11 items-center whitespace-nowrap rounded-ctrl bg-canvasalt px-4 font-body text-sm font-semibold text-accent transition-colors hover:bg-primary hover:text-canvas"
                      >
                        {t('viewRoom')} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 px-2 font-body text-sm text-ink/75">{t('compareNote')}</p>
        </FadeUp>
      </section>
      <DirectBookingBanner />
    </>
  );
}
