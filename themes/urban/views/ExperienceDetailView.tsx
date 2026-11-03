import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import ExperienceCard from '../components/ExperienceCard';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import { Link } from '@/i18n/navigation';
import type { ExperienceDetailData } from '@/lib/pages/experienceDetail';

/** ExperienceDetail page, Coastal look. Data comes from lib/pages/experienceDetail.ts. */
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
        eyebrow={`${exp.category} · ${hotelConfig.location.locality}`}
        title={exp.name}
        subtitle={`${exp.duration} · ${exp.price}`}
        image={exp.heroImage}
        imageAlt={exp.imageAlt}
      />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-1fr-360">
          <div>
            <FadeUp>
              <SectionLabel>{t('theExperience')}</SectionLabel>
              <p className="mt-5 font-body text-lg leading-body text-ink/85">{exp.description}</p>
            </FadeUp>

            {exp.includes && exp.includes.length > 0 && (
              <FadeUp className="mt-12 rounded-card bg-accentondark/35 p-7 sm:p-9">
                <SectionLabel>{t('whatsIncluded')}</SectionLabel>
                <ul className="mt-5 space-y-3">
                  {exp.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 font-body text-base text-ink/85">
                      <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-canvas text-xs text-accent">✓</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </div>

          <aside>
            <div className="shadow-sand rounded-card bg-primarydeep p-7 text-canvas lg:sticky lg:top-28">
              <p className="font-body text-sm text-canvas/80">{t('pricing')}</p>
              <p className="mt-1 font-heading text-3xl font-semibold">{exp.price}</p>
              <dl className="mt-6 space-y-2">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 rounded-img bg-canvas/10 px-4 py-3">
                    <dt className="font-body text-sm text-accentondark">{k}</dt>
                    <dd className="text-right font-body text-sm text-canvas">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact"
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded-ctrl bg-accentfill px-8 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t('arrangeThis')}
              </Link>
              <p className="mt-4 text-center font-body text-sm text-canvas/80">{t('askAtDesk')}</p>
            </div>
          </aside>
        </div>
      </section>

      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-20">
          <FadeUp>
            <SectionLabel>{t('whileYoureHere')}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('moreFromEstate')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <StaggerItem key={e.slug}>
                <ExperienceCard experience={e} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />
    </>
  );
}
