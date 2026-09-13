import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { JOURNAL_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts, IMG } from '@/lib/data';
import type { JournalPostI18n } from '@/lib/types';
import { resolveJournalPost } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import JournalCard from '@/components/JournalCard';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Journal',
    description: `Notes from ${hotelConfig.name}: the garden, the glen, the kitchen and the people who keep the house.`,
    path: '/journal',
  });
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawPosts = await sanityFetch<JournalPostI18n[]>(JOURNAL_QUERY, {}, fallbackPosts);
  const posts = rawPosts.map((p) => resolveJournalPost(p, locale));
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
