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
export default function RoomCard({ room }: { room: Room }) {
  const t = useTranslations('shared');
  return (
    <Link href={`/rooms/${room.slug}`} className="group block">
      <div className="relative aspect-portrait overflow-hidden rounded-img bg-warmgrey">
        <Image
          src={imgSrc(room.heroImage, 1000)}
          alt={room.imageAlt ?? `${room.name} — ${room.view ?? `${room.type} room`}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
        <span className="absolute left-0 top-6 bg-forest px-4 py-2 font-body text-3xs uppercase tracking-25 text-parchment">
          {room.type}
        </span>
      </div>
      <div className="pt-6">
        <h3 className="font-heading text-2xl font-medium text-ink">{room.name}</h3>
        <p className="mt-2 font-body text-xs uppercase tracking-20 text-ink/60">
          {room.sqm} {t('sqm')} · {t('sleeps')} {room.occupancy}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <p className="font-body text-sm text-ink/80">
            {t('from')} <span className="font-heading text-xl text-forest">£{room.rate}</span> {t('perNight')}
          </p>
          <span className="font-body text-2xs uppercase tracking-20 text-gold transition-colors group-hover:text-forest">
            {t('viewRoom')}
          </span>
        </div>
      </div>
    </Link>
  );
}
