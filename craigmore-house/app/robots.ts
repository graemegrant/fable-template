import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api'] }],
    sitemap: `${hotelConfig.siteUrl}/sitemap.xml`,
  };
}
