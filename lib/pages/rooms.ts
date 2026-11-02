import { sanityFetch } from '@/lib/sanity';
import { ROOMS_QUERY } from '@/lib/queries';
import { rooms as fallbackRooms } from '@/lib/data';
import type { RoomI18n } from '@/lib/types';
import { resolveRoom } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


/** Data for the Rooms page, shared by every look. */
export async function loadRooms(locale: Locale) {
  const rawRooms = await sanityFetch<RoomI18n[]>(ROOMS_QUERY, {}, fallbackRooms);
  const rooms = rawRooms.map((r) => resolveRoom(r, locale));
  const showSize = rooms.some((r) => r.sqm);
  return { rooms, showSize };
}

export type RoomsData = Awaited<ReturnType<typeof loadRooms>>;
