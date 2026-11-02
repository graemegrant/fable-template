'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { imgSrc } from '@/lib/image';
import type { Room } from '@/lib/types';

/* Client component because RoomsFilter (a 'use client' module) imports it.
   headingLevel: 3 under a section h2 (homepage, related rooms); 2 on the
   /rooms listing, where cards sit directly under the page h1. */

/** Coastal room card: a raised sand card, the photo inset with the nightly
 *  price pinned to it as a pill, and a round arrow that nudges on hover. */
export default function RoomCard({ room, headingLevel = 3 }: { room: Room; headingLevel?: 2 | 3 }) {
  const t = useTranslations('shared');
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="shadow-sand group relative flex h-full flex-col rounded-card bg-canvas p-3 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
    >
      <div className="relative aspect-landscape overflow-hidden rounded-img bg-canvasalt">
        <Image
          src={imgSrc(room.heroImage, 1000)}
          alt={room.imageAlt ?? `${room.roomType}${room.view ? `, ${room.view}` : ''}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
        <p className="absolute bottom-3 left-3 rounded-ctrl bg-canvas/95 px-4 py-2 font-body text-xs text-ink/80 backdrop-blur-sm">
          {t('from')} <span className="font-heading text-base font-semibold text-primary">£{room.rate}</span> {t('perNight')}
        </p>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <Heading className="font-heading text-2xl font-semibold text-primary">{room.roomType}</Heading>
        {/* Only set when a physical room has its own name, see lib/types.ts Room. */}
        {room.name && <p className="mt-1 font-body text-sm font-medium text-accent">{room.name}</p>}
        {room.hook && <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">{room.hook}</p>}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <ul className="flex flex-wrap gap-2 font-body text-xs text-ink/80">
            {room.sqm ? <li className="rounded-ctrl bg-canvasalt px-3 py-1.5">{room.sqm} {t('sqm')}</li> : null}
            <li className="rounded-ctrl bg-canvasalt px-3 py-1.5">{t('sleeps')} {room.occupancy}</li>
            {/* Display copy only: the booking engine owns availability. */}
            {room.roomCount != null && room.roomCount > 1 && (
              <li className="rounded-ctrl bg-canvasalt px-3 py-1.5">{t('roomsAvailable', { count: room.roomCount })}</li>
            )}
          </ul>
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accentfill font-body text-lg text-onaccent transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
          <span className="sr-only">{t('viewRoom')}</span>
        </div>
      </div>
    </Link>
  );
}
