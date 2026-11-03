import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import { IMG } from '@/lib/data';
import { formatCoordinates } from '@/lib/ui/geo';
import UrbanHero from '../components/UrbanHero';
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

const blockButton =
  'inline-flex min-h-14 items-center justify-between gap-6 px-6 font-mono text-sm uppercase tracking-18 transition-colors';
const textLink =
  'group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-18 text-canvas transition-colors hover:text-accentondark';

/** Numbered section heading: label and condensed headline, "see all" opposite. */
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
    <FadeUp className="flex flex-wrap items-end justify-between gap-6 border-b border-canvas/15 pb-8">
      <div>
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{heading}</h2>
      </div>
      <Link href={href} className={textLink}>
        {linkLabel}
      </Link>
    </FadeUp>
  );
}

/** Home page, Urban look: dark and editorial, laid out like a magazine with
 *  numbered sections. Same content and conversion points as every look;
 *  data comes from lib/pages/home.ts. */
export default async function HomeView({ rooms, experiences, offers, testimonials, journalPosts }: { locale: Locale } & HomeData) {
  const t = await getTranslations('home');
  const { lat, lng } = hotelConfig.location;
  return (
    <>
      <UrbanHero image={IMG.heroHouse} />
      <TrustStrip />

      {/* 01 The house: a big headline, the story, two captioned plates */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <FadeUp className="lg:col-span-6">
            <SectionLabel index="01">{t('houseLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">
              {t('houseHeading')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <p className="font-body text-lg leading-body text-canvas/85">{t('houseIntro')}</p>
            <Link href="/about" className={`mt-8 border border-canvas/40 text-canvas hover:bg-canvas hover:text-ink ${blockButton}`}>
              {t('ourStory')} <span aria-hidden>→</span>
            </Link>
          </FadeUp>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <FadeUp className="md:col-span-8">
            <figure>
              <div className="relative aspect-wide overflow-hidden bg-canvas/5">
                <Image src={IMG.exterior} alt={t('exteriorAlt')} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-18 text-canvas/70">Fig. 01 / {t('exteriorAlt')}</figcaption>
            </figure>
          </FadeUp>
          <FadeUp delay={0.15} className="md:col-span-4 md:pt-24">
            <figure>
              <div className="relative aspect-portrait overflow-hidden bg-canvas/5">
                <Image src={IMG.garden} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-18 text-canvas/70">
                Fig. 02 / {formatCoordinates(lat, lng)}
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </section>
      <div className="px-5 pb-20 lg:px-8 lg:pb-28">
        <StatsBand />
      </div>

      {/* 02 Rooms */}
      <section className="mx-auto max-w-screen-2xl px-5 pb-20 lg:px-8 lg:pb-28">
        <SectionHeader index="02" label={t('roomsLabel')} heading={t('roomsHeading')} href="/rooms" linkLabel={t('allRooms')} />
        <StaggerGrid className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <StaggerItem key={room.slug} className="h-full">
              <RoomCard room={room} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* 03 Experiences, on the editorial grid; the first one leads large */}
      <section className="bg-grid border-y border-canvas/10">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeader
            index="03"
            label={t('experiencesLabel')}
            heading={t('experiencesHeading')}
            href="/experiences"
            linkLabel={t('allExperiences')}
          />
          <StaggerGrid className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.slice(0, 3).map((exp, i) => (
              <StaggerItem key={exp.slug} className={i === 0 ? 'sm:col-span-2' : ''}>
                <ExperienceCard experience={exp} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 04 Dining, on paper: the pull quote beside the plate */}
      <section className="bg-canvas text-ink">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
          <FadeUp className="flex flex-col justify-between gap-10 px-5 py-16 lg:px-8 lg:py-24">
            <SectionLabel index="04" variant="onpaper">
              {t('diningLabel')}
            </SectionLabel>
            <blockquote className="font-heading text-3xl font-semibold leading-tight md:text-5xl">
              <span aria-hidden className="text-accent">“</span>
              {t('diningQuote')}
              <span aria-hidden className="text-accent">”</span>
            </blockquote>
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink/20 pt-6">
              <p className="font-mono text-xs uppercase tracking-18 text-ink/70">{t('diningQuoteAttribution')}</p>
              <Link href="/dining" className={`bg-ink text-canvas hover:bg-accent ${blockButton}`}>
                {t('diningCta')} <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeUp>
          <div className="relative min-h-480px">
            <Image src={IMG.dining1} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Facilities />

      {/* 05 Offers, hidden when every offer has expired */}
      {offers.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-5 pb-20 lg:px-8 lg:pb-28">
          <SectionHeader index="05" label={t('offersLabel')} heading={t('offersHeading')} href="/offers" linkLabel={t('allOffers')} />
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.slice(0, 3).map((offer) => (
              <StaggerItem key={offer.slug} className="h-full">
                <OfferCard offer={offer} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* 06 Location: the words beside a wide plate captioned with the coordinates */}
      <section className="border-y border-canvas/10">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-12">
          <FadeUp className="px-5 py-16 lg:col-span-5 lg:px-8 lg:py-24">
            <SectionLabel index="06">{t('locationLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-6xl">
              {t('locationHeading')}
            </h2>
            <p className="mt-6 font-body text-base leading-body text-canvas/85">{t('locationIntro')}</p>
            <Link href="/location" className={`mt-8 bg-accentfill text-onaccent hover:bg-canvas ${blockButton}`}>
              {t('locationCta')} <span aria-hidden>→</span>
            </Link>
          </FadeUp>
          <figure className="relative min-h-480px lg:col-span-7">
            <Image src={IMG.glen} alt={t('glenAlt')} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-0 left-0 bg-primary px-4 py-3 font-mono text-xs uppercase tracking-18 text-canvas">
              {formatCoordinates(lat, lng)}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 07 Journal */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader index="07" label={t('journalLabel')} heading={t('journalHeading')} href="/journal" linkLabel={t('allStories')} />
        <StaggerGrid className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
        <section className="border-t border-canvas/10">
          <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
            <FadeUp>
              <TestimonialSlider testimonials={testimonials} />
            </FadeUp>
          </div>
        </section>
      ) : (
        <ReviewsBand />
      )}

      {/* Final CTA: the headline set huge, the second line in outline */}
      <section className="relative overflow-hidden border-t border-canvas/10">
        <Image src={IMG.loch} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="relative mx-auto max-w-screen-2xl px-5 py-24 lg:px-8 lg:py-32">
          <FadeUp>
            <SectionLabel>{t('finalLabel')}</SectionLabel>
            <h2 className="font-condensed mt-6 font-heading text-6xl font-extrabold uppercase leading-none text-canvas md:text-8xl lg:text-9xl">
              {t('finalHeadingLine1')}
              <br />
              <span className="text-outline text-accentondark">{t('finalHeadingLine2')}</span>
            </h2>
            <div className="mt-12 flex flex-col gap-px sm:flex-row">
              <BookButton className={`bg-accentfill text-onaccent hover:bg-canvas ${blockButton}`} />
              <a href={`tel:${hotelConfig.contact.phoneHref}`} className={`border border-canvas/40 text-canvas hover:bg-canvas hover:text-ink ${blockButton}`}>
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
