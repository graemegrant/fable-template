import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { directions, attractions, IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { formatCoordinates } from '@/lib/ui/geo';
import DayPage from '../components/day/DayPage';
import GoldenName from '../components/day/GoldenName';
import { HourMark } from '../components/day/DayChapter';
import { SplitHeading } from '@/lib/ui/gsap/patterns';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { LocationData } from '@/lib/pages/location';

/** Location page, Cinematic look. Data comes from lib/pages/location.ts. */
export default async function LocationView({ locale, mapSrc, directionsUrl }: { locale: Locale } & LocationData) {
  const t = await getTranslations('location');
  const d = await getTranslations('day');
  const { lat, lng } = hotelConfig.location;
  return (
    <DayPage light="golden" time="16:30" label={d('golden')}>
      {/* Signature moment: the land seen through the hotel's name, which
          grows until it opens into the whole view (GoldenName). */}
      <GoldenName name={hotelConfig.name} image={IMG.glen} intro={<HourMark time="16:30" label={d('golden')} />}>
        <div className="mx-auto max-w-screen-2xl px-5 pb-4 pt-20 lg:px-16 lg:pt-28">
          <SectionLabel>{`${t('eyebrowLabel')} / ${hotelConfig.location.locality}`}</SectionLabel>
          <SplitHeading as="h1" className="mt-6 max-w-5xl font-heading text-6xl font-normal leading-none tracking-tight text-canvas md:text-8xl">
            {t('title')}
          </SplitHeading>
          <p className="glass-deep mt-8 max-w-2xl rounded-card px-5 py-4 font-body text-lg leading-relaxed text-canvas/90">
            {`${hotelConfig.location.address} ${t('subtitleSuffix')}`}
          </p>
        </div>
      </GoldenName>

      {/* 01 Ways in, as a numbered index */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-16 lg:py-28">
        <FadeUp className="border-b border-canvas/15 pb-8">
          <SectionLabel index="01">{t('gettingHereLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl font-normal leading-none text-canvas md:text-7xl">{t('fourWaysIn')}</h2>
        </FadeUp>
        <StaggerGrid className="grid md:grid-cols-2">
          {directions.map((d, i) => (
            <StaggerItem key={i} className="h-full">
              <article className={`flex h-full gap-6 border-b border-canvas/15 py-8 md:pr-8 ${i % 2 === 1 ? 'md:border-l md:pl-8' : ''}`}>
                <span className="font-heading text-5xl font-medium leading-none text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase text-canvas">{pickLocale(d.mode, locale)}</h3>
                  <p className="mt-2 font-body text-base leading-copy text-canvas/80">{pickLocale(d.detail, locale)}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* 02 The map, framed like a plate */}
      <section className="border-y border-canvas/10">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-16 lg:py-24">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel index="02">{t('mapLabel')}</SectionLabel>
                <h2 className="mt-5 font-heading text-5xl font-normal leading-none text-canvas md:text-7xl">{t('mapHeading')}</h2>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center gap-6 rounded-ctrl bg-accentfill px-7 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas"
              >
                {t('getDirections')} <span aria-hidden>↗</span>
              </a>
            </div>
            <div className="mt-10 aspect-video w-full overflow-hidden rounded-card border border-canvas/15 bg-canvas/5">
              <iframe
                src={mapSrc}
                title={`${t('mapTitlePrefix')} ${hotelConfig.name}`}
                className="size-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 flex flex-wrap justify-between gap-2 font-mono text-xs uppercase tracking-18 text-canvas/70">
              <span>
                {t('postcodePrefix')} <span className="text-canvas">{hotelConfig.location.postalCode}</span> {t('postcodeSuffix')}
              </span>
              <span>{formatCoordinates(lat, lng)}</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 03 Nearby, as a listings column */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-16 lg:py-28">
        <FadeUp className="border-b border-canvas/15 pb-8">
          <SectionLabel index="03">{t('beyondEstateLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl font-normal leading-none text-canvas md:text-7xl">
            {t('worthLeavingFireFor')}
          </h2>
        </FadeUp>
        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a, i) => (
            <StaggerItem key={a.name} className="h-full">
              <article className={`h-full border-b border-canvas/15 py-8 sm:pr-6 ${i % 3 !== 0 ? 'lg:border-l lg:pl-6' : ''}`}>
                <p className="font-mono text-xs uppercase tracking-18 text-accentondark">{a.distance}</p>
                <h3 className="mt-3 font-heading text-xl font-bold uppercase leading-tight text-canvas">{a.name}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-canvas/80">{pickLocale(a.description, locale)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </DayPage>
  );
}
