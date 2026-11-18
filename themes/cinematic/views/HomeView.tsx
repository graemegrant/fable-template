import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import { IMG } from '@/lib/data';
import { imgSrc } from '@/lib/image';
import { formatCoordinates } from '@/lib/ui/geo';
import { Curtain, Parallax, Reel, SplitHeading, WordReveal } from '@/lib/ui/gsap/patterns';
import CinematicHero from '../components/CinematicHero';
import TrustStrip from '../components/TrustStrip';
import SectionLabel from '../components/SectionLabel';
import RoomCard from '../components/RoomCard';
import ExperienceCard from '../components/ExperienceCard';
import OfferCard from '../components/OfferCard';
import TestimonialSlider from '../components/TestimonialSlider';
import DirectBookingBanner from '../components/DirectBookingBanner';
import Facilities from '../components/Facilities';
import ReviewsBand from '../components/ReviewsBand';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import JournalCard from '../components/JournalCard';
import StatsBand from '../components/StatsBand';
import { BookButton } from '../components/BookingModal';
import type { HomeData } from '@/lib/pages/home';
import { loadRooms } from '@/lib/pages/rooms';

const button =
  'inline-flex min-h-14 items-center justify-center gap-4 rounded-ctrl px-7 font-mono text-sm uppercase tracking-18 transition-colors';
const textLink =
  'group inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-25 text-canvas transition-colors hover:text-accentondark';
const display = 'font-heading font-normal tracking-tight text-canvas';

/** Section heading: label and serif headline rising line by line, "see all" opposite. */
function SectionHeader({
  index,
  label,
  heading,
  href,
  linkLabel,
}: {
  index: string;
  label: string;
  heading: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-canvas/15 pb-8">
      <div>
        <SectionLabel index={index}>{label}</SectionLabel>
        <SplitHeading className={`mt-6 max-w-4xl text-5xl leading-display md:text-7xl ${display}`}>{heading}</SplitHeading>
      </div>
      <Link href={href} className={textLink}>
        {linkLabel}
      </Link>
    </div>
  );
}

/**
 * Home page, Cinematic look: one continuous, image-led sequence built to
 * be remembered. Same content and conversion points as every look (data
 * from lib/pages/home.ts); the motion layer adds the signature moments on
 * desktop, and every section reads complete without it:
 *
 *   1. Hero aperture (CinematicHero): the photograph closes into a frame.
 *   2. Manifesto: the house's story lights up word by word.
 *   3. Diptych: two photographs open like curtains and drift in parallax.
 *   4. Rooms reel: the section holds and every room runs past like a film strip.
 *   5. Dining, location and the final call: full-bleed parallax plates with
 *      headlines rising line by line.
 */
