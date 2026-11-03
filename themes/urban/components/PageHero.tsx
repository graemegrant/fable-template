import Image from 'next/image';
import SectionLabel from './SectionLabel';
import { HeroEntrance } from './Motion';
import { imgSrc } from '@/lib/image';

/** Interior-page hero: a full-bleed photo under a black shade, the title
 *  in condensed capitals, and a rule between title and subtitle. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  tall = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: unknown;
  imageAlt?: string;
  tall?: boolean;
}) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-primarydeep ${tall ? 'min-h-78vh' : 'min-h-58vh'}`}>
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
      {/* Bottom-weighted shade so the heading holds contrast over any photo. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep via-primarydeep/60 to-primarydeep/30" />
      <div className="relative w-full px-5 pb-10 pt-32 lg:px-8 lg:pb-14">
        <HeroEntrance className="mx-auto max-w-screen-2xl">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="font-condensed mt-5 max-w-5xl font-heading text-6xl font-extrabold uppercase leading-none tracking-tight text-canvas md:text-8xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl border-t border-canvas/20 pt-5 font-body text-lg leading-relaxed text-canvas/90">{subtitle}</p>
          )}
        </HeroEntrance>
      </div>
    </section>
  );
}
