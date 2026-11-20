import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import DayPage from '../components/day/DayPage';
import ExperienceCard from '../components/ExperienceCard';
import SectionLabel from '../components/SectionLabel';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { ExperiencesData } from '@/lib/pages/experiences';

/** Experiences page, Cinematic look. Data comes from lib/pages/experiences.ts. */
export default async function ExperiencesView({ experiences }: { locale: Locale } & ExperiencesData) {
  const t = await getTranslations('experiencesPage');
  const d = await getTranslations('day');
  return (
    <DayPage light="golden" time="13:00" label={d('afternoon')}>
      <PageHero light="day" hour={{ time: '13:00', label: d('afternoon') }}
        eyebrow={`${t('eyebrowLabel')} / ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.walk}
      />
      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-16 lg:py-24">
        <FadeUp className="grid gap-8 border-b border-canvas/15 pb-12 lg:grid-cols-12">
          <SectionLabel index="01" className="lg:col-span-3">
            {t('eyebrowLabel')}
          </SectionLabel>
          <p className="font-body text-xl leading-snug text-canvas md:text-2xl lg:col-span-8">{t('intro')}</p>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {/* The afternoon's staggered frames: the middle column sits lower. */}
          {experiences.map((exp, i) => (
            <StaggerItem key={exp.slug} className={`h-full ${i % 3 === 1 ? 'lg:mt-24' : ''}`}>
              <ExperienceCard experience={exp} headingLevel={2} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <DirectBookingBanner />
    </DayPage>
  );
}
