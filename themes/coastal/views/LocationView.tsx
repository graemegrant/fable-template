import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { directions, attractions, IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { LocationData } from '@/lib/pages/location';

/** Location page, Coastal look. Data comes from lib/pages/location.ts. */
export default async function LocationView({ locale, mapSrc, directionsUrl }: { locale: Locale } & LocationData) {
  const t = await getTranslations('location');
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} · ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={`${hotelConfig.location.address} ${t('subtitleSuffix')}`}
        image={IMG.glen}
      />

      {/* Ways in, as numbered cards */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <SectionLabel>{t('gettingHereLabel')}</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('fourWaysIn')}</h2>
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2">
          {directions.map((d, i) => (
            <StaggerItem key={i} className="h-full">
              <article className="shadow-sand flex h-full gap-5 rounded-card bg-canvas p-7">
                <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accentfill font-heading text-xl font-semibold text-onaccent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-primary">{pickLocale(d.mode, locale)}</h3>
                  <p className="mt-2 font-body text-base leading-copy text-ink/80">{pickLocale(d.detail, locale)}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Map in a rounded frame on sand */}
      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-10 lg:pb-16">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel variant="raised">{t('mapLabel')}</SectionLabel>
                <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('mapHeading')}</h2>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-ctrl bg-primary px-7 py-3 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t('getDirections')}
              </a>
            </div>
            <div className="shadow-sand mt-8 aspect-video w-full overflow-hidden rounded-card bg-canvas p-2">
              <iframe
                src={mapSrc}
                title={`${t('mapTitlePrefix')} ${hotelConfig.name}`}
                className="size-full rounded-img"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 px-2 font-body text-sm text-ink/80">
              {t('postcodePrefix')} <span className="rounded-ctrl bg-canvas px-2 py-0.5 font-semibold text-primary">{hotelConfig.location.postalCode}</span>{' '}
              {t('postcodeSuffix')}
            </p>
          </FadeUp>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />

      {/* Nearby, as tiles with a distance chip */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <SectionLabel>{t('beyondEstateLabel')}</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('worthLeavingFireFor')}</h2>
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a) => (
            <StaggerItem key={a.name} className="h-full">
              <article className="h-full rounded-card bg-canvasalt p-6 sm:p-7">
                <span className="inline-flex rounded-ctrl bg-canvas px-3 py-1 font-body text-sm font-semibold text-accent">{a.distance}</span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-primary">{a.name}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">{pickLocale(a.description, locale)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
