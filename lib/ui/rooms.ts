import type { Room } from '@/lib/types';

/**
 * Room filter tabs, shared by every look. roomType is free text
 * (SANITY-SCHEMA.md), so the tabs come from the categories actually present,
 * in order of first appearance. A filter with one tab per room (every
 * roomType unique, e.g. individually named rooms) groups nothing, so
 * `showFilter` is false then.
 */
export function roomFilter(rooms: Room[], active: string) {
  const distinctTypes = Array.from(new Set(rooms.map((r) => r.roomType)));
  return {
    types: ['All', ...distinctTypes],
    showFilter: distinctTypes.length < rooms.length,
    filtered: active === 'All' ? rooms : rooms.filter((r) => r.roomType === active),
  };
}
