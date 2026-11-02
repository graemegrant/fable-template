import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import { IMG } from '@/lib/data';
// Coastal-only, so imported directly rather than through @look.
import CoastalHero from '../components/CoastalHero';
import TrustStrip from '@look/components/TrustStrip';
import SectionLabel from '@look/components/SectionLabel';
import RoomCard from '@look/components/RoomCard';
import ExperienceCard from '@look/components/ExperienceCard';
import OfferCard from '@look/components/OfferCard';
import TestimonialSlider from '@look/components/TestimonialSlider';
import DirectBookingBanner from '@look/components/DirectBookingBanner';
import Facilities from '@look/components/Facilities';
import ReviewsBand from '@look/components/ReviewsBand';
import { FadeUp, StaggerGrid, StaggerItem } from '@look/components/Motion';
import JournalCard from '@look/components/JournalCard';
import StatsBand from '@look/components/StatsBand';
import { BookButton } from '@look/components/BookingModal';
import type { HomeData } from '@/lib/pages/home';

const pillButton =
  'inline-flex min-h-12 items-center justify-center rounded-ctrl bg-primary px-7 py-3 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5';
const textLink =
  'group inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-accent transition-colors hover:text-primary';

/** Section heading row: label and heading, with a "see all" link opposite. */
function SectionHeader({ label, heading, href, linkLabel }: { label: string; heading: string; href: string; linkLabel: string }) {
  return (
    <FadeUp className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{heading}</h2>
      </div>
      <Link href={href} className={textLink}>
        {linkLabel}
      </Link>
    </FadeUp>
  );
}

/** Home page, Coastal look: light, rounded and airy, with wave dividers.
 *  Same content and conversion points as every look; data comes from
 *  lib/pages/home.ts. */
