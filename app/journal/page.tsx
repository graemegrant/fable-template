import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { JOURNAL_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts, IMG } from '@/lib/data';
import type { JournalPost } from '@/lib/types';
import PageHero from '@/components/PageHero';
import JournalCard from '@/components/JournalCard';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata = pageMetadata({
  title: 'Journal',
  description: `Notes from ${hotelConfig.name}: the garden, the glen, the kitchen and the people who keep the house.`,
  path: '/journal',
});

export default async function JournalPage() {
  const posts = await sanityFetch<JournalPost[]>(JOURNAL_QUERY, {}, fallbackPosts);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <PageHero
        eyebrow="The journal"
        title="Notes from the glen"
        subtitle="The garden, the kitchen, the hill and the house — written by the people who keep them."
        image={IMG.forest}
      />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {featured && (
          <FadeUp>
            <JournalCard post={featured} variant="featured" />
          </FadeUp>
        )}
        <StaggerGrid className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <StaggerItem key={post.slug}><JournalCard post={post} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
