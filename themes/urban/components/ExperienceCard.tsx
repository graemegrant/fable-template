import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/image';
import type { Experience } from '@/lib/types';

/* headingLevel: 3 under a section h2; 2 on the /experiences listing,
   where cards sit directly under the page h1. */

/** Urban experience card: a landscape photo with its category as a black
 *  tag, then the name in condensed capitals and the details in mono. */
export default function ExperienceCard({
  experience,
  headingLevel = 3,
}: {
  experience: Experience;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link href={`/experiences/${experience.slug}`} className="group block h-full">
      <div className="relative aspect-landscape overflow-hidden bg-canvas/5">
        <Image
          src={imgSrc(experience.heroImage, 1000)}
          alt={experience.imageAlt ?? `${experience.name}, ${experience.category}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
        />
        <span className="absolute left-0 top-0 bg-primary px-3 py-2 font-mono text-xs uppercase tracking-18 text-accentondark">
          {experience.category}
        </span>
      </div>
      <Heading className="font-condensed mt-5 font-heading text-2xl font-extrabold uppercase leading-none text-canvas transition-colors group-hover:text-accentondark">
        {experience.name}
      </Heading>
      <p className="mt-3 font-mono text-xs uppercase tracking-18 text-canvas/70">
        {experience.duration} / <span className="text-canvas">{experience.price}</span>
      </p>
    </Link>
  );
}
