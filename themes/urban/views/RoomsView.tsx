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

/** Rooms page, Urban look. Data comes from lib/pages/rooms.ts. */
export default async function RoomsView({ rooms, showSize }: { locale: Locale } & RoomsData) {
  const t = await getTranslations('roomsPage');
  const cell = 'px-4 py-4 sm:px-5';
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} / ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.room1}
      />
      <TrustStrip />
      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <FadeUp className="grid gap-8 lg:grid-cols-12">
          <SectionLabel index="01" className="lg:col-span-3">
            {t('eyebrowLabel')}
          </SectionLabel>
          <p className="font-body text-xl leading-snug text-canvas md:text-2xl lg:col-span-8">{t('intro')}</p>
        </FadeUp>
        <div className="mt-14">
          <RoomsFilter rooms={rooms} />
        </div>

        {/* Compare at a glance: a spec sheet */}
        <FadeUp className="mt-24">
          <SectionLabel index="02">{t('compareLabel')}</SectionLabel>
          <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{t('compareHeading')}</h2>
          <div className="mt-10 overflow-x-auto border-t border-canvas">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-canvas/15 font-mono text-xs uppercase tracking-18 text-canvas/70">
                  <th scope="col" className={`${cell} font-normal`}>{t('colRoom')}</th>
                  {showSize && <th scope="col" className={`${cell} hidden font-normal sm:table-cell`}>{t('colSize')}</th>}
                  <th scope="col" className={`${cell} font-normal`}>{t('colSleeps')}</th>
                  <th scope="col" className={`${cell} font-normal`}>{t('colFrom')}</th>
                  <th scope="col" className={`${cell} hidden sm:table-cell`}>
                    <span className="sr-only">{t('viewRoom')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr key={room.slug} className="border-b border-canvas/15 font-mono text-sm text-canvas/85">
                    <th scope="row" className={cell}>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="font-condensed inline-flex min-h-11 items-center gap-4 font-heading text-xl font-extrabold uppercase text-canvas transition-colors hover:text-accentondark"
                      >
                        <span className="font-mono text-xs font-normal text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                        {room.roomType}
                      </Link>
                    </th>
                    {showSize && <td className={`${cell} hidden sm:table-cell`}>{room.sqm ? `${room.sqm} ${t('sqmUnit')}` : '/'}</td>}
                    <td className={cell}>{room.occupancy}</td>
                    <td className={`${cell} whitespace-nowrap`}>
                      <span className="text-canvas">£{room.rate}</span> <span className="text-canvas/70">{t('perNight')}</span>
                    </td>
                    <td className={`${cell} hidden text-right sm:table-cell`}>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-xs uppercase tracking-18 text-accentondark transition-colors hover:text-canvas"
                      >
                        {t('viewRoom')} <span aria-hidden>→</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-18 text-canvas/70">{t('compareNote')}</p>
        </FadeUp>
      </section>
      <DirectBookingBanner />
    </>
  );
}
