'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/sanity';
import type { Room } from '@/lib/types';

/* Client component (not async + getTranslations) because RoomsFilter
   imports it directly from a 'use client' module — a Server Component
   using server-only APIs can't be pulled into a client import graph.
   useTranslations works fine here since NextIntlClientProvider (root
   layout) already supplies messages to the whole client tree. */
/* headingLevel: 3 under a section h2 (homepage, related rooms); 2 on the
   /rooms listing, where cards sit directly under the page h1. */
export default function RoomCard({ room, headingLevel = 3 }: { room: Room; headingLevel?: 2 | 3 }) {
  const t = useTranslations('shared');
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link href={`/rooms/${room.slug}`} className="group block">
      <div className="relative aspect-portrait overflow-hidden rounded-img bg-canvasalt">
        <Image
          src={imgSrc(room.heroImage, 1000)}
          alt={room.imageAlt ?? `${room.roomType}${room.view ? ` — ${room.view}` : ''}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
      </div>
      <div className="pt-6">
        <Heading className="font-heading text-2xl font-medium text-ink">{room.roomType}</Heading>
        {/* Only populated for the rare case where a physical room has its
            own name distinct from its category — see lib/types.ts Room. */}
        {room.name && (
          <p className="mt-1 font-body text-xs uppercase tracking-20 text-ink/70">{room.name}</p>
        )}
        {room.hook && (
          <p className="mt-2 font-body text-sm font-light leading-snug text-ink/80">{room.hook}</p>
        )}
        <p className="mt-2 font-body text-xs uppercase tracking-20 text-ink/70">
          {room.sqm ? `${room.sqm} ${t('sqm')} · ` : ''}{t('sleeps')} {room.occupancy}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <div>
            <p className="font-body text-sm text-ink/80">
              {t('from')} <span className="font-heading text-xl text-primary">£{room.rate}</span> {t('perNight')}
            </p>
            {/* Display copy only — never drives availability (AGENTS.md
                philosophy: the booking engine owns inventory, not the
                marketing site). Suppressed at 1 since "1 available" reads
                oddly for what's effectively a single room. */}
            {room.roomCount != null && room.roomCount > 1 && (
              <p className="mt-0.5 font-body text-xs text-ink/70">{t('roomsAvailable', { count: room.roomCount })}</p>
            )}
          </div>
          <span className="font-body text-2xs uppercase tracking-20 text-accent transition-colors group-hover:text-primary">
            {t('viewRoom')}
          </span>
        </div>
      </div>
    </Link>
  );
}
