import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import ExperienceCard from '../components/ExperienceCard';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { ExperiencesData } from '@/lib/pages/experiences';

/** Experiences page, Coastal look. Data comes from lib/pages/experiences.ts. */
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
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <FadeUp>
          <p className="mx-auto max-w-3xl text-center font-heading text-2xl leading-snug text-primary md:text-3xl">{t('intro')}</p>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <StaggerItem key={exp.slug}>
              <ExperienceCard experience={exp} headingLevel={2} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <DirectBookingBanner />
    </>
  );
}
