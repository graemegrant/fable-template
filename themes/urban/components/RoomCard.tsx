'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/image';
import type { Room } from '@/lib/types';

/* Client component because RoomsFilter (a 'use client' module) imports it.
   headingLevel: 3 under a section h2 (homepage, related rooms); 2 on the
   /rooms listing, where cards sit directly under the page h1. */

/** Urban room card: a tall, square-cut photo, the name in condensed
 *  capitals, and the specs and rate set in mono like a spec sheet. */
export default function RoomCard({ room, headingLevel = 3 }: { room: Room; headingLevel?: 2 | 3 }) {
  const t = useTranslations('shared');
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const specs = [room.sqm ? `${room.sqm} ${t('sqm')}` : '', `${t('sleeps')} ${room.occupancy}`, room.view ?? ''].filter(Boolean);
  return (
    <Link href={`/rooms/${room.slug}`} className="group relative block h-full border-t border-canvas/15 pt-4">
      <div className="relative aspect-portrait overflow-hidden bg-canvas/5">
        <Image
          src={imgSrc(room.heroImage, 1000)}
          alt={room.imageAlt ?? `${room.roomType}${room.view ? `, ${room.view}` : ''}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
        />
        <span className="absolute bottom-0 right-0 bg-primary px-3 py-2 font-mono text-xs uppercase tracking-18 text-canvas">
          {t('from')} <span className="text-accentondark">£{room.rate}</span>
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <Heading className="font-condensed font-heading text-3xl font-extrabold uppercase leading-none text-canvas transition-colors group-hover:text-accentondark">
          {room.roomType}
        </Heading>
        <span aria-hidden className="font-mono text-lg text-accentondark transition-transform duration-300 group-hover:translate-x-1">→</span>
        <span className="sr-only">{t('viewRoom')}</span>
      </div>
      {room.name && <p className="mt-2 font-mono text-xs uppercase tracking-18 text-canvas/70">{room.name}</p>}
      {room.hook && <p className="mt-3 font-body text-sm leading-relaxed text-canvas/80">{room.hook}</p>}
      <p className="mt-4 font-mono text-xs uppercase tracking-18 text-canvas/70">{specs.join(' / ')}</p>
      {/* Display copy only: the booking engine owns availability. */}
      {room.roomCount != null && room.roomCount > 1 && (
        <p className="mt-1 font-mono text-xs uppercase tracking-18 text-canvas/70">{t('roomsAvailable', { count: room.roomCount })}</p>
      )}
    </Link>
  );
}
