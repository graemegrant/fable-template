import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch, imgSrc } from '@/lib/sanity';
import {
  FEATURED_ROOMS_QUERY, EXPERIENCES_QUERY, OFFERS_QUERY, TESTIMONIALS_QUERY, JOURNAL_QUERY,
} from '@/lib/queries';
import * as fallback from '@/lib/data';
import { IMG } from '@/lib/data';
import type { Room, Experience, Offer, Testimonial, JournalPost } from '@/lib/types';
import KenBurnsHero from '@/components/KenBurnsHero';
import TrustStrip from '@/components/TrustStrip';
import SectionLabel from '@/components/SectionLabel';
import RoomCard from '@/components/RoomCard';
import ExperienceCard from '@/components/ExperienceCard';
import OfferCard from '@/components/OfferCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';
import JournalCard from '@/components/JournalCard';
import { BookButton } from '@/components/BookingModal';

export const metadata: Metadata = {
  title: `${hotelConfig.name} — ${hotelConfig.tagline}`,
  description: hotelConfig.description,
};

export default async function HomePage() {
  const [rooms, experiences, offers, testimonials, journalPosts] = await Promise.all([
    sanityFetch<Room[]>(FEATURED_ROOMS_QUERY, {}, fallback.rooms.filter((r) => r.featured).slice(0, 3)),
    sanityFetch<Experience[]>(EXPERIENCES_QUERY, {}, fallback.experiences),
    sanityFetch<Offer[]>(OFFERS_QUERY, {}, fallback.offers),
    sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY, {}, fallback.testimonials),
    sanityFetch<JournalPost[]>(JOURNAL_QUERY, {}, fallback.journalPosts),
  ]);

  return (
    <>
      <KenBurnsHero image={IMG.heroHouse} />
      <TrustStrip variant="dark" />

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>The house</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              Twelve rooms. Four hundred acres. No agenda.
            </h2>
            <p className="mt-6 font-body text-base font-light leading-[1.9] text-ink/80">
              Craigmore House sits where the glen narrows and the road gives up — a Victorian
              shooting lodge rebuilt around the things that matter: open fires, deep baths,
              a kitchen that answers to the estate rather than to fashion, and silence of a
              quality you will want to take home.
            </p>
            <Link
              href="/about"
              className="mt-9 inline-block border border-forest px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment"
            >
              Our story
            </Link>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-[4/5]">
              <Image src={IMG.exterior} alt="The house from the south lawn" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Rooms teaser */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Stay</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Rooms & suites</h2>
            </div>
            <Link href="/rooms" className="font-body text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:text-forest">
              All twelve rooms →
            </Link>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <StaggerItem key={room.slug}><RoomCard room={room} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Experiences trio */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Beyond the door</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Days, properly spent</h2>
          </div>
          <Link href="/experiences" className="font-body text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:text-forest">
            All experiences →
          </Link>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.slice(0, 3).map((exp) => (
            <StaggerItem key={exp.slug}><ExperienceCard experience={exp} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Dining pull-quote */}
      <section className="relative bg-forest">
        <Image src={IMG.dining1} alt="The dining room at night" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:py-40">
          <FadeUp>
            <SectionLabel variant="parchment">The dining room</SectionLabel>
            <blockquote className="mt-8 font-heading text-3xl font-medium italic leading-snug text-parchment md:text-5xl">
              “The larder is the glen itself — the river, the hill, and a walled garden that has
              fed this house since 1847.”
            </blockquote>
            <p className="mt-8 font-body text-[11px] uppercase tracking-[0.25em] text-parchment/60">
              Calum Ross, Head Chef
            </p>
            <Link
              href="/dining"
              className="mt-10 inline-block border border-parchment/60 px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-parchment transition-colors duration-300 hover:bg-parchment hover:text-forest"
            >
              Dining at the house
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Offers grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Special offers</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Reasons, if you need one</h2>
          </div>
          <Link href="/offers" className="font-body text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:text-forest">
            All offers →
          </Link>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {offers.slice(0, 3).map((offer) => (
            <StaggerItem key={offer.slug}><OfferCard offer={offer} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Location */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <FadeUp>
              <div className="relative aspect-[4/3]">
                <Image src={IMG.glen} alt="The glen below the house" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <SectionLabel>Finding us</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
                Ninety minutes from Edinburgh. A world from anywhere.
              </h2>
              <p className="mt-6 font-body text-base font-light leading-[1.9] text-ink/80">
                Off the A9 at Pitlochry, four miles up a single-track road that ends at our gates.
                Direct trains from London, Edinburgh and Inverness; we collect from the platform.
                The last half mile is gravel, hills, and the growing suspicion that you have made
                an excellent decision.
              </p>
              <Link
                href="/location"
                className="mt-9 inline-block border border-forest px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment"
              >
                Directions & the area
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>From the house</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Stories & dispatches</h2>
            </div>
            <a href="/journal" className="font-body text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:text-forest">
              All stories →
            </a>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {journalPosts.filter((p) => p.featured).slice(0, 3).map((post) => (
              <StaggerItem key={post.slug}><JournalCard post={post} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Testimonials — directly above final CTA for maximum conversion impact */}
      <section className="bg-forest border-t border-parchment/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp>
            <TestimonialSlider testimonials={testimonials} />
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="parchment">The next step</SectionLabel>
            <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-parchment md:text-6xl">
              The glen will still be here.<br />Your dates may not.
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <BookButton className="w-64 bg-gold px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-parchment sm:w-auto">
                Check availability
              </BookButton>
              <a
                href={`tel:${hotelConfig.contact.phone.replace(/[^+\d]/g, '')}`}
                className="w-64 border border-parchment/60 px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-parchment transition-colors duration-300 hover:bg-parchment hover:text-forest sm:w-auto"
              >
                {hotelConfig.contact.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <DirectBookingBanner />
    </>
  );
}
