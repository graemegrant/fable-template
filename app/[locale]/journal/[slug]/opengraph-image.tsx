import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { sanityFetch } from '@/lib/sanity';
import { JOURNAL_BY_SLUG_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts } from '@/lib/data';
import type { JournalPostI18n } from '@/lib/types';
import { resolveJournalPost } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `From the journal — ${hotelConfig.name}`;

export function generateStaticParams() {
  return LOCALE_IDS.flatMap((locale) => fallbackPosts.map((p) => ({ locale, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawPost = await sanityFetch<JournalPostI18n | null>(
    JOURNAL_BY_SLUG_QUERY,
    { slug },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  );
  const post = rawPost ? resolveJournalPost(rawPost, locale) : null;
  return renderOgImage({
    eyebrow: post ? `Journal · ${post.category}` : 'Journal',
    title: post ? post.title : 'From the house',
    footer: post ? post.author : undefined,
  });
}
