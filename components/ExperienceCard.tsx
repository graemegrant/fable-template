import Image from 'next/image';
import Link from 'next/link';
import { imgSrc } from '@/lib/sanity';
import type { Experience } from '@/lib/types';

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link href={`/experiences/${experience.slug}`} className="group block">
      <div className="relative aspect-tall overflow-hidden rounded-img bg-warmgrey">
        <Image
          src={imgSrc(experience.heroImage, 1000)}
          alt={experience.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
        <span className="absolute left-0 top-6 bg-gold px-4 py-2 font-body text-3xs uppercase tracking-25 text-forest">
          {experience.category}
        </span>
      </div>
      <div className="pt-6">
        <h3 className="font-heading text-2xl font-medium text-ink">{experience.name}</h3>
        <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-4">
          <p className="font-body text-xs uppercase tracking-20 text-ink/60">{experience.duration}</p>
          <p className="font-body text-sm text-forest">{experience.price}</p>
        </div>
      </div>
    </Link>
  );
}
