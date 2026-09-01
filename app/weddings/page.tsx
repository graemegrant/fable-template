import Image from 'next/image';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { IMG } from '@/lib/data';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata = pageMetadata({
  title: `Weddings — ${hotelConfig.location.regionLabel}`,
  description: `Weddings at ${hotelConfig.name}: the whole house, the south lawn and four hundred acres, for one wedding at a time.`,
  path: '/weddings',
});

const venues = [
  {
    name: 'The South Lawn',
    capacity: 'Up to 120 guests',
    detail: 'Ceremonies under open sky with the glen as witness. A marquee takes the weather question off the table; the view refuses to be upstaged either way.',
    image: IMG.wedding1,
  },
  {
    name: 'The Dining Room & Hall',
    capacity: 'Up to 60 seated',
    detail: 'Candlelit dinners at long tables, the fire lit, the kitchen cooking the best wedding food either of your families will admit to having eaten.',
    image: IMG.dining2,
  },
  {
    name: 'The Library',
    capacity: 'Up to 20 guests',
    detail: 'For the small and serious: an intimate ceremony by the fire, a dram for the witnesses, and dinner to follow. Elopements handled with enthusiasm.',
    image: IMG.fire,
  },
];

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Weddings · ${hotelConfig.location.regionLabel}`}
        title="One wedding. The whole house."
        subtitle="We host a handful of weddings a year, never more than one at a time, and never two the same."
        image={IMG.wedding1}
        tall
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              Exclusive use, as standard
            </h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              When you marry at Craigmore, the house is yours: all twelve rooms, the lawns, the
              library, the dining room, the staff. Your guests wake up where the party ended. Our
              events team — which is to say, Eleanor and whoever she deems worthy — handles
              everything from celebrant to ceilidh band, with one planning visit each season and
              an opinion available whenever asked.
            </p>
            <p className="mt-5 font-body text-base font-light leading-body text-ink/80">
              Exclusive-use weekends from £18,000 including all accommodation. Licensed for
              ceremonies indoors and out.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-portrait">
              <Image src={IMG.wedding2} alt="A wedding table dressed in the dining room" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp>
            <SectionLabel>The settings</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Three ways to say it</h2>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-10 lg:grid-cols-3">
            {venues.map((v) => (
              <StaggerItem key={v.name}>
                <article>
                  <div className="relative aspect-landscape overflow-hidden bg-parchment">
                    <Image src={v.image} alt={v.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="pt-6">
                    <h3 className="font-heading text-2xl font-medium text-ink">{v.name}</h3>
                    <p className="mt-1 font-body text-2xs uppercase tracking-25 text-gold">{v.capacity}</p>
                    <p className="mt-4 font-body text-sm font-light leading-relaxed text-ink/75">{v.detail}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-forest">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="parchment">Begin</SectionLabel>
            <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-parchment md:text-6xl">
              Come and walk the lawn.<br />Decisions follow naturally.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-parchment/75">
              Wedding viewings run most weekdays and include lunch — we believe in showing you
              the kitchen’s work early. Dates for the coming two years are released each January.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-ctrl bg-gold px-10 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-parchment"
            >
              Enquire about a date
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
