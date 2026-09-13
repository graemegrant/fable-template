import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { ROOMS_QUERY, EXPERIENCES_QUERY, JOURNAL_QUERY } from '@/lib/queries';
import {
  rooms as fallbackRooms,
  experiences as fallbackExperiences,
  journalPosts as fallbackPosts,
} from '@/lib/data';
import type { RoomI18n, ExperienceI18n, JournalPostI18n } from '@/lib/types';
import { LOCALES } from '@/lib/locales';

/** Every URL is emitted once per locale, each with alternates.languages
 *  cross-referencing the other locales for that same path — Google needs
 *  this to index each language version as its own page, not a duplicate. */
function withLocales(
  path: string,
  extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>,
): MetadataRoute.Sitemap {
  const base = hotelConfig.siteUrl;
  const languages = Object.fromEntries(LOCALES.map((l) => [l.id, `${base}/${l.id}${path}`]));
  return LOCALES.map((l) => ({
    url: `${base}/${l.id}${path}`,
    ...extra,
    alternates: { languages },
  }));
}

/** Built from the CMS with the static data as fallback, so a room /
 *  experience / post authored only in Sanity still appears. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rooms, experiences, posts] = await Promise.all([
    sanityFetch<RoomI18n[]>(ROOMS_QUERY, {}, fallbackRooms),
    sanityFetch<ExperienceI18n[]>(EXPERIENCES_QUERY, {}, fallbackExperiences),
    sanityFetch<JournalPostI18n[]>(JOURNAL_QUERY, {}, fallbackPosts),
  ]);

  const now = new Date();
  const staticRoutes = [
    '', '/rooms', '/dining', '/experiences', '/weddings', '/offers',
    '/journal', '/about', '/contact', '/location', '/gift-vouchers',
  ].flatMap((path) =>
    withLocales(path, {
      lastModified: now,
      changeFrequency: 'weekly',
      priority: path === '' ? 1 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...rooms.flatMap((r) =>
      withLocales(`/rooms/${r.slug}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.7 }),
    ),
    ...experiences.flatMap((e) =>
      withLocales(`/experiences/${e.slug}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 }),
    ),
    ...posts.flatMap((p) =>
      withLocales(`/journal/${p.slug}`, {
        lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
        changeFrequency: 'monthly',
        priority: 0.5,
      }),
    ),
  ];
}
