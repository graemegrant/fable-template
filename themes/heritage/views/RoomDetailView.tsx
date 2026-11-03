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

/** RoomDetail page, Heritage look. Data comes from lib/pages/roomDetail.ts. */
export default async function RoomDetailView({ locale, room, related }: { locale: Locale } & RoomDetailData) {
  const t = await getTranslations('roomDetail');
  return (
    <>
      {/* No "type" interpolation in the eyebrow any more — roomType is now
          the page title itself (below), so repeating it in the eyebrow
          would just say the same thing twice. subtitle combines name (only
          for the rare case a physical room also has one distinct from its
          roomType) and view — for Craigmore (name unset) this renders
          identically to before the schema change. */}
      <PageHero
        eyebrow={`${t('stayLabel')} · ${hotelConfig.location.locality}`}
        title={room.roomType}
        subtitle={[room.name, room.view].filter(Boolean).join(' · ')}
        image={room.heroImage}
        imageAlt={room.imageAlt}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 pb-32 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-360">
          <div>
            <FadeUp>
              <SectionLabel>{t('theRoom')}</SectionLabel>
              {room.hook && <p className="mt-6 font-heading text-3xl font-medium leading-snug text-primary">{room.hook}</p>}
              <p className="mt-6 font-body text-lg font-light leading-body text-ink/85">{room.description}</p>
            </FadeUp>

            <FadeUp className="mt-16">
              <SectionLabel>{t('inTheRoom')}</SectionLabel>
              <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex gap-3 font-body text-sm text-ink/80">
                    <span className="mt-9px h-px w-5 shrink-0 bg-accent" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp className="mt-16">
              <SectionLabel>{t('everyStay')}</SectionLabel>
              <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {[
                  ...hotelConfig.stayIncludes.map((item) => pickLocale(item, locale) ?? ''),
                  t('timesLine', {
                    checkIn: pickLocale(hotelConfig.checkIn, locale) ?? '',
                    checkOut: pickLocale(hotelConfig.checkOut, locale) ?? '',
                  }),
                ].map((line) => (
                  <li key={line} className="flex gap-3 font-body text-sm text-ink/80">
                    <span className="mt-9px h-px w-5 shrink-0 bg-accent" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <Link href="/policies" className="mt-4 inline-flex min-h-11 items-center font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
                {t('goodToKnowLink')} →
              </Link>
            </FadeUp>

            {room.gallery && room.gallery.length > 0 && (
              <FadeUp className="mt-16">
                <SectionLabel>{t('gallery')}</SectionLabel>
                <div className="mt-6">
                  <GalleryLightbox images={room.gallery} alt={room.roomType} />
                </div>
              </FadeUp>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <aside>
            <div className="rounded-card border border-ink/10 bg-canvasalt p-8 lg:sticky lg:top-28">
              <p className="font-body text-2xs uppercase tracking-25 text-ink/70">{t('from')}</p>
              <p className="mt-2 font-heading text-5xl font-medium text-primary">
                £{room.rate}
                <span className="font-body text-sm font-light text-ink/70"> {t('perNight')}</span>
              </p>
              <dl className="mt-8 space-y-3 border-t border-ink/10 pt-7">
                {[
                  [t('size'), room.sqm ? `${room.sqm} ${t('sqmUnit')}` : ''],
                  [t('sleeps'), `${room.occupancy}`],
                  [t('floor'), room.floor],
                  [t('outlook'), room.view],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{k}</dt>
                    <dd className="text-right font-body text-sm text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <BookButton roomHint={room.roomType} className="mt-8 w-full rounded-ctrl bg-primary px-8 py-4 font-body text-2xs uppercase tracking-25 text-canvas transition-colors duration-300 hover:bg-accentfill hover:text-onaccent" />
              <p className="mt-5 text-center font-body text-xs text-ink/70">
                {t('orCall')}{' '}
                <a href={`tel:${hotelConfig.contact.phoneHref}`} className="text-primary underline decoration-accent underline-offset-4">
                  {hotelConfig.contact.phone}
                </a>
              </p>
              <ul className="mt-6 space-y-2 border-t border-ink/10 pt-6">
                {hotelConfig.trustItems.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-xs text-ink/70">
                    <span className="h-px w-4 bg-accent" aria-hidden /> {pickLocale(item, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Related rooms */}
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp>
            <SectionLabel>{t('alsoWorthLook')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink">{t('otherRooms')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}><RoomCard room={r} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Mobile sticky booking bar — hidden on desktop where sidebar handles this */}
      <MobileBookBar rate={room.rate} roomName={room.roomType} />
    </>
  );
}
