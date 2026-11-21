import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import DayPage from '../components/day/DayPage';
import RoomsWindow from '../components/day/RoomsWindow';
import { HourMark } from '../components/day/DayChapter';
import RoomsFilter from '../components/RoomsFilter';
import TrustStrip from '../components/TrustStrip';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp } from '../components/Motion';
import SectionLabel from '../components/SectionLabel';
import { Link } from '@/i18n/navigation';
import type { RoomsData } from '@/lib/pages/rooms';

/** Rooms page, Cinematic look. Data comes from lib/pages/rooms.ts. */
export default async function RoomsView({ rooms, showSize }: { locale: Locale } & RoomsData) {
  const t = await getTranslations('roomsPage');
  const d = await getTranslations('day');
  const cell = 'px-4 py-4 sm:px-5';
  return (
    <DayPage light="morning" time="10:00" label={d('lateMorning')}>
      <PageHero light="day" hour={{ time: '10:00', label: d('lateMorning') }}
        eyebrow={`${t('eyebrowLabel')} / ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.room1}
      />
      <TrustStrip />

      {/* Signature moment: late morning, and the rooms pass one by one
          through an arched window (RoomsWindow), in a pale band that rises
          out of the dark page and falls back into it. */}
      <div className="day-band-light text-ink">
        <div aria-hidden className="h-24 lg:h-72" />
        <RoomsWindow
          rooms={rooms}
          intro={
            <>
              <HourMark time="10:00" label={d('lateMorning')} tone="paper" />
              <SectionLabel index="01" variant="onpaper" className="mt-10">
                {t('eyebrowLabel')}
              </SectionLabel>
              <p className="mt-6 max-w-xl font-body text-lg leading-copy text-ink">{t('intro')}</p>
            </>
          }
        />
        <div aria-hidden className="h-24 lg:h-72" />
      </div>

      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-16 lg:py-24">
        <div>
          <RoomsFilter rooms={rooms} />
        </div>

        {/* Compare at a glance: a spec sheet */}
        <FadeUp className="mt-24">
          <SectionLabel index="02">{t('compareLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl font-normal leading-none text-canvas md:text-7xl">{t('compareHeading')}</h2>
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
                        className="inline-flex min-h-11 items-center gap-4 font-heading text-xl font-normal text-canvas transition-colors hover:text-accentondark"
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
    </DayPage>
  );
}
