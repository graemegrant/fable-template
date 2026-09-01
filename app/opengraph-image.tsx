import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${hotelConfig.name} — ${hotelConfig.seo.descriptor} in ${hotelConfig.seo.locationLabel}`;

export default function OpengraphImage() {
  return renderOgImage({
    title: hotelConfig.name,
    footer: hotelConfig.tagline,
  });
}
