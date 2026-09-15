import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { TEAM_QUERY } from '@/lib/queries';
import { team as fallbackTeam, pressMentions, IMG } from '@/lib/data';
import type { TeamMemberI18n } from '@/lib/types';
import { pickLocale, resolveTeamMember } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import TeamCard from '@/components/TeamCard';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Our Story',
    description: `The history, people and quiet convictions of ${hotelConfig.name} — a Victorian shooting lodge remade as Highland Perthshire’s most particular small hotel.`,
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawTeam = await sanityFetch<TeamMemberI18n[]>(TEAM_QUERY, {}, fallbackTeam);
  const team = rawTeam.map((m) => resolveTeamMember(m, locale));
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
      <section className="bg-forest">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="parchment">{t('ethosLabel')}</SectionLabel>
            <blockquote className="mt-8 font-heading text-3xl font-medium italic leading-snug text-parchment md:text-4xl">
              “{t('ethosQuote')}”
            </blockquote>
            <p className="mt-8 font-body text-2xs uppercase tracking-25 text-parchment/60">
              {t('ethosAttribution')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Team */}
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

      {/* Sustainability */}
      <section className="bg-warmgrey">
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
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp>
          <SectionLabel className="text-center">{t('inPrintLabel')}</SectionLabel>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {pressMentions.map((press) => (
            <StaggerItem key={press.outlet}>
              <figure className="border-t border-gold/50 pt-6 text-center">
                <blockquote className="font-heading text-xl font-medium italic leading-snug text-ink">
                  “{pickLocale(press.quote, locale)}”
                </blockquote>
                <figcaption className="mt-4 font-body text-2xs uppercase tracking-25 text-ink/50">
                  {press.outlet}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
