import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import GalleryLightbox from '../components/GalleryLightbox';
import RoomCard from '../components/RoomCard';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import { BookButton } from '../components/BookingModal';
import MobileBookBar from '../components/MobileBookBar';
import type { RoomDetailData } from '@/lib/pages/roomDetail';

/** RoomDetail page, Urban look. Data comes from lib/pages/roomDetail.ts.
 *  The booking column is a sticky spec sheet in a hairline frame. */
export default async function RoomDetailView({ locale, room, related }: { locale: Locale } & RoomDetailData) {
  const t = await getTranslations('roomDetail');
  const stayLines = [
    ...hotelConfig.stayIncludes.map((item) => pickLocale(item, locale) ?? ''),
    t('timesLine', {
      checkIn: pickLocale(hotelConfig.checkIn, locale) ?? '',
      checkOut: pickLocale(hotelConfig.checkOut, locale) ?? '',
    }),
  ];
  const specs = [
    [t('size'), room.sqm ? `${room.sqm} ${t('sqmUnit')}` : ''],
    [t('sleeps'), `${room.occupancy}`],
    [t('floor'), room.floor],
    [t('outlook'), room.view],
  ].filter(([, v]) => v);
  return (
    <>
      {/* roomType is the title, so the eyebrow doesn't repeat it; the subtitle
          adds the room's own name (rare) and its view. */}
      <PageHero
        eyebrow={`${t('stayLabel')} / ${hotelConfig.location.locality}`}
        title={room.roomType}
        subtitle={[room.name, room.view].filter(Boolean).join(' / ')}
        image={room.heroImage}
        imageAlt={room.imageAlt}
      />

      <section className="mx-auto max-w-screen-2xl px-5 pb-32 pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionLabel index="01">{t('theRoom')}</SectionLabel>
              {room.hook && <p className="mt-6 font-heading text-3xl font-semibold leading-tight text-canvas md:text-4xl">{room.hook}</p>}
              <p className="mt-6 font-body text-lg leading-body text-canvas/85">{room.description}</p>
            </FadeUp>

            <FadeUp className="mt-16">
              <SectionLabel index="02">{t('inTheRoom')}</SectionLabel>
              <ol className="mt-6 grid border-t border-canvas/15 sm:grid-cols-2">
                {room.amenities.map((a, i) => (
                  <li key={a} className={`flex gap-4 border-b border-canvas/15 py-3 font-body text-sm text-canvas/90 ${i % 2 === 1 ? 'sm:border-l sm:pl-5' : 'sm:pr-5'}`}>
                    <span className="font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                    {a}
                  </li>
                ))}
              </ol>
            </FadeUp>

            <FadeUp className="mt-16 bg-canvas p-6 text-ink sm:p-8">
              <SectionLabel index="03" variant="onpaper">
                {t('everyStay')}
              </SectionLabel>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {stayLines.map((line) => (
                  <li key={line} className="flex gap-3 font-body text-sm">
                    <span aria-hidden className="font-mono text-accent">+</span>
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="/policies"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-18 text-accent hover:text-ink"
              >
                {t('goodToKnowLink')} <span aria-hidden>→</span>
              </Link>
            </FadeUp>

            {room.gallery && room.gallery.length > 0 && (
              <FadeUp className="mt-16">
                <SectionLabel index="04">{t('gallery')}</SectionLabel>
                <div className="mt-6">
                  <GalleryLightbox images={room.gallery} alt={room.roomType} />
                </div>
              </FadeUp>
            )}
          </div>

          {/* Sticky booking column */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-canvas/20 lg:sticky lg:top-24">
              <div className="border-b border-canvas/15 p-6">
                <p className="font-mono text-xs uppercase tracking-18 text-canvas/70">{t('from')}</p>
                <p className="font-condensed mt-2 font-heading text-6xl font-extrabold leading-none text-canvas">
                  £{room.rate}
                  <span className="ml-2 font-mono text-sm font-normal text-canvas/70">{t('perNight')}</span>
                </p>
              </div>
              <dl>
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-canvas/15 px-6 py-3">
                    <dt className="font-mono text-xs uppercase tracking-18 text-canvas/70">{k}</dt>
                    <dd className="text-right font-body text-sm text-canvas">{v}</dd>
                  </div>
                ))}
              </dl>
              <BookButton
                roomHint={room.roomType}
                className="flex min-h-14 w-full items-center justify-between bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas"
              />
              <div className="p-6">
                <p className="font-body text-sm text-canvas/80">
                  {t('orCall')}{' '}
                  <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-mono text-canvas underline decoration-accentondark underline-offset-4">
                    {hotelConfig.contact.phone}
                  </a>
                </p>
                <ul className="mt-5 space-y-2">
                  {hotelConfig.trustItems.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex gap-3 font-mono text-xs uppercase tracking-18 text-canvas/80">
                      <span className="text-accentondark">+</span> {pickLocale(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related rooms */}
      <section className="border-t border-canvas/10">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-24">
          <FadeUp className="border-b border-canvas/15 pb-8">
            <SectionLabel>{t('alsoWorthLook')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{t('otherRooms')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug} className="h-full">
                <RoomCard room={r} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Phone booking bar; the booking column does this job on desktop */}
      <MobileBookBar rate={room.rate} roomName={room.roomType} />
    </>
  );
}
