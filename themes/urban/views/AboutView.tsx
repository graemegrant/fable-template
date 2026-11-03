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

/** About page, Urban look. Data comes from lib/pages/about.ts. */
export default async function AboutView({ locale, team }: { locale: Locale } & AboutData) {
  const t = await getTranslations('about');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.exterior} />

      {/* 01 History: headline left, the story in two columns */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
        <FadeUp>
          <SectionLabel index="01">{t('historyLabel')}</SectionLabel>
          <h2 className="font-condensed mt-5 max-w-5xl font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-8xl">
            {t('historyHeading')}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-12 grid gap-8 border-t border-canvas/15 pt-10 font-body text-lg leading-body text-canvas/85 md:grid-cols-3">
          <p>{t('historyP1')}</p>
          <p>{t('historyP2')}</p>
          <p className="text-canvas">{t('historyP3')}</p>
        </FadeUp>
      </section>

      {/* 02 Ethos, on paper */}
      <section className="bg-canvas text-ink">
        <FadeUp className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionLabel index="02" variant="onpaper">
            {t('ethosLabel')}
          </SectionLabel>
          <blockquote className="mt-8 max-w-5xl font-heading text-4xl font-semibold leading-tight md:text-6xl">
            <span aria-hidden className="text-accent">“</span>
            {t('ethosQuote')}
            <span aria-hidden className="text-accent">”</span>
          </blockquote>
          <p className="mt-8 font-mono text-xs uppercase tracking-18 text-ink/70">{t('ethosAttribution')}</p>
        </FadeUp>
      </section>

      <Facilities />
      <ReviewsBand />

      {/* 03 Team */}
      {team.length > 0 && (
        <section className="border-t border-canvas/10">
          <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
            <FadeUp className="border-b border-canvas/15 pb-8">
              <SectionLabel index="03">{t('peopleLabel')}</SectionLabel>
              <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{t('peopleHeading')}</h2>
            </FadeUp>
            <StaggerGrid className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <StaggerItem key={member.name} className="h-full">
                  <TeamCard member={member} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* 04 Sustainability */}
      <section className="border-y border-canvas/10">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-12">
          <div className="relative min-h-480px lg:col-span-6">
            <Image src={IMG.garden} alt={t('gardenAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <FadeUp className="px-5 py-16 lg:col-span-6 lg:px-12 lg:py-24">
            <SectionLabel index="04">{t('sustainabilityLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-6xl">
              {t('sustainabilityHeading')}
            </h2>
            <div className="mt-6 space-y-5 font-body text-base leading-body text-canvas/85">
              <p>{t('sustainabilityP1')}</p>
              <p>{t('sustainabilityP2')}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* In print */}
      {pressMentions.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
          <FadeUp>
            <SectionLabel>{t('inPrintLabel')}</SectionLabel>
          </FadeUp>
          <StaggerGrid className="mt-8 grid border-t border-canvas/15 sm:grid-cols-2 lg:grid-cols-4">
            {pressMentions.map((press, i) => (
              <StaggerItem key={press.outlet} className="h-full">
                <figure className={`flex h-full flex-col justify-between gap-6 border-b border-canvas/15 py-8 sm:pr-6 ${i > 0 ? 'lg:border-l lg:pl-6' : ''}`}>
                  <blockquote className="font-heading text-xl font-semibold leading-snug text-canvas">“{pickLocale(press.quote, locale)}”</blockquote>
                  <figcaption className="font-mono text-xs uppercase tracking-18 text-accentondark">{press.outlet}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}
    </>
  );
}
