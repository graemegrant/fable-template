import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import ExperienceCard from '../components/ExperienceCard';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import { Link } from '@/i18n/navigation';
import type { ExperienceDetailData } from '@/lib/pages/experienceDetail';

/** ExperienceDetail page, Urban look. Data comes from lib/pages/experienceDetail.ts. */
export default async function ExperienceDetailView({ exp, related }: { locale: Locale } & ExperienceDetailData) {
  const t = await getTranslations('experienceDetail');
  const facts = [
    [t('duration'), exp.duration],
    [t('category'), exp.category],
    ...(exp.seasons && exp.seasons.length > 0 ? [[t('season'), exp.seasons.join(', ')]] : []),
  ];
  return (
    <>
      <PageHero
        eyebrow={`${exp.category} / ${hotelConfig.location.locality}`}
        title={exp.name}
        subtitle={`${exp.duration} / ${exp.price}`}
        image={exp.heroImage}
        imageAlt={exp.imageAlt}
      />

      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionLabel index="01">{t('theExperience')}</SectionLabel>
              <p className="mt-6 font-body text-xl leading-body text-canvas/90">{exp.description}</p>
            </FadeUp>

            {exp.includes && exp.includes.length > 0 && (
              <FadeUp className="mt-16">
                <SectionLabel index="02">{t('whatsIncluded')}</SectionLabel>
                <ol className="mt-6 border-t border-canvas/15">
                  {exp.includes.map((inc, i) => (
                    <li key={inc} className="flex gap-4 border-b border-canvas/15 py-4 font-body text-base text-canvas/90">
                      <span className="font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                      {inc}
                    </li>
                  ))}
                </ol>
              </FadeUp>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-canvas/20 lg:sticky lg:top-24">
              <div className="border-b border-canvas/15 p-6">
                <p className="font-mono text-xs uppercase tracking-18 text-canvas/70">{t('pricing')}</p>
                <p className="font-condensed mt-2 font-heading text-4xl font-extrabold uppercase leading-none text-canvas">{exp.price}</p>
              </div>
              <dl>
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-canvas/15 px-6 py-3">
                    <dt className="font-mono text-xs uppercase tracking-18 text-canvas/70">{k}</dt>
                    <dd className="text-right font-body text-sm text-canvas">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact"
                className="flex min-h-14 w-full items-center justify-between bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas"
              >
                {t('arrangeThis')} <span aria-hidden>→</span>
              </Link>
              <p className="p-6 font-body text-sm text-canvas/80">{t('askAtDesk')}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-grid border-t border-canvas/10">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-24">
          <FadeUp className="border-b border-canvas/15 pb-8">
            <SectionLabel>{t('whileYoureHere')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{t('moreFromEstate')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <StaggerItem key={e.slug} className="h-full">
                <ExperienceCard experience={e} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
