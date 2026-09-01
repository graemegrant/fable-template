import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: hotelConfig.name,
    short_name: hotelConfig.name.replace(/^The\s+/, ''),
    description: hotelConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: palette.parchment,
    theme_color: palette.forest,
    icons: [
      { src: '/icon', type: 'image/png', sizes: '512x512' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
