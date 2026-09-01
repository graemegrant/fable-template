import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { sanityFetch } from '@/lib/sanity';
import { JOURNAL_BY_SLUG_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts } from '@/lib/data';
import type { JournalPost } from '@/lib/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `From the journal — ${hotelConfig.name}`;

export function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<JournalPost | null>(
    JOURNAL_BY_SLUG_QUERY,
    { slug },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  );
  return renderOgImage({
    eyebrow: post ? `Journal · ${post.category}` : 'Journal',
    title: post ? post.title : 'From the house',
    footer: post ? post.author : undefined,
  });
}
