import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '@look/components/PageHero';
import ExperienceCard from '@look/components/ExperienceCard';
import DirectBookingBanner from '@look/components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '@look/components/Motion';
import type { ExperiencesData } from '@/lib/pages/experiences';

/** Experiences page, Heritage look. Data comes from lib/pages/experiences.ts. */
export default async function ExperiencesView({ experiences }: { locale: Locale } & ExperiencesData) {
  const t = await getTranslations('experiencesPage');
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} · ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.walk}
      />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-body text-ink/80">
            {t('intro')}
          </p>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <StaggerItem key={exp.slug}><ExperienceCard experience={exp} headingLevel={2} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <DirectBookingBanner />
    </>
  );
}
