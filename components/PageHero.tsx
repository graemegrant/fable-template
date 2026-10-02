import Image from 'next/image';
import SectionLabel from './SectionLabel';
import { HeroEntrance } from './Motion';
import { imgSrc } from '@/lib/sanity';

/** Reusable interior-page hero: eyebrow, title, subtitle over a darkened image. */
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
    <section className={`relative flex items-end ${tall ? 'min-h-78vh' : 'min-h-58vh'} bg-primary`}>
      <Image
        src={imgSrc(image)}
        alt={imageAlt ?? title}
        fill
        priority
        fetchPriority="high"
        quality={65}
        sizes="100vw"
        className="object-cover opacity-60"
      />
      {/* Bottom-weighted scrim so the heading holds contrast over any photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-primarydeep/85 via-primary/40 to-primary/20"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <HeroEntrance>
          <SectionLabel variant="ondark">{eyebrow}</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl font-medium leading-display text-canvas md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl font-body text-base font-light leading-relaxed text-canvas/80">
              {subtitle}
            </p>
          )}
        </HeroEntrance>
      </div>
    </section>
  );
}
