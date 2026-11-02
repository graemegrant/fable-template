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

/** RoomDetail page, Coastal look. Data comes from lib/pages/roomDetail.ts.
 *  The booking card is deep sea so it stands apart from the sand page. */
export default async function RoomDetailView({ locale, room, related }: { locale: Locale } & RoomDetailData) {
  const t = await getTranslations('roomDetail');
  const stayLines = [
    ...hotelConfig.stayIncludes.map((item) => pickLocale(item, locale) ?? ''),
    t('timesLine', {
      checkIn: pickLocale(hotelConfig.checkIn, locale) ?? '',
      checkOut: pickLocale(hotelConfig.checkOut, locale) ?? '',
    }),
  ];
  return (
    <>
      {/* roomType is the title, so the eyebrow doesn't repeat it; the subtitle
          adds the room's own name (rare) and its view. */}
      <PageHero
        eyebrow={`${t('stayLabel')} · ${hotelConfig.location.locality}`}
        title={room.roomType}
        subtitle={[room.name, room.view].filter(Boolean).join(' · ')}
        image={room.heroImage}
        imageAlt={room.imageAlt}
      />

      <section className="mx-auto max-w-7xl px-6 pb-32 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-1fr-360">
          <div>
            <FadeUp>
              <SectionLabel>{t('theRoom')}</SectionLabel>
              {room.hook && <p className="mt-5 font-heading text-3xl font-semibold leading-snug text-primary md:text-4xl">{room.hook}</p>}
              <p className="mt-5 font-body text-lg leading-body text-ink/85">{room.description}</p>
            </FadeUp>

            <FadeUp className="mt-14">
              <SectionLabel>{t('inTheRoom')}</SectionLabel>
              <ul className="mt-5 flex flex-wrap gap-2">
                {room.amenities.map((a) => (
                  <li key={a} className="rounded-ctrl bg-canvasalt px-4 py-2 font-body text-sm text-ink/85">{a}</li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp className="mt-14 rounded-card bg-accentondark/35 p-7 sm:p-9">
              <SectionLabel variant="raised">{t('everyStay')}</SectionLabel>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {stayLines.map((line) => (
                  <li key={line} className="flex items-start gap-3 font-body text-sm text-ink/85">
                    <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-canvas text-xs text-accent">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
              <Link href="/policies" className="mt-5 inline-flex min-h-11 items-center font-body text-sm font-semibold text-accent transition-colors hover:text-primary">
                {t('goodToKnowLink')} →
              </Link>
            </FadeUp>

            {room.gallery && room.gallery.length > 0 && (
              <FadeUp className="mt-14">
                <SectionLabel>{t('gallery')}</SectionLabel>
                <div className="mt-5">
                  <GalleryLightbox images={room.gallery} alt={room.roomType} />
                </div>
              </FadeUp>
            )}
          </div>

          {/* Sticky booking card */}
          <aside>
            <div className="shadow-sand rounded-card bg-primarydeep p-7 text-canvas lg:sticky lg:top-28">
              <p className="font-body text-sm text-canvas/80">{t('from')}</p>
              <p className="mt-1 font-heading text-5xl font-semibold">
                £{room.rate}
                <span className="font-body text-base font-normal text-canvas/80"> {t('perNight')}</span>
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-2">
                {[
                  [t('size'), room.sqm ? `${room.sqm} ${t('sqmUnit')}` : ''],
                  [t('sleeps'), `${room.occupancy}`],
                  [t('floor'), room.floor],
                  [t('outlook'), room.view],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="rounded-img bg-canvas/10 px-4 py-3">
                      <dt className="font-body text-xs text-accentondark">{k}</dt>
                      <dd className="mt-0.5 font-body text-sm text-canvas">{v}</dd>
                    </div>
                  ))}
              </dl>
              <BookButton
                roomHint={room.roomType}
                className="mt-6 min-h-12 w-full rounded-ctrl bg-accentfill px-8 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
              />
              <p className="mt-4 text-center font-body text-sm text-canvas/80">
                {t('orCall')}{' '}
                <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-semibold text-canvas underline decoration-accentondark underline-offset-4">
                  {hotelConfig.contact.phone}
                </a>
              </p>
              <ul className="mt-6 space-y-2 border-t border-canvas/15 pt-5">
                {hotelConfig.trustItems.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 font-body text-sm text-canvas/85">
                    <span aria-hidden className="text-xs text-accentondark">✓</span> {pickLocale(item, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Related rooms */}
      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-20">
          <FadeUp>
            <SectionLabel variant="raised">{t('alsoWorthLook')}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('otherRooms')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug} className="h-full">
                <RoomCard room={r} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />

      {/* Phone booking bar; the sidebar card does this job on desktop */}
      <MobileBookBar rate={room.rate} roomName={room.roomType} />
    </>
  );
}
