import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import ExperienceCard from '../components/ExperienceCard';
import SectionLabel from '../components/SectionLabel';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { ExperiencesData } from '@/lib/pages/experiences';

/** Experiences page, Urban look. Data comes from lib/pages/experiences.ts. */
export default async function ExperiencesView({ experiences }: { locale: Locale } & ExperiencesData) {
  const t = await getTranslations('experiencesPage');
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} / ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.walk}
      />
      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <FadeUp className="grid gap-8 border-b border-canvas/15 pb-12 lg:grid-cols-12">
          <SectionLabel index="01" className="lg:col-span-3">
            {t('eyebrowLabel')}
          </SectionLabel>
          <p className="font-body text-xl leading-snug text-canvas md:text-2xl lg:col-span-8">{t('intro')}</p>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <StaggerItem key={exp.slug} className="h-full">
              <ExperienceCard experience={exp} headingLevel={2} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <DirectBookingBanner />
    </>
  );
}
