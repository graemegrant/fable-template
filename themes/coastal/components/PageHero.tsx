import Image from 'next/image';
import SectionLabel from './SectionLabel';
import { HeroEntrance } from './Motion';
import { imgSrc } from '@/lib/image';

/** Interior-page hero: the same rounded inset photo card as the homepage
 *  hero, shorter, with the eyebrow, title and subtitle bottom-left. */
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
    <section className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`relative mx-auto flex max-w-screen-2xl items-end overflow-hidden rounded-card bg-primary ${tall ? 'min-h-78vh' : 'min-h-58vh'}`}
      >
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
        {/* Bottom-weighted gradient so the heading holds contrast over any photo. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep/85 via-primarydeep/30 to-primarydeep/10" />
        <div className="relative w-full px-6 pb-10 pt-36 sm:px-10 sm:pb-14 lg:px-16">
          <HeroEntrance>
            <SectionLabel variant="ondark" className="backdrop-blur-sm">{eyebrow}</SectionLabel>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-semibold leading-display tracking-tight text-canvas md:text-7xl">
              {title}
            </h1>
            {subtitle && <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-canvas/90">{subtitle}</p>}
          </HeroEntrance>
        </div>
      </div>
    </section>
  );
}
