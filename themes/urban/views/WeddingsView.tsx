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

const blockButton =
  'inline-flex min-h-14 items-center justify-between gap-6 px-6 font-mono text-sm uppercase tracking-18 transition-colors';

/** Weddings page, Urban look. Data comes from lib/pages/weddings.ts. */
export default async function WeddingsView({ locale, venues }: { locale: Locale } & WeddingsData) {
  const t = await getTranslations('weddings');
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} / ${pickLocale(hotelConfig.location.regionLabel, locale)}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.wedding1}
        tall
      />

      {/* 01 How it works */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-6">
            <SectionLabel index="01">{t('howItWorksLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">
              {t('exclusiveUseHeading')}
            </h2>
            <p className="mt-8 font-body text-lg leading-body text-canvas/85">{t('exclusiveUseP1')}</p>
            <p className="mt-6 border-l-2 border-accentondark pl-5 font-body text-lg leading-body text-canvas">{t('exclusiveUseP2')}</p>
          </FadeUp>
          <FadeUp delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <figure>
              <div className="relative aspect-portrait overflow-hidden bg-canvas/5">
                <Image src={IMG.wedding2} alt={t('weddingTableAlt')} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-18 text-canvas/70">Fig. 01 / {t('weddingTableAlt')}</figcaption>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* 02 The settings */}
      <section className="bg-grid border-y border-canvas/10">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
          <FadeUp className="border-b border-canvas/15 pb-8">
            <SectionLabel index="02">{t('settingsLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{t('settingsHeading')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-x-6 gap-y-14 lg:grid-cols-3">
            {venues.map((v, i) => (
              <StaggerItem key={v.name} className="h-full">
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-landscape overflow-hidden bg-canvas/5">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
                    />
                    <span className="absolute left-0 top-0 bg-primary px-3 py-2 font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-condensed mt-5 font-heading text-3xl font-extrabold uppercase leading-none text-canvas">{v.name}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-18 text-accentondark">{v.capacity}</p>
                  <p className="mt-4 grow font-body text-sm leading-relaxed text-canvas/80">{v.detail}</p>
                  {/* Secondary style: the page's primary CTA is the section below (AGENTS.md §5). */}
                  <Link
                    href="/contact?subject=events#enquiry"
                    className={`mt-6 border border-canvas/40 text-canvas hover:bg-canvas hover:text-ink ${blockButton}`}
                  >
                    {t('enquireVenue')} <span aria-hidden>→</span>
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Begin: the headline set huge, the second line in outline */}
      <section className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-8 lg:py-32">
        <FadeUp>
          <SectionLabel>{t('beginLabel')}</SectionLabel>
          <h2 className="font-condensed mt-6 font-heading text-6xl font-extrabold uppercase leading-none text-canvas md:text-8xl">
            {t('beginHeadingLine1')}
            <br />
            <span className="text-outline text-accentondark">{t('beginHeadingLine2')}</span>
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="font-body text-lg leading-body text-canvas/85 lg:col-span-6">{t('beginBody')}</p>
            <div className="lg:col-span-5 lg:col-start-8">
              <Link href="/contact?subject=events#enquiry" className={`bg-accentfill text-onaccent hover:bg-canvas ${blockButton}`}>
                {t('enquireDate')} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
