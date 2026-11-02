import { notFound } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch, imgSrc } from '@/lib/sanity';
import { breadcrumbList } from '@/lib/schema';
import { JOURNAL_BY_SLUG_QUERY, FEATURED_ROOMS_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts, rooms as fallbackRooms } from '@/lib/data';
import type { JournalPostI18n, RoomI18n } from '@/lib/types';
import { resolveJournalPost, resolveRoom } from '@/lib/resolveLocale';
import { bcp47For, type Locale } from '@/lib/locales';


/** Data for the JournalPost page, shared by every look. */
export async function loadJournalPost(locale: Locale, slug: string) {
  const rawPost = await sanityFetch<JournalPostI18n | null>(
    JOURNAL_BY_SLUG_QUERY,
    { slug },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  );
  if (!rawPost) notFound();
  const post = resolveJournalPost(rawPost, locale);
  const rawFeaturedRooms = await sanityFetch<RoomI18n[]>(
    FEATURED_ROOMS_QUERY, {}, fallbackRooms.filter((r) => r.featured).slice(0, 3),
  );
  const featuredRoom = rawFeaturedRooms[0] ? resolveRoom(rawFeaturedRooms[0], locale) : undefined;
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imgSrc(post.heroImage, 1200)],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: bcp47For(locale),
    author: { '@type': 'Person', name: post.author, url: `${hotelConfig.siteUrl}/${locale}/about` },
    publisher: {
      '@type': 'Organization',
      name: hotelConfig.name,
      url: hotelConfig.siteUrl,
      logo: { '@type': 'ImageObject', url: `${hotelConfig.siteUrl}/icon` },
    },
    url: `${hotelConfig.siteUrl}/${locale}/journal/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${hotelConfig.siteUrl}/${locale}/journal/${post.slug}`,
    },
  };
// What's on posts: one schema.org Event per listed event.
  const eventSchemas = (post.events ?? []).map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    startDate: e.startDate,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    ...(e.venue ? { location: { '@type': 'Place', name: e.venue } } : {}),
    ...(e.url ? { url: e.url } : {}),
  }));
  const ctaHref = post.cta?.url || undefined;
  const ctaExternal = Boolean(ctaHref && /^https?:\/\//.test(ctaHref));
  const breadcrumbs = breadcrumbList([
    ['Home', '/'],
    ['Journal', '/journal'],
    [post.title, `/journal/${post.slug}`],
  ], locale);
  return { post, featuredRoom, blogSchema, eventSchemas, ctaHref, ctaExternal, breadcrumbs };
}

export type JournalPostData = Awaited<ReturnType<typeof loadJournalPost>>;
