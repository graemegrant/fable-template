import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { pickLocale, resolveRoom, resolveExperience, resolveOffer, resolveTestimonial, resolveJournalPost } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import { sanityFetch } from '@/lib/sanity';
import {
  FEATURED_ROOMS_QUERY, EXPERIENCES_QUERY, OFFERS_QUERY, TESTIMONIALS_QUERY, JOURNAL_QUERY,
} from '@/lib/queries';
import * as fallback from '@/lib/data';
import { IMG } from '@/lib/data';
import type { RoomI18n, ExperienceI18n, OfferI18n, TestimonialI18n, JournalPostI18n } from '@/lib/types';
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
import GlenMoment from '@/components/GlenMoment';
import StatsBand from '@/components/StatsBand';
import { BookButton } from '@/components/BookingModal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: {
      absolute: `${hotelConfig.name} — ${pickLocale(hotelConfig.seo.descriptor, locale)} in ${pickLocale(hotelConfig.seo.locationLabel, locale)}`,
    },
    description: pickLocale(hotelConfig.description, locale) ?? '',
    path: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = await getTranslations('home');

  const [rawRooms, rawExperiences, rawOffers, rawTestimonials, rawJournalPosts] = await Promise.all([
    sanityFetch<RoomI18n[]>(FEATURED_ROOMS_QUERY, {}, fallback.rooms.filter((r) => r.featured).slice(0, 3)),
    sanityFetch<ExperienceI18n[]>(EXPERIENCES_QUERY, {}, fallback.experiences),
    sanityFetch<OfferI18n[]>(OFFERS_QUERY, {}, fallback.offers),
    sanityFetch<TestimonialI18n[]>(TESTIMONIALS_QUERY, {}, fallback.testimonials),
    sanityFetch<JournalPostI18n[]>(JOURNAL_QUERY, {}, fallback.journalPosts),
  ]);
  const rooms = rawRooms.map((r) => resolveRoom(r, locale));
  const experiences = rawExperiences.map((e) => resolveExperience(e, locale));
  const offers = rawOffers.map((o) => resolveOffer(o, locale));
  const testimonials = rawTestimonials.map((t) => resolveTestimonial(t, locale));
  const journalPosts = rawJournalPosts.map((p) => resolveJournalPost(p, locale));

  return (
    <>
      <KenBurnsHero image={IMG.heroHouse} />
      <TrustStrip variant="dark" />

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>{t('houseLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              {t('houseHeading')}
            </h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              {t('houseIntro')}
            </p>
            <Link
              href="/about"
              className="mt-9 inline-block rounded-ctrl border border-primary px-8 py-4 font-body text-2xs uppercase tracking-25 text-primary transition-colors duration-300 hover:bg-primary hover:text-canvas"
            >
              {t('ourStory')}
            </Link>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-portrait overflow-hidden rounded-img">
              <Image src={IMG.exterior} alt={t('exteriorAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
        <div className="mt-20">
          <StatsBand />
        </div>
      </section>

      {/* The Glen — the one authored scroll moment */}
      <GlenMoment />

      {/* Rooms teaser */}
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>{t('roomsLabel')}</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('roomsHeading')}</h2>
            </div>
            <Link href="/rooms" className="font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
              {t('allRooms')}
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
            <SectionLabel>{t('experiencesLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('experiencesHeading')}</h2>
          </div>
          <Link href="/experiences" className="font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
            {t('allExperiences')}
          </Link>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.slice(0, 3).map((exp) => (
            <StaggerItem key={exp.slug}><ExperienceCard experience={exp} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Dining pull-quote */}
      <section className="relative bg-primary">
        <Image src={IMG.dining1} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:py-40">
          <FadeUp>
            <SectionLabel variant="ondark">{t('diningLabel')}</SectionLabel>
            <blockquote className="mt-8 font-heading text-3xl font-medium italic leading-snug text-canvas md:text-5xl">
              “{t('diningQuote')}”
            </blockquote>
            <p className="mt-8 font-body text-2xs uppercase tracking-25 text-canvas/60">
              {t('diningQuoteAttribution')}
            </p>
            <Link
              href="/dining"
              className="mt-10 inline-block rounded-ctrl border border-canvas/60 px-8 py-4 font-body text-2xs uppercase tracking-25 text-canvas transition-colors duration-300 hover:bg-canvas hover:text-primary"
            >
              {t('diningCta')}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Offers grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>{t('offersLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('offersHeading')}</h2>
          </div>
          <Link href="/offers" className="font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
            {t('allOffers')}
          </Link>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {offers.slice(0, 3).map((offer) => (
            <StaggerItem key={offer.slug}><OfferCard offer={offer} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Location */}
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <FadeUp>
              <div className="relative aspect-landscape overflow-hidden rounded-img">
                <Image src={IMG.glen} alt={t('glenAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <SectionLabel>{t('locationLabel')}</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
                {t('locationHeading')}
              </h2>
              <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
                {t('locationIntro')}
              </p>
              <Link
                href="/location"
                className="mt-9 inline-block rounded-ctrl border border-primary px-8 py-4 font-body text-2xs uppercase tracking-25 text-primary transition-colors duration-300 hover:bg-primary hover:text-canvas"
              >
                {t('locationCta')}
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>{t('journalLabel')}</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('journalHeading')}</h2>
            </div>
            <Link href="/journal" className="font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
              {t('allStories')}
            </Link>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {journalPosts.filter((p) => p.featured).slice(0, 3).map((post) => (
              <StaggerItem key={post.slug}><JournalCard post={post} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Testimonials — directly above final CTA for maximum conversion impact */}
      <section className="border-t border-canvas/10 bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp>
            <TestimonialSlider testimonials={testimonials} />
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="ondark">{t('finalLabel')}</SectionLabel>
            <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-canvas md:text-6xl">
              {t('finalHeadingLine1')}<br />{t('finalHeadingLine2')}
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <BookButton className="w-64 rounded-ctrl bg-accentfill px-8 py-4 font-body text-2xs uppercase tracking-25 text-onaccent transition-colors duration-300 hover:bg-canvas hover:text-primary sm:w-auto" />
              <a
                href={`tel:${hotelConfig.contact.phoneHref}`}
                className="w-64 rounded-ctrl border border-canvas/60 px-8 py-4 font-body text-2xs uppercase tracking-25 text-canvas transition-colors duration-300 hover:bg-canvas hover:text-primary sm:w-auto"
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
