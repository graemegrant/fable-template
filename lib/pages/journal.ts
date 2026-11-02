import { sanityFetch } from '@/lib/sanity';
import { JOURNAL_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts } from '@/lib/data';
import type { JournalPostI18n } from '@/lib/types';
import { resolveJournalPost } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


/** Data for the Journal page, shared by every look. */
export async function loadJournal(locale: Locale) {
  const rawPosts = await sanityFetch<JournalPostI18n[]>(JOURNAL_QUERY, {}, fallbackPosts);
  const posts = rawPosts.map((p) => resolveJournalPost(p, locale));
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);
// Three-part journal (stories / what's on / neighbourhood) once posts use
// more than one section; a single flat grid otherwise.
  const sectionOrder = ['story', 'event', 'neighbourhood'] as const;
  const groups = sectionOrder
    .map((section) => ({ section, posts: rest.filter((p) => (p.section ?? 'story') === section) }))
    .filter((g) => g.posts.length > 0);
  const grouped = new Set(posts.map((p) => p.section ?? 'story')).size > 1;
  return { featured, rest, groups, grouped };
}

export type JournalData = Awaited<ReturnType<typeof loadJournal>>;
