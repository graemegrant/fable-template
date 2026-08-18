import Image from 'next/image';
import { imgSrc } from '@/lib/sanity';
import type { TeamMember } from '@/lib/types';

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article>
      <div className="relative aspect-tall overflow-hidden rounded-img bg-warmgrey">
        <Image
          src={imgSrc(member.headshot, 800)}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="pt-5">
        <h3 className="font-heading text-xl font-medium text-ink">{member.name}</h3>
        <p className="mt-1 font-body text-2xs uppercase tracking-25 text-gold">{member.role}</p>
        <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink/70">{member.bio}</p>
      </div>
    </article>
  );
}
