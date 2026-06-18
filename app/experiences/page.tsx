import type { Metadata } from 'next';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { EXPERIENCES_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences, IMG } from '@/lib/data';
import type { Experience } from '@/lib/types';
import PageHero from '@/components/PageHero';
import ExperienceCard from '@/components/ExperienceCard';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Experiences',
  description: `Whisky, water, hill and hawk — the estate experiences at ${hotelConfig.name}, all arranged by the house, all starting at the front door.`,
};

export default async function ExperiencesPage() {
  const experiences = await sanityFetch<Experience[]>(EXPERIENCES_QUERY, {}, fallbackExperiences);

  return (
    <>
      <PageHero
        eyebrow="The estate"
        title="Days, properly spent"
        subtitle="Everything below starts at the front door and is arranged by the house. Bring boots; we have the rest."
        image={IMG.walk}
      />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-[1.9] text-ink/80">
            Four hundred acres earn their keep. The river holds salmon, the hill holds deer, the
            cellar holds the estate blend, and the team holds firm opinions on the correct order
            in which to enjoy them. Book ahead or decide at breakfast — both work.
          </p>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <StaggerItem key={exp.slug}><ExperienceCard experience={exp} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <DirectBookingBanner />
    </>
  );
}
