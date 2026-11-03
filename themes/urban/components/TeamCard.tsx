import Image from 'next/image';
import { imgSrc } from '@/lib/image';
import type { TeamMember } from '@/lib/types';

/** A team member: round portrait, name, role chip and a short bio. */
export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="shadow-sand h-full rounded-card bg-canvas p-6 text-center">
      <div className="relative mx-auto size-40 overflow-hidden rounded-full bg-canvasalt ring-4 ring-accentondark/50">
        <Image src={imgSrc(member.headshot, 600)} alt={member.name} fill sizes="160px" className="object-cover" />
      </div>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-primary">{member.name}</h3>
      <p className="mt-2 inline-flex rounded-ctrl bg-canvasalt px-3 py-1 font-body text-sm font-medium text-accent">{member.role}</p>
      <p className="mt-4 font-body text-sm leading-relaxed text-ink/80">{member.bio}</p>
    </article>
  );
}
