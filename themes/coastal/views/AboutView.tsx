import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { pressMentions, IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import TeamCard from '../components/TeamCard';
import Facilities from '../components/Facilities';
import ReviewsBand from '../components/ReviewsBand';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { AboutData } from '@/lib/pages/about';

/** About page, Coastal look. Data comes from lib/pages/about.ts. */
export default async function AboutView({ locale, team }: { locale: Locale } & AboutData) {
  const t = await getTranslations('about');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.exterior} />

      {/* History: a big soft heading, the story beside it */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <SectionLabel>{t('historyLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-semibold leading-heading text-primary md:text-6xl">{t('historyHeading')}</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-5 font-body text-lg leading-body text-ink/80 lg:pt-12">
              <p>{t('historyP1')}</p>
              <p>{t('historyP2')}</p>
              <p>{t('historyP3')}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Ethos on a sea-glass panel */}
      <section className="px-3 sm:px-5">
        <FadeUp className="mx-auto max-w-7xl rounded-card bg-accentondark/35 px-6 py-16 text-center lg:py-24">
          <SectionLabel variant="raised">{t('ethosLabel')}</SectionLabel>
          <span aria-hidden className="mt-4 block font-heading text-8xl leading-none text-accent">“</span>
          <blockquote className="mx-auto max-w-3xl font-heading text-3xl italic leading-snug text-primary md:text-4xl">{t('ethosQuote')}</blockquote>
          <p className="mt-7 font-body text-sm font-medium text-ink/80">{t('ethosAttribution')}</p>
        </FadeUp>
      </section>

      <Facilities />
      <ReviewsBand />

      {/* Team */}
      {team.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp className="text-center">
            <SectionLabel>{t('peopleLabel')}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('peopleHeading')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <TeamCard member={member} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* Sustainability on sand, between two waves */}
      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-10 lg:pb-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeUp>
              <div className="shadow-sand relative aspect-landscape -rotate-2 overflow-hidden rounded-card">
                <Image src={IMG.garden} alt={t('gardenAlt')} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <SectionLabel variant="raised">{t('sustainabilityLabel')}</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('sustainabilityHeading')}</h2>
              <div className="mt-6 space-y-5 font-body text-lg leading-body text-ink/80">
                <p>{t('sustainabilityP1')}</p>
                <p>{t('sustainabilityP2')}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />

      {/* Press */}
      {pressMentions.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp className="text-center">
            <SectionLabel>{t('inPrintLabel')}</SectionLabel>
          </FadeUp>
          <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pressMentions.map((press) => (
              <StaggerItem key={press.outlet} className="h-full">
                <figure className="shadow-sand flex h-full flex-col justify-between rounded-card bg-canvas p-7 text-center">
                  <blockquote className="font-heading text-xl italic leading-snug text-primary">“{pickLocale(press.quote, locale)}”</blockquote>
                  <figcaption className="mt-5 inline-flex self-center rounded-ctrl bg-canvasalt px-3.5 py-1.5 font-body text-sm font-semibold text-accent">
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
