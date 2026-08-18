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
  tall = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: unknown;
  tall?: boolean;
}) {
  return (
    <section className={`relative flex items-end ${tall ? 'min-h-78vh' : 'min-h-58vh'} bg-forest`}>
      <Image
        src={imgSrc(image)}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <HeroEntrance>
          <SectionLabel variant="parchment">{eyebrow}</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl font-medium leading-display text-parchment md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl font-body text-base font-light leading-relaxed text-parchment/80">
              {subtitle}
            </p>
          )}
        </HeroEntrance>
      </div>
    </section>
  );
}
