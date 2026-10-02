import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/sanity';
import type { Experience } from '@/lib/types';

/* headingLevel: 3 under a section h2; 2 on the /experiences listing,
   where cards sit directly under the page h1. */
export default function ExperienceCard({
  experience,
  headingLevel = 3,
}: {
  experience: Experience;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link href={`/experiences/${experience.slug}`} className="group block">
      <div className="relative aspect-tall overflow-hidden rounded-img bg-canvasalt">
        <Image
          src={imgSrc(experience.heroImage, 1000)}
          alt={experience.imageAlt ?? `${experience.name} — ${experience.category}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
        <span className="absolute left-0 top-6 rounded-r-ctrl bg-accentfill px-4 py-2 font-body text-3xs uppercase tracking-25 text-onaccent">
          {experience.category}
        </span>
      </div>
      <div className="pt-6">
        <Heading className="font-heading text-2xl font-medium text-ink">{experience.name}</Heading>
        <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-4">
          <p className="font-body text-xs uppercase tracking-20 text-ink/60">{experience.duration}</p>
          <p className="font-body text-sm text-primary">{experience.price}</p>
        </div>
      </div>
    </Link>
  );
}
