import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { WeddingsData } from '@/lib/pages/weddings';

/** Weddings page, Coastal look. Data comes from lib/pages/weddings.ts. */
export default async function WeddingsView({ locale, venues }: { locale: Locale } & WeddingsData) {
  const t = await getTranslations('weddings');
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} · ${pickLocale(hotelConfig.location.regionLabel, locale)}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.wedding1}
        tall
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <SectionLabel>{t('howItWorksLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('exclusiveUseHeading')}</h2>
            <p className="mt-6 font-body text-lg leading-body text-ink/80">{t('exclusiveUseP1')}</p>
            <p className="mt-5 font-body text-lg leading-body text-ink/80">{t('exclusiveUseP2')}</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="shadow-sand relative aspect-portrait rotate-2 overflow-hidden rounded-card">
              <Image src={IMG.wedding2} alt={t('weddingTableAlt')} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-10 lg:pb-16">
          <FadeUp>
            <SectionLabel variant="raised">{t('settingsLabel')}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('settingsHeading')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-6 lg:grid-cols-3">
            {venues.map((v) => (
              <StaggerItem key={v.name} className="h-full">
                <article className="shadow-sand group flex h-full flex-col rounded-card bg-canvas p-3">
                  <div className="relative aspect-landscape overflow-hidden rounded-img">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
                    />
                    <span className="absolute left-3 top-3 rounded-ctrl bg-canvas/95 px-3.5 py-1.5 font-body text-xs font-semibold text-primary">
                      {v.capacity}
                    </span>
                  </div>
                  <div className="flex grow flex-col px-3 pb-3 pt-5">
                    <h3 className="font-heading text-2xl font-semibold text-primary">{v.name}</h3>
                    <p className="mt-3 grow font-body text-sm leading-relaxed text-ink/80">{v.detail}</p>
                    {/* Secondary style: the page's primary CTA is the panel below (AGENTS.md §5). */}
                    <Link
                      href="/contact?subject=events#enquiry"
                      className="mt-6 flex min-h-12 items-center justify-center rounded-ctrl border border-primary/30 px-5 font-body text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-canvas"
                    >
                      {t('enquireVenue')}
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />

      <section className="px-3 py-10 sm:px-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-card bg-primarydeep">
          <div className="relative px-6 pb-24 pt-20 text-center lg:pb-28 lg:pt-24">
            <FadeUp>
              <SectionLabel variant="ondark">{t('beginLabel')}</SectionLabel>
              <h2 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-semibold leading-heading text-canvas md:text-6xl">
                {t('beginHeadingLine1')}
                <br />
                <span className="italic text-accentondark">{t('beginHeadingLine2')}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-canvas/85">{t('beginBody')}</p>
              <Link
                href="/contact?subject=events#enquiry"
                className="mt-9 inline-flex min-h-12 items-center rounded-ctrl bg-accentfill px-9 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t('enquireDate')}
              </Link>
            </FadeUp>
          </div>
          <div aria-hidden className="wave absolute inset-x-0 bottom-0 text-accentondark/25" />
        </div>
      </section>
    </>
  );
}
