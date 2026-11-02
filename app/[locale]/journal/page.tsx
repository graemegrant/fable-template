import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { JOURNAL_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts, IMG } from '@/lib/data';
import type { JournalPostI18n } from '@/lib/types';
import { resolveJournalPost } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@look/components/PageHero';
import JournalCard from '@look/components/JournalCard';
import { FadeUp, StaggerGrid, StaggerItem } from '@look/components/Motion';

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
  const t = await getTranslations('journalPage');
  const tSections = await getTranslations('journalSections');
  // Three-part journal (stories / what's on / neighbourhood) once posts use
  // more than one section; a single flat grid otherwise.
  const sectionOrder = ['story', 'event', 'neighbourhood'] as const;
  const groups = sectionOrder
    .map((section) => ({ section, posts: rest.filter((p) => (p.section ?? 'story') === section) }))
    .filter((g) => g.posts.length > 0);
  const grouped = new Set(posts.map((p) => p.section ?? 'story')).size > 1;

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.forest}
      />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {featured && (
          <FadeUp>
            <JournalCard post={featured} variant="featured" />
          </FadeUp>
        )}
        {grouped ? (
          groups.map((g) => (
            <div key={g.section} id={g.section} className="mt-20 scroll-mt-28">
              <h2 className="font-heading text-3xl font-medium text-ink">{tSections(g.section)}</h2>
              <StaggerGrid className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {g.posts.map((post) => (
                  <StaggerItem key={post.slug}><JournalCard post={post} /></StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          ))
        ) : (
          <StaggerGrid className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.slug}><JournalCard post={post} /></StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </section>
    </>
  );
}
