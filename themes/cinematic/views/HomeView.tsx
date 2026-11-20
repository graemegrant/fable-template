import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import type { Locale } from '@/lib/locales';
import { IMG } from '@/lib/data';
import { imgSrc } from '@/lib/image';
import { formatCoordinates } from '@/lib/ui/geo';
import { Curtain, Parallax, Reveal, SplitHeading, WordReveal } from '@/lib/ui/gsap/patterns';
import TrustStrip from '../components/TrustStrip';
import SectionLabel from '../components/SectionLabel';
import OfferCard from '../components/OfferCard';
import TestimonialSlider from '../components/TestimonialSlider';
import DirectBookingBanner from '../components/DirectBookingBanner';
import Facilities from '../components/Facilities';
import ReviewsBand from '../components/ReviewsBand';
import JournalCard from '../components/JournalCard';
import StatsBand from '../components/StatsBand';
import { BookButton } from '../components/BookingModal';
import DayChapter, { HourMark } from '../components/day/DayChapter';
import DayClock from '../components/day/DayClock';
import DawnHero from '../components/day/DawnHero';
import RoomsWindow from '../components/day/RoomsWindow';
import GoldenName from '../components/day/GoldenName';
import Candlelight from '../components/day/Candlelight';
import NightSky from '../components/day/NightSky';
import type { HomeData } from '@/lib/pages/home';
import { loadRooms } from '@/lib/pages/rooms';

const button =
  'inline-flex min-h-14 items-center justify-center gap-4 rounded-ctrl px-7 font-mono text-sm uppercase tracking-18 transition-colors';
const glassButton = `glass text-canvas hover:bg-canvas/20 ${button}`;
const textLink = 'group inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-25 transition-colors';
const onDark = `${textLink} text-canvas hover:text-accentondark`;
const onPaper = `${textLink} text-ink hover:text-accent`;
const display = 'font-heading font-normal tracking-tight';

/** The hours of the day, one per chapter. */
const HOURS = {
  dawn: '05:48',
  morning: '07:30',
  lateMorning: '10:00',
  afternoon: '13:00',
  golden: '16:30',
  evening: '19:30',
  night: '22:00',
  midnight: '23:59',
} as const;

/**
 * Home page, Cinematic look: A day at the house. The page is one day at the
 * hotel, dawn to midnight, and scrolling down is the day passing: each
 * chapter is painted in its hour's light (DayChapter), and a clock keeps
 * the hour in the margin on desktop (DayClock). Same content and
 * conversion points as every look (data from lib/pages/home.ts), and the
 * still page tells the same day without motion:
 *
 *   05:48 First light  the sunrise over the house (DawnHero), the name, CTA, trust strip
 *   07:30 Morning      the house's story lighting up word by word, two arched windows
 *   10:00 Late morning the rooms, one by one through an arched window (RoomsWindow)
 *   13:00 Afternoon    days out: experiences
 *   16:30 Golden hour  the land seen through the hotel's name (GoldenName), finding us
 *   19:30 Evening      dining by candlelight (Candlelight), offers, facilities
 *   22:00 Night        guests' words by the fire, the numbers, bedtime reading
 *   23:59 Midnight     under the stars, the final call
 */
