import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';
import { pickLocale } from '@/lib/resolveLocale';
import { DEFAULT_LOCALE } from '@/lib/locales';

// A manifest is a single global document (not locale-routed), so it
// always reflects the default locale — same treatment as /llms.txt.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: hotelConfig.name,
    short_name: hotelConfig.name.replace(/^The\s+/, ''),
    description: pickLocale(hotelConfig.description, DEFAULT_LOCALE),
    start_url: `/${DEFAULT_LOCALE}`,
    display: 'standalone',
    background_color: palette.parchment,
    theme_color: palette.forest,
    icons: [
      { src: '/icon', type: 'image/png', sizes: '512x512' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