export default async function HomeView({ locale, experiences, offers, testimonials, journalPosts }: { locale: Locale } & HomeData) {
  const t = await getTranslations('home');
  // The film strip runs through every room, not just the featured three
  // the other looks show (same shared loader as /rooms).
  const { rooms } = await loadRooms(locale);
  const { lat, lng } = hotelConfig.location;
  return (
    <>
      <CinematicHero image={IMG.heroHouse}>
        <TrustStrip variant="dark" />
      </CinematicHero>

      {/* 01 The house: the manifesto, then the diptych */}
      <section className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-8 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="01">{t('houseLabel')}</SectionLabel>
            <SplitHeading as="h2" by="words" className={`mt-6 text-3xl italic leading-heading md:text-4xl ${display}`}>
              {t('houseHeading')}
            </SplitHeading>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <WordReveal className="font-heading text-statement text-canvas">{t('houseIntro')}</WordReveal>
            <Link href="/about" className={`mt-12 ${textLink}`}>
              {t('ourStory')} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-12 lg:mt-32">
          <figure className="md:col-span-7">
            <Curtain className="aspect-portrait rounded-img bg-canvas/5 md:aspect-landscape">
              <Parallax className="size-full" depth={0.8}>
                <Image src={imgSrc(IMG.exterior, 1400)} alt={t('exteriorAlt')} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
              </Parallax>
            </Curtain>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-25 text-canvas/70">I. {t('exteriorAlt')}</figcaption>
          </figure>
          <figure className="md:col-span-4 md:col-start-9 md:pt-40">
            <Curtain className="aspect-portrait rounded-img bg-canvas/5">
              <Parallax className="size-full" depth={1.4}>
                <Image src={imgSrc(IMG.garden, 900)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </Parallax>
            </Curtain>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-25 text-canvas/70">II. {formatCoordinates(lat, lng)}</figcaption>
          </figure>
        </div>
      </section>

      <div className="px-5 pb-24 lg:px-8 lg:pb-32">
        <StatsBand />
      </div>

      {/* 02 Rooms: the film strip */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-screen-2xl px-5 lg:px-8">
          <SectionHeader index="02" label={t('roomsLabel')} heading={t('roomsHeading')} href="/rooms" linkLabel={t('allRooms')} />
        </div>
        <Reel
          className="relative mt-12"
          trackClassName="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-4 lg:scroll-px-8 lg:gap-10 lg:px-8"
          progressClassName="mx-5 mt-8 hidden h-px origin-left scale-x-0 bg-accentondark lg:mx-8 lg:block"
        >
          {rooms.map((room) => (
            <div key={room.slug} className="w-4/5 shrink-0 snap-start sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <RoomCard room={room} />
            </div>
          ))}
        </Reel>
      </section>

      {/* 03 Experiences */}
      <section className="bg-grid border-y border-canvas/10">
        <div className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-8 lg:py-32">
          <SectionHeader
            index="03"
            label={t('experiencesLabel')}
            heading={t('experiencesHeading')}
            href="/experiences"
            linkLabel={t('allExperiences')}
          />
          <StaggerGrid className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.slice(0, 3).map((exp, i) => (
              <StaggerItem key={exp.slug} className={i === 0 ? 'sm:col-span-2' : ''}>
                <ExperienceCard experience={exp} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 04 Dining: a full-bleed plate, the quote set over it */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <Parallax className="absolute inset-0" depth={1.2}>
          <Image src={imgSrc(IMG.dining1, 1920)} alt="" fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div aria-hidden className="vignette absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep via-primarydeep/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-screen-2xl px-5 pb-16 pt-40 lg:px-8 lg:pb-24">
          <SectionLabel index="04">{t('diningLabel')}</SectionLabel>
          <SplitHeading as="blockquote" className={`mt-8 max-w-5xl text-4xl leading-heading md:text-6xl ${display}`}>
            <span aria-hidden className="text-accentondark">“</span>
            {t('diningQuote')}
            <span aria-hidden className="text-accentondark">”</span>
          </SplitHeading>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link href="/dining" className={`border border-canvas/40 text-canvas hover:border-canvas hover:bg-canvas/10 ${button}`}>
              {t('diningCta')}
            </Link>
            <p className="font-mono text-xs uppercase tracking-25 text-canvas/75">{t('diningQuoteAttribution')}</p>
          </div>
        </div>
      </section>

      <Facilities />

      {/* 05 Offers, hidden when every offer has expired */}
      {offers.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-5 pb-24 lg:px-8 lg:pb-32">
          <SectionHeader index="05" label={t('offersLabel')} heading={t('offersHeading')} href="/offers" linkLabel={t('allOffers')} />
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.slice(0, 3).map((offer) => (
              <StaggerItem key={offer.slug} className="h-full">
                <OfferCard offer={offer} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* 06 Location: the words beside a tall plate captioned with the coordinates */}
      <section className="border-y border-canvas/10">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-12">
          <div className="flex flex-col justify-center px-5 py-20 lg:col-span-5 lg:px-8 lg:py-32">
            <SectionLabel index="06">{t('locationLabel')}</SectionLabel>
            <SplitHeading className={`mt-6 text-5xl leading-display md:text-6xl ${display}`}>{t('locationHeading')}</SplitHeading>
            <p className="mt-8 max-w-md font-body text-lg leading-body text-canvas/85">{t('locationIntro')}</p>
            <Link href="/location" className={`mt-10 self-start border border-canvas/40 text-canvas hover:border-canvas hover:bg-canvas/10 ${button}`}>
              {t('locationCta')}
            </Link>
          </div>
          <figure className="relative min-h-480px lg:col-span-7 lg:min-h-screen">
            <Parallax className="absolute inset-0" depth={1}>
              <Image src={imgSrc(IMG.glen, 1600)} alt={t('glenAlt')} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </Parallax>
            <figcaption className="absolute bottom-0 left-0 rounded-ctrl bg-primary px-4 py-3 font-mono text-xs uppercase tracking-25 text-canvas">
              {formatCoordinates(lat, lng)}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 07 Journal */}
      <section className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeader index="07" label={t('journalLabel')} heading={t('journalHeading')} href="/journal" linkLabel={t('allStories')} />
        <StaggerGrid className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {journalPosts
            .filter((p) => p.featured)
            .slice(0, 3)
            .map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <JournalCard post={post} />
              </StaggerItem>
            ))}
        </StaggerGrid>
      </section>

      {/* Guest words directly above the final call, for conversion */}
      {testimonials.length > 0 ? (
        <section className="border-t border-canvas/10">
          <div className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-8 lg:py-32">
            <FadeUp>
              <TestimonialSlider testimonials={testimonials} />
            </FadeUp>
          </div>
        </section>
      ) : (
        <ReviewsBand />
      )}

      {/* The final call: the headline set huge over the loch, one CTA */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Parallax className="absolute inset-0" depth={1.4}>
          <Image src={imgSrc(IMG.loch, 1920)} alt="" fill sizes="100vw" className="object-cover opacity-40" />
        </Parallax>
        <div aria-hidden className="vignette absolute inset-0" />
        <div className="relative mx-auto w-full max-w-screen-2xl px-5 py-32 text-center lg:px-8">
          <SectionLabel className="justify-center">{t('finalLabel')}</SectionLabel>
          <SplitHeading by="chars" className={`mt-10 ${display}`}>
            <span className="block text-6xl leading-none md:text-8xl lg:text-9xl">{t('finalHeadingLine1')}</span>
            <span className="block text-mega italic text-accentondark">{t('finalHeadingLine2')}</span>
          </SplitHeading>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookButton className={`bg-accentfill text-onaccent hover:bg-canvas hover:text-primary ${button}`} />
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className={`text-canvas hover:text-accentondark ${textLink}`}>
              {hotelConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <DirectBookingBanner />
    </>
  );
}
