'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { StaggerGrid, StaggerItem } from './Motion';
import RoomCard from './RoomCard';
import type { Room } from '@/lib/types';

export default function RoomsFilter({ rooms }: { rooms: Room[] }) {
  const t = useTranslations('shared');
  /* roomType is free text (SANITY-SCHEMA.md), not a fixed enum, so the tab
     list has to come from whatever categories are actually present in this
     client's data rather than a hardcoded Classic/Deluxe/Suite list —
     otherwise the filter shows tabs that don't match the client's real
     categories at all. Order preserved by first appearance for stability. */
  const distinctTypes = Array.from(new Set(rooms.map((r) => r.roomType)));
  const types = ['All', ...distinctTypes];
  const [active, setActive] = useState<string>('All');
  const filtered = active === 'All' ? rooms : rooms.filter((r) => r.roomType === active);
  /* A filter with one tab per room (every roomType unique — the
     named-room edge case, e.g. Craigmore's own 6 individually-named
     rooms) groups nothing and adds no value, so skip rendering it
     entirely rather than show a tab per room. */
  const showFilter = distinctTypes.length < rooms.length;

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-8" role="tablist" aria-label={t('filterRoomsAriaLabel')}>
          {types.map((ty) => (
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
                {ty === 'All' ? rooms.length : rooms.filter((r) => r.roomType === ty).length}
              </span>
            </button>
          ))}
        </div>
      )}

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
