'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { StaggerGrid, StaggerItem } from './Motion';
import RoomCard from './RoomCard';
import type { Room } from '@/lib/types';
import { roomFilter } from '@/lib/ui/rooms';

/** Room-type tabs as a pill switch, then the room cards. Tabs and
 *  filtering are shared (lib/ui/rooms.ts). */
export default function RoomsFilter({ rooms }: { rooms: Room[] }) {
  const t = useTranslations('shared');
  const [active, setActive] = useState<string>('All');
  const { types, showFilter, filtered } = roomFilter(rooms, active);

  return (
    <div>
      {showFilter && (
        <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <div className="inline-flex gap-1 rounded-ctrl bg-canvasalt p-1.5" role="tablist" aria-label={t('filterRoomsAriaLabel')}>
            {types.map((ty) => (
              <button
                key={ty}
                type="button"
                role="tab"
                aria-selected={active === ty}
                onClick={() => setActive(ty)}
                className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-ctrl px-5 font-body text-sm font-medium transition-colors duration-300 ${
                  active === ty ? 'bg-primary text-canvas' : 'text-ink/80 hover:text-primary'
                }`}
              >
                {ty === 'All' ? t('allRoomTypes') : ty}
                <span className={`rounded-full px-2 py-0.5 text-xs ${active === ty ? 'bg-canvas/15' : 'bg-canvas'}`}>
                  {ty === 'All' ? rooms.length : rooms.filter((r) => r.roomType === ty).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <StaggerGrid key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((room) => (
          <StaggerItem key={room.slug} className="h-full">
            <RoomCard room={room} headingLevel={2} />
          </StaggerItem>
        ))}
      </StaggerGrid>
      {filtered.length === 0 && <p className="mt-10 font-body text-base text-ink/80">{t('noRoomsOfType')}</p>}
    </div>
  );
}
