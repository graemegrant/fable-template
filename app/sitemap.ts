import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';
import { rooms, experiences, journalPosts } from '@/lib/data';

/** Sitemap is built from static data only, per the SEO architecture rule. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = hotelConfig.siteUrl;
  const staticRoutes = [
    '', '/rooms', '/dining', '/experiences', '/weddings', '/offers',
    '/journal', '/about', '/contact', '/location', '/gift-vouchers',
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...rooms.map((r) => ({ url: `${base}/rooms/${r.slug}`, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...experiences.map((e) => ({ url: `${base}/experiences/${e.slug}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...journalPosts.map((p) => ({ url: `${base}/journal/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.5 })),
  ];
}
