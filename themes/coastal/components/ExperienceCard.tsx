import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/image';
import type { Experience } from '@/lib/types';

/* headingLevel: 3 under a section h2; 2 on the /experiences listing,
   where cards sit directly under the page h1. */

/** Coastal experience card: a tall rounded photo with the name and details
 *  set over a soft sea gradient, and the category as a sand chip. */
export default function ExperienceCard({
  experience,
  headingLevel = 3,
}: {
  experience: Experience;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link href={`/experiences/${experience.slug}`} className="group relative block aspect-tall overflow-hidden rounded-card bg-primary">
      <Image
        src={imgSrc(experience.heroImage, 1000)}
        alt={experience.imageAlt ?? `${experience.name}, ${experience.category}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primarydeep/90 via-primarydeep/20 to-transparent" />
      <span className="absolute left-4 top-4 rounded-ctrl bg-canvas/90 px-3.5 py-1.5 font-body text-xs font-semibold text-primary backdrop-blur-sm">
        {experience.category}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <Heading className="font-heading text-2xl font-semibold leading-heading text-canvas">{experience.name}</Heading>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-canvas/85">
          <span>{experience.duration}</span>
          <span aria-hidden className="size-1 rounded-full bg-accentondark" />
          <span className="font-semibold text-canvas">{experience.price}</span>
        </p>
      </div>
    </Link>
  );
}
