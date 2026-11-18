'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { StaggerGrid, StaggerItem } from './Motion';
import RoomCard from './RoomCard';
import type { Room } from '@/lib/types';
import { roomFilter } from '@/lib/ui/rooms';

/** Room-type tabs as a mono index with counts, then the room cards. Tabs
 *  and filtering are shared (lib/ui/rooms.ts). */
export default function RoomsFilter({ rooms }: { rooms: Room[] }) {
  const t = useTranslations('shared');
  const [active, setActive] = useState<string>('All');
  const { types, showFilter, filtered } = roomFilter(rooms, active);

  return (
    <div>
      {showFilter && (
        <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          <div className="inline-flex border border-canvas/15" role="tablist" aria-label={t('filterRoomsAriaLabel')}>
            {types.map((ty) => (
              <button
                key={ty}
                type="button"
                role="tab"
                aria-selected={active === ty}
                onClick={() => setActive(ty)}
                className={`inline-flex min-h-12 items-center gap-3 whitespace-nowrap border-r border-canvas/15 px-5 font-mono text-xs uppercase tracking-18 transition-colors last:border-r-0 ${
                  active === ty ? 'bg-canvas text-ink' : 'text-canvas/80 hover:text-canvas'
                }`}
              >
                {ty === 'All' ? t('allRoomTypes') : ty}
                <span className={active === ty ? 'text-accent' : 'text-accentondark'}>
                  {String(ty === 'All' ? rooms.length : rooms.filter((r) => r.roomType === ty).length).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <StaggerGrid key={active} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((room) => (
          <StaggerItem key={room.slug} className="h-full">
            <RoomCard room={room} headingLevel={2} />
          </StaggerItem>
        ))}
      </StaggerGrid>
      {filtered.length === 0 && <p className="mt-10 font-body text-base text-canvas/80">{t('noRoomsOfType')}</p>}
    </div>
  );
}
