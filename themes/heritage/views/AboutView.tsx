import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { pressMentions, IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '@look/components/PageHero';
import TeamCard from '@look/components/TeamCard';
import Facilities from '@look/components/Facilities';
import ReviewsBand from '@look/components/ReviewsBand';
import SectionLabel from '@look/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@look/components/Motion';
import type { AboutData } from '@/lib/pages/about';

/** About page, Heritage look. Data comes from lib/pages/about.ts. */
export default async function AboutView({ locale, team }: { locale: Locale } & AboutData) {
  const t = await getTranslations('about');
  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.exterior}
      />

      {/* History */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>{t('historyLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              {t('historyHeading')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-5 font-body text-base font-light leading-body text-ink/80">
              <p>{t('historyP1')}</p>
              <p>{t('historyP2')}</p>
              <p>{t('historyP3')}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Ethos */}
      <section className="bg-primary">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="ondark">{t('ethosLabel')}</SectionLabel>
            <blockquote className="mt-8 font-heading text-3xl font-medium italic leading-snug text-canvas md:text-4xl">
              “{t('ethosQuote')}”
            </blockquote>
            <p className="mt-8 font-body text-2xs uppercase tracking-25 text-canvas/60">
              {t('ethosAttribution')}
            </p>
          </FadeUp>
        </div>
      </section>

      <Facilities />
      <ReviewsBand />

      {/* Team */}
      {team.length > 0 && (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp>
          <SectionLabel>{t('peopleLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('peopleHeading')}</h2>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <StaggerItem key={member.name}><TeamCard member={member} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      )}

      {/* Sustainability */}
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <FadeUp>
              <div className="relative aspect-landscape overflow-hidden rounded-img">
                <Image src={IMG.garden} alt={t('gardenAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <SectionLabel>{t('sustainabilityLabel')}</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
                {t('sustainabilityHeading')}
              </h2>
              <div className="mt-6 space-y-5 font-body text-base font-light leading-body text-ink/80">
                <p>{t('sustainabilityP1')}</p>
                <p>{t('sustainabilityP2')}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Press */}
      {pressMentions.length > 0 && (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp>
          <SectionLabel className="text-center">{t('inPrintLabel')}</SectionLabel>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {pressMentions.map((press) => (
            <StaggerItem key={press.outlet}>
              <figure className="border-t border-accent/50 pt-6 text-center">
                <blockquote className="font-heading text-xl font-medium italic leading-snug text-ink">
                  “{pickLocale(press.quote, locale)}”
                </blockquote>
                <figcaption className="mt-4 font-body text-2xs uppercase tracking-25 text-ink/70">
                  {press.outlet}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      )}
    </>
  );
}