export default async function HomeView({ rooms, experiences, offers, testimonials, journalPosts }: { locale: Locale } & HomeData) {
  const t = await getTranslations('home');
  return (
    <>
      <CoastalHero image={IMG.heroHouse} />
      <TrustStrip />

      {/* Introduction: centred words, an overlapping photo pair, then the figures */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <SectionLabel>{t('houseLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-semibold leading-heading text-primary md:text-6xl">{t('houseHeading')}</h2>
            <p className="mt-6 font-body text-lg leading-body text-ink/80">{t('houseIntro')}</p>
            <Link href="/about" className={`mt-8 ${pillButton}`}>
              {t('ourStory')}
            </Link>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative pb-16 pr-10 sm:pr-16">
              <div className="relative aspect-portrait overflow-hidden rounded-card">
                <Image src={IMG.exterior} alt={t('exteriorAlt')} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
              </div>
              <div className="shadow-sand absolute bottom-0 right-0 w-1/2 rotate-3 rounded-card bg-canvas p-2">
                <div className="relative aspect-square overflow-hidden rounded-img">
                  <Image src={IMG.garden} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      <div className="pb-20 lg:pb-28">
        <StatsBand />
      </div>

      {/* Rooms: swipe on phones, a grid from tablet up */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <SectionHeader label={t('roomsLabel')} heading={t('roomsHeading')} href="/rooms" linkLabel={t('allRooms')} />
        <StaggerGrid className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {rooms.map((room) => (
            <StaggerItem key={room.slug} className="w-5/6 shrink-0 snap-start sm:w-auto">
              <RoomCard room={room} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Experiences on sand, between two waves */}
      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <SectionHeader
            label={t('experiencesLabel')}
            heading={t('experiencesHeading')}
            href="/experiences"
            linkLabel={t('allExperiences')}
          />
          <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.slice(0, 3).map((exp) => (
              <StaggerItem key={exp.slug}>
                <ExperienceCard experience={exp} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />

      {/* Dining: a split deep-sea panel, photo one side, the quote the other */}
      <section className="px-3 py-16 sm:px-5 lg:py-24">
        <FadeUp className="mx-auto grid max-w-7xl overflow-hidden rounded-card bg-primarydeep md:grid-cols-2">
          <div className="relative aspect-landscape md:aspect-auto md:min-h-480px">
            <Image src={IMG.dining1} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">
            <SectionLabel variant="ondark">{t('diningLabel')}</SectionLabel>
            <blockquote className="mt-6 font-heading text-3xl italic leading-snug text-canvas md:text-4xl">“{t('diningQuote')}”</blockquote>
            <p className="mt-6 font-body text-sm text-canvas/80">{t('diningQuoteAttribution')}</p>
            <Link
              href="/dining"
              className="mt-8 inline-flex min-h-12 w-fit items-center rounded-ctrl bg-accentfill px-7 py-3 font-body text-sm font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t('diningCta')}
            </Link>
          </div>
        </FadeUp>
      </section>

      <Facilities />

      {/* Offers, hidden when every offer has expired */}
      {offers.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
          <SectionHeader label={t('offersLabel')} heading={t('offersHeading')} href="/offers" linkLabel={t('allOffers')} />
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.slice(0, 3).map((offer) => (
              <StaggerItem key={offer.slug} className="h-full">
                <OfferCard offer={offer} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* Location: a wide photo with the words on a card laid over it */}
      <section className="px-3 pb-20 sm:px-5 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative aspect-landscape overflow-hidden rounded-card md:aspect-video">
            <Image src={IMG.glen} alt={t('glenAlt')} fill sizes="100vw" className="object-cover" />
          </div>
          <FadeUp className="shadow-sand relative mx-3 -mt-20 rounded-card bg-canvas p-7 sm:mx-8 sm:p-10 md:absolute md:bottom-8 md:left-8 md:mx-0 md:mt-0 md:max-w-md">
            <SectionLabel>{t('locationLabel')}</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-heading text-primary md:text-4xl">{t('locationHeading')}</h2>
            <p className="mt-4 font-body text-base leading-body text-ink/80">{t('locationIntro')}</p>
            <Link href="/location" className={`mt-7 ${pillButton}`}>
              {t('locationCta')}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Journal: postcards */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <SectionHeader label={t('journalLabel')} heading={t('journalHeading')} href="/journal" linkLabel={t('allStories')} />
        <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Guest words directly above the final CTA, for conversion */}
      {testimonials.length > 0 ? (
        <section className="px-3 py-6 sm:px-5">
          <div className="mx-auto max-w-7xl rounded-card bg-accentondark/35 px-6 py-16 lg:py-20">
            <FadeUp>
              <TestimonialSlider testimonials={testimonials} />
            </FadeUp>
          </div>
        </section>
      ) : (
        <ReviewsBand />
      )}

      {/* Final CTA: a deep-sea panel over a soft photo, a wave along its foot */}
      <section className="px-3 py-6 sm:px-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-card bg-primarydeep">
          <Image src={IMG.loch} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="relative px-6 pb-24 pt-20 text-center lg:pb-28 lg:pt-24">
            <FadeUp>
              <SectionLabel variant="ondark">{t('finalLabel')}</SectionLabel>
              <h2 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-semibold leading-heading text-canvas md:text-6xl">
                {t('finalHeadingLine1')}
                <br />
                <span className="italic text-accentondark">{t('finalHeadingLine2')}</span>
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BookButton className="min-h-12 w-64 rounded-ctrl bg-accentfill px-8 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto" />
                <a
                  href={`tel:${hotelConfig.contact.phoneHref}`}
                  className="inline-flex min-h-12 w-64 items-center justify-center rounded-ctrl border border-canvas/50 px-8 py-3.5 font-body text-base font-medium text-canvas transition-colors duration-300 hover:bg-canvas hover:text-primary sm:w-auto"
                >
                  {hotelConfig.contact.phone}
                </a>
              </div>
            </FadeUp>
          </div>
          <div aria-hidden className="wave absolute inset-x-0 bottom-0 text-accentondark/25" />
        </div>
      </section>

      <DirectBookingBanner />
    </>
  );
}
