import Image from 'next/image';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { TEAM_QUERY } from '@/lib/queries';
import { team as fallbackTeam, pressMentions, IMG } from '@/lib/data';
import type { TeamMember } from '@/lib/types';
import PageHero from '@/components/PageHero';
import TeamCard from '@/components/TeamCard';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata = pageMetadata({
  title: 'Our Story',
  description: `The history, people and quiet convictions of ${hotelConfig.name} — a Victorian shooting lodge remade as Highland Perthshire’s most particular small hotel.`,
  path: '/about',
});

export default async function AboutPage() {
  const team = await sanityFetch<TeamMember[]>(TEAM_QUERY, {}, fallbackTeam);

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A house with opinions"
        subtitle="Built 1847. Rebuilt around comfort, cooking and quiet ever since."
        image={IMG.exterior}
      />

      {/* History */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>The history</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              1847 to now, lightly edited
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-5 font-body text-base font-light leading-body text-ink/80">
              <p>
                Craigmore was built as a shooting lodge by a Dundee jute baron with more money
                than restraint, which explains the turret. For a century it hosted shooting
                parties, jealous cousins and at least one scandal the village still references.
              </p>
              <p>
                The present custodians bought the house in 2019 and spent three years doing the
                unglamorous things first — roof, pipes, kitchen — before opening twelve rooms in
                2022. The brief, pinned to the office wall, has not changed: a house that feels
                inherited rather than designed, food that needs no adjectives, and staff who
                remember your name before you have repeated it.
              </p>
              <p>
                The turret, for the record, is now the smallest reading room in Scotland. The
                scandal remains unconfirmed.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Ethos */}
      <section className="bg-forest">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="parchment">The ethos</SectionLabel>
            <blockquote className="mt-8 font-heading text-3xl font-medium italic leading-snug text-parchment md:text-4xl">
              “Luxury is not gold taps. Luxury is silence, a fire someone else lit, and dinner
              that knows where it came from.”
            </blockquote>
            <p className="mt-8 font-body text-2xs uppercase tracking-25 text-parchment/60">
              The brief, 2019 — still on the office wall
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp>
          <SectionLabel>The people</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Who keeps the house</h2>
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
              <div className="relative aspect-landscape">
                <Image src={IMG.garden} alt="The walled garden" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <SectionLabel>Sustainability</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
                Quietly, but seriously
              </h2>
              <div className="mt-6 space-y-5 font-body text-base font-light leading-body text-ink/80">
                <p>
                  We heat the house with a biomass boiler fed by our own woodland, draw water
                  from our own spring, and grow a meaningful share of the kitchen’s vegetables
                  inside the 1847 wall. What we cannot grow, we buy within forty miles where the
                  quality allows — and it usually does.
                </p>
                <p>
                  No single-use plastics in the rooms, two EV chargers in the courtyard, and a
                  rewilding plan for the upper glen that the grouse have opinions about. We
                  publish the numbers annually rather than the slogans.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp>
          <SectionLabel className="text-center">In print</SectionLabel>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {pressMentions.map((press) => (
            <StaggerItem key={press.outlet}>
              <figure className="border-t border-gold/50 pt-6 text-center">
                <blockquote className="font-heading text-xl font-medium italic leading-snug text-ink">
                  “{press.quote}”
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
