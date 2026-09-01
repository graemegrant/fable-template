import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { ROOMS_QUERY, EXPERIENCES_QUERY, JOURNAL_QUERY } from '@/lib/queries';
import {
  rooms as fallbackRooms,
  experiences as fallbackExperiences,
  journalPosts as fallbackPosts,
} from '@/lib/data';
import type { Room, Experience, JournalPost } from '@/lib/types';

/** Built from the CMS with the static data as fallback, so a room /
 *  experience / post authored only in Sanity still appears. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = hotelConfig.siteUrl;

  const [rooms, experiences, posts] = await Promise.all([
    sanityFetch<Room[]>(ROOMS_QUERY, {}, fallbackRooms),
    sanityFetch<Experience[]>(EXPERIENCES_QUERY, {}, fallbackExperiences),
    sanityFetch<JournalPost[]>(JOURNAL_QUERY, {}, fallbackPosts),
  ]);

  const now = new Date();
  const staticRoutes = [
    '', '/rooms', '/dining', '/experiences', '/weddings', '/offers',
    '/journal', '/about', '/contact', '/location', '/gift-vouchers',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...rooms.map((r) => ({
      url: `${base}/rooms/${r.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...experiences.map((e) => ({
      url: `${base}/experiences/${e.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${base}/journal/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
