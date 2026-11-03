import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import ExperienceCard from '../components/ExperienceCard';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import { Link } from '@/i18n/navigation';
import type { ExperienceDetailData } from '@/lib/pages/experienceDetail';

/** ExperienceDetail page, Heritage look. Data comes from lib/pages/experienceDetail.ts. */
export default async function ExperienceDetailView({ exp, related }: { locale: Locale } & ExperienceDetailData) {
  const t = await getTranslations('experienceDetail');
  return (
    <>
      <PageHero eyebrow={`${exp.category} · ${hotelConfig.location.locality}`} title={exp.name} subtitle={`${exp.duration} · ${exp.price}`} image={exp.heroImage} imageAlt={exp.imageAlt} />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-360">
          <div>
            <FadeUp>
              <SectionLabel>{t('theExperience')}</SectionLabel>
              <p className="mt-6 font-body text-lg font-light leading-body text-ink/85">{exp.description}</p>
            </FadeUp>

            {exp.includes && exp.includes.length > 0 && (
              <FadeUp className="mt-16">
                <SectionLabel>{t('whatsIncluded')}</SectionLabel>
                <ul className="mt-6 space-y-3">
                  {exp.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 font-body text-sm text-ink/80">
                      <span className="mt-9px h-px w-5 shrink-0 bg-accent" aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </div>

          <aside>
            <div className="rounded-card border border-ink/10 bg-canvasalt p-8 lg:sticky lg:top-28">
              <p className="font-body text-2xs uppercase tracking-25 text-ink/70">{t('pricing')}</p>
              <p className="mt-3 font-heading text-3xl font-medium text-primary">{exp.price}</p>
              <dl className="mt-8 space-y-3 border-t border-ink/10 pt-7">
                <div className="flex justify-between gap-6">
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('duration')}</dt>
                  <dd className="font-body text-sm text-ink/85">{exp.duration}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('category')}</dt>
                  <dd className="font-body text-sm text-ink/85">{exp.category}</dd>
                </div>
                {exp.seasons && exp.seasons.length > 0 && (
                  <div className="flex justify-between gap-6">
                    <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('season')}</dt>
                    <dd className="text-right font-body text-sm text-ink/85">{exp.seasons.join(', ')}</dd>
                  </div>
                )}
              </dl>
              <Link
                href="/contact"
                className="mt-8 block w-full rounded-ctrl bg-primary px-8 py-4 text-center font-body text-2xs uppercase tracking-25 text-canvas transition-colors duration-300 hover:bg-accentfill hover:text-onaccent"
              >
                {t('arrangeThis')}
              </Link>
              <p className="mt-5 text-center font-body text-xs text-ink/70">
                {t('askAtDesk')}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp>
            <SectionLabel>{t('whileYoureHere')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink">{t('moreFromEstate')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <StaggerItem key={e.slug}><ExperienceCard experience={e} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
