import { hotelConfig } from '@/hotel.config';

const mapQuery = encodeURIComponent(`${hotelConfig.name}, ${hotelConfig.location.address}`);
const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

/** Data for the Location page, shared by every look. */
export async function loadLocation() {
  return { mapSrc, directionsUrl };
}

export type LocationData = Awaited<ReturnType<typeof loadLocation>>;
