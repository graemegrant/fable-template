'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { StaggerGrid, StaggerItem } from './Motion';
import RoomCard from './RoomCard';
import type { Room } from '@/lib/types';

const TYPES = ['All', 'Classic', 'Deluxe', 'Suite'] as const;

export default function RoomsFilter({ rooms }: { rooms: Room[] }) {
  const t = useTranslations('shared');
  const [active, setActive] = useState<(typeof TYPES)[number]>('All');
  const filtered = active === 'All' ? rooms : rooms.filter((r) => r.type === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-8" role="tablist" aria-label={t('filterRoomsAriaLabel')}>
        {TYPES.map((ty) => (
          <button
            key={ty}
            type="button"
            role="tab"
            aria-selected={active === ty}
            onClick={() => setActive(ty)}
            className={`px-6 py-3 font-body text-2xs uppercase tracking-25 transition-colors duration-300 ${
              active === ty ? 'bg-forest text-parchment' : 'text-ink/60 hover:text-forest'
            }`}
          >
            {ty === 'All' ? t('allRoomTypes') : ty}
            <span className="ml-2 text-3xs opacity-60">
              {ty === 'All' ? rooms.length : rooms.filter((r) => r.type === ty).length}
            </span>
          </button>
        ))}
      </div>

      <StaggerGrid key={active} className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((room) => (
          <StaggerItem key={room.slug}>
            <RoomCard room={room} />
          </StaggerItem>
        ))}
      </StaggerGrid>
      {filtered.length === 0 && (
        <p className="mt-12 font-body text-sm text-ink/60">{t('noRoomsOfType')}</p>
      )}
    </div>
  );
}