export default async function HomeView({ locale, experiences, offers, testimonials, journalPosts }: { locale: Locale } & HomeData) {
  const t = await getTranslations('home');
  const d = await getTranslations('day');
  // Every room passes the window, not just the featured three (same shared
  // loader as /rooms).
  const { rooms } = await loadRooms(locale);
  const { lat, lng } = hotelConfig.location;
  const posts = journalPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <DayClock />

      <DayChapter phase="dawn" time={HOURS.dawn} label={d('dawn')}>
        <DawnHero image={IMG.heroHouse} time={HOURS.dawn} label={d('dawn')} line={d('dawnLine')} cue={d('scrollCue')}>
          <TrustStrip variant="dark" />
        </DawnHero>
      </DayChapter>

      {/* 07:30 Morning: the house wakes */}
      <DayChapter phase="morning" time={HOURS.morning} label={d('morning')}>
        {/* Daybreak: most of a screen for the night to become morning, the
            risen sun high in it. The morning's type starts once the light
            has turned to paper. */}
        <div aria-hidden className="relative h-80vh overflow-hidden">
          <span className="sun-high absolute inset-x-0 top-0 mx-auto aspect-square w-full sm:w-3/4 lg:w-1/2" />
        </div>
        <div className="mx-auto max-w-screen-2xl px-5 pb-24 pt-16 lg:px-16 lg:pb-40 lg:pt-24">
          <HourMark time={HOURS.morning} label={d('morning')} tone="paper" />
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel variant="onpaper">{t('houseLabel')}</SectionLabel>
              <SplitHeading as="h2" by="words" className={`mt-6 text-4xl italic leading-heading text-ink md:text-5xl ${display}`}>
                {t('houseHeading')}
              </SplitHeading>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <WordReveal className="font-heading text-statement text-ink">{t('houseIntro')}</WordReveal>
              <Link href="/about" className={`mt-12 ${onPaper}`}>
                {t('ourStory')} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Two windows onto the morning. */}
          <div className="mt-24 grid items-end gap-6 md:grid-cols-12 lg:mt-32">
            <figure className="md:col-span-6 md:col-start-2">
              <Curtain className="window-arch aspect-tall bg-ink/10">
                <Parallax className="size-full" depth={0.8}>
                  <Image src={imgSrc(IMG.exterior, 1400)} alt={t('exteriorAlt')} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </Parallax>
              </Curtain>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-25 text-ink/80">I. {t('exteriorAlt')}</figcaption>
            </figure>
            <figure className="md:col-span-4 md:col-start-9 md:pb-32">
              <Curtain className="window-arch aspect-portrait bg-ink/10">
                <Parallax className="size-full" depth={1.4}>
                  <Image src={imgSrc(IMG.garden, 900)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </Parallax>
              </Curtain>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-25 text-ink/80">II. {formatCoordinates(lat, lng)}</figcaption>
            </figure>
          </div>
        </div>
      </DayChapter>

      {/* 10:00 Late morning: the rooms through the window */}
      <DayChapter phase="lateMorning" time={HOURS.lateMorning} label={d('lateMorning')}>
        <RoomsWindow
          rooms={rooms}
          intro={
            <>
              <HourMark time={HOURS.lateMorning} label={d('lateMorning')} tone="paper" />
              <SplitHeading className={`mt-10 text-5xl leading-display text-ink md:text-6xl ${display}`}>{t('roomsHeading')}</SplitHeading>
              <p className="mt-6 max-w-md font-body text-base leading-copy text-ink/80">{d('roomsLine')}</p>
            </>
          }
          footer={
            <Link href="/rooms" className={`mt-6 ${onPaper}`}>
              {t('allRooms')}
            </Link>
          }
        />
      </DayChapter>

      {/* 13:00 Afternoon: days out */}
      <DayChapter phase="afternoon" time={HOURS.afternoon} label={d('afternoon')}>
        <div className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-16 lg:py-40">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <HourMark time={HOURS.afternoon} label={d('afternoon')} tone="paper" />
              <SectionLabel variant="onpaper" className="mt-12">
                {t('experiencesLabel')}
              </SectionLabel>
              <SplitHeading className={`mt-6 text-5xl leading-display text-ink md:text-7xl ${display}`}>{t('experiencesHeading')}</SplitHeading>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-body text-base leading-copy text-ink/80">{d('afternoonLine')}</p>
              <Link href="/experiences" className={`mt-6 ${onPaper}`}>
                {t('allExperiences')}
              </Link>
            </div>
          </div>
          <Reveal className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-3">
            {experiences.slice(0, 3).map((exp, i) => (
              <Link key={exp.slug} href={`/experiences/${exp.slug}`} data-cursor className={`group block ${i === 1 ? 'sm:mt-24' : ''}`}>
                <Parallax className="aspect-tall rounded-img bg-ink/10" depth={i === 1 ? 1.2 : 0.7}>
                  <Image
                    src={imgSrc(exp.heroImage, 900)}
                    alt={exp.imageAlt ?? `${exp.name}, ${exp.category}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
                  />
                </Parallax>
                <p className="mt-5 font-mono text-xs uppercase tracking-18 text-ink/80">{exp.category}</p>
                <h3 className="mt-2 font-heading text-3xl font-normal leading-tight text-ink transition-colors group-hover:italic group-hover:text-accent">
                  {exp.name}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-18 text-ink/80">
                  {exp.duration} / {exp.price}
                </p>
              </Link>
            ))}
          </Reveal>
        </div>
      </DayChapter>

      {/* 16:30 Golden hour: the land through the name, then finding us */}
      <DayChapter phase="golden" time={HOURS.golden} label={d('golden')}>
        <GoldenName name={hotelConfig.name} image={IMG.glen} intro={<HourMark time={HOURS.golden} label={d('golden')} tone="mist" className="glass-deep hour-chip w-fit rounded-ctrl py-2 pl-5 pr-6" />} line={d('goldenLine')}>
          <div className="mx-auto grid max-w-screen-2xl gap-10 px-5 py-24 lg:grid-cols-12 lg:px-16 lg:py-32">
            <div className="lg:col-span-6">
              <SectionLabel>{t('locationLabel')}</SectionLabel>
              <SplitHeading className={`mt-6 text-5xl leading-display text-canvas md:text-6xl ${display}`}>{t('locationHeading')}</SplitHeading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-body text-lg leading-body text-canvas/85">{t('locationIntro')}</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="/location" className={glassButton}>
                  {t('locationCta')}
                </Link>
                <span className="font-mono text-xs uppercase tracking-25 text-canvas/70">{formatCoordinates(lat, lng)}</span>
              </div>
            </div>
          </div>
        </GoldenName>
      </DayChapter>

      {/* 19:30 Evening: dinner by candlelight, then the reasons to come */}
      <DayChapter phase="evening" time={HOURS.evening} label={d('evening')} className="pb-24 lg:pb-32">
        <Candlelight image={IMG.dining1}>
          <div className="mx-auto max-w-screen-2xl px-6 pb-16 pt-40 lg:px-16 lg:pb-24">
            <HourMark time={HOURS.evening} label={d('evening')} />
            <SectionLabel className="mt-12">{t('diningLabel')}</SectionLabel>
            <SplitHeading as="blockquote" className={`mt-8 max-w-5xl text-4xl leading-heading text-canvas md:text-6xl ${display}`}>
              <span aria-hidden className="text-accentondark">“</span>
              {t('diningQuote')}
              <span aria-hidden className="text-accentondark">”</span>
            </SplitHeading>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/dining" className={glassButton}>
                {t('diningCta')}
              </Link>
              <p className="font-mono text-xs uppercase tracking-25 text-canvas/75">{t('diningQuoteAttribution')}</p>
            </div>
          </div>
        </Candlelight>

        {offers.length > 0 && (
          <div className="mx-auto max-w-screen-2xl px-5 pt-24 lg:px-16 lg:pt-32">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-canvas/15 pb-8">
              <div>
                <SectionLabel>{t('offersLabel')}</SectionLabel>
                <SplitHeading className={`mt-6 text-5xl leading-display text-canvas md:text-6xl ${display}`}>{t('offersHeading')}</SplitHeading>
              </div>
              <Link href="/offers" className={onDark}>
                {t('allOffers')}
              </Link>
            </div>
            <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {offers.slice(0, 3).map((offer) => (
                <div key={offer.slug} className="h-full">
                  <OfferCard offer={offer} />
                </div>
              ))}
            </Reveal>
          </div>
        )}
        <div className="lg:px-8">
          <Facilities />
        </div>
      </DayChapter>

      {/* 22:00 Night: by the fire, then bedtime reading */}
      <DayChapter phase="night" time={HOURS.night} label={d('night')}>
        <div className="mx-auto max-w-screen-2xl px-5 pt-24 lg:px-16 lg:pt-32">
          <HourMark time={HOURS.night} label={d('night')} />
          <p className="mt-8 max-w-2xl font-heading text-3xl italic leading-heading text-canvas md:text-4xl">{d('nightLine')}</p>
        </div>
        {testimonials.length > 0 ? (
          <Reveal className="mx-auto max-w-screen-2xl px-2 py-12 lg:p-16">
            <TestimonialSlider testimonials={testimonials} />
          </Reveal>
        ) : (
          <div className="lg:px-8">
            <ReviewsBand />
          </div>
        )}
        <div className="px-2 py-12 lg:px-16">
          <StatsBand />
        </div>
        {posts.length > 0 && (
          <div className="mx-auto max-w-screen-2xl px-5 py-24 lg:px-16 lg:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-canvas/15 pb-8">
              <div>
                <SectionLabel>{d('bedtimeLabel')}</SectionLabel>
                <SplitHeading className={`mt-6 text-5xl leading-display text-canvas md:text-6xl ${display}`}>{t('journalHeading')}</SplitHeading>
              </div>
              <Link href="/journal" className={onDark}>
                {t('allStories')}
              </Link>
            </div>
            <Reveal className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.slug} className="h-full">
                  <JournalCard post={post} />
                </div>
              ))}
            </Reveal>
          </div>
        )}
      </DayChapter>

      {/* 23:59 Midnight: under the stars, the final call */}
      <DayChapter phase="midnight" time={HOURS.midnight} label={d('midnight')} className="flex min-h-screen items-center overflow-hidden">
        <NightSky />
        <div className="relative mx-auto w-full max-w-screen-2xl px-5 pb-32 pt-48 text-center lg:px-16">
          <HourMark time={HOURS.midnight} label={d('midnight')} className="justify-center" />
          <SectionLabel className="mt-12 justify-center">{t('finalLabel')}</SectionLabel>
          <SplitHeading by="chars" className={`mt-10 text-canvas ${display}`}>
            <span className="block text-6xl leading-none md:text-8xl lg:text-9xl">{t('finalHeadingLine1')}</span>
            <span className="block text-mega italic text-accentondark">{t('finalHeadingLine2')}</span>
          </SplitHeading>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookButton className={`bg-accentfill text-onaccent hover:bg-canvas hover:text-primary ${button}`} />
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className={onDark}>
              {hotelConfig.contact.phone}
            </a>
          </div>
        </div>
      </DayChapter>

      <DirectBookingBanner />
    </>
  );
}
