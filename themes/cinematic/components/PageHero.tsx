import Image from 'next/image';
import SectionLabel from './SectionLabel';
import { HeroEntrance } from './Motion';
import { Parallax, SplitHeading } from '@/lib/ui/gsap/patterns';
import { imgSrc } from '@/lib/image';
import { HourMark } from './day/DayChapter';
import NightSky from './day/NightSky';

/** The light over the photograph: the page's hour (A day at the house). */
export type HeroLight = 'dawn' | 'day' | 'golden' | 'evening' | 'night';

const LIGHT: Record<HeroLight, string> = {
  dawn: 'hero-light-dawn',
  day: 'hero-light-day',
  golden: 'hero-light-golden',
  evening: 'hero-light-evening',
  night: 'hero-light-night',
};

/** Interior-page hero: a photo in a rounded frame inset from the screen's
 *  edge, drifting in parallax under the light of the page's hour (`light`:
 *  dawn blue, daylight, golden hour, evening, or night with stars), the
 *  hour marked above the eyebrow, the title in the display serif rising
 *  line by line, and the subtitle on smoked glass. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  tall = false,
  light = 'day',
  hour,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: unknown;
  imageAlt?: string;
  tall?: boolean;
  light?: HeroLight;
  /** The page's hour, shown above the eyebrow. */
  hour?: { time: string; label: string };
}) {
  return (
    <section className={`relative flex items-end p-2 lg:p-3 ${tall ? 'min-h-78vh' : 'min-h-58vh'}`}>
      <div className="absolute inset-2 overflow-hidden rounded-card bg-primarydeep lg:inset-3">
        {/* Parallax positions its own element `relative`, so the frame-filling
            layer is a separate wrapper (on one element `relative` wins over
            `absolute` and the photograph collapses to no height). */}
        <div className="absolute inset-0">
          <Parallax className="size-full" depth={0.8}>
            <Image
              src={imgSrc(image)}
              alt={imageAlt ?? title}
              fill
              priority
              fetchPriority="high"
              quality={65}
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
        {/* The hour's light, bottom-weighted so the heading holds contrast
            over any photo (themes/cinematic/styles.css, .hero-light-*). */}
        <div aria-hidden className={`${LIGHT[light]} absolute inset-0`} />
        {light === 'night' && <NightSky />}
      </div>
      <div className="relative w-full px-4 pb-6 pt-32 lg:px-16 lg:pb-10">
        <div className="mx-auto max-w-screen-2xl">
          <HeroEntrance>
            {hour && <HourMark time={hour.time} label={hour.label} className="mb-8" />}
            <SectionLabel>{eyebrow}</SectionLabel>
          </HeroEntrance>
          <SplitHeading
            as="h1"
            onLoad
            delay={0.15}
            className="mt-5 max-w-5xl font-heading text-6xl font-normal leading-none tracking-tight text-canvas md:text-8xl"
          >
            {title}
          </SplitHeading>
          {subtitle && (
            <HeroEntrance delay={0.4} className="mt-6 max-w-2xl">
              <p className="glass-deep rounded-card px-5 py-4 font-body text-lg leading-relaxed text-canvas/90">{subtitle}</p>
            </HeroEntrance>
          )}
        </div>
      </div>
    </section>
  );
}
