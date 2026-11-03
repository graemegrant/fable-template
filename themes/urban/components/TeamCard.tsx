import Image from 'next/image';
import { imgSrc } from '@/lib/image';
import type { TeamMember } from '@/lib/types';

/** A team member as a contributor's card: a tall square-cut portrait, the
 *  name in condensed capitals, the role in mono. */
export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="h-full border-t border-canvas/15 pt-4">
      <div className="relative aspect-tall overflow-hidden bg-canvas/5">
        <Image
          src={imgSrc(member.headshot, 800)}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale transition duration-500 hover:grayscale-0"
        />
      </div>
      <h3 className="font-condensed mt-5 font-heading text-3xl font-extrabold uppercase leading-none text-canvas">{member.name}</h3>
      <p className="mt-2 font-mono text-xs uppercase tracking-18 text-accentondark">{member.role}</p>
      <p className="mt-4 font-body text-sm leading-relaxed text-canvas/80">{member.bio}</p>
    </article>
  );
}
