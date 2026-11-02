import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { JOURNAL_BY_SLUG_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts } from '@/lib/data';
import type { JournalPostI18n } from '@/lib/types';
import { resolveJournalPost } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';
import JournalPostView from '@look/views/JournalPostView';
import { loadJournalPost } from '@/lib/pages/journalPost';

export const revalidate = 600;

export function generateStaticParams() {
  return LOCALE_IDS.flatMap((locale) => fallbackPosts.map((p) => ({ locale, slug: p.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawPost = await sanityFetch<JournalPostI18n | null>(
    JOURNAL_BY_SLUG_QUERY,
    { slug },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  );
  if (!rawPost) return { title: 'Journal' };
  const post = resolveJournalPost(rawPost, locale);
  return pageMetadata({
    locale,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/journal/${post.slug}`,
    image: `/journal/${post.slug}/opengraph-image`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
  });
}

export default async function JournalPostPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadJournalPost(locale, slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbs) }} />
      {data.eventSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <JournalPostView locale={locale} {...data} />
    </>
  );
}
