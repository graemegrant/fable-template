import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '@look/components/PageHero';
import JournalCard from '@look/components/JournalCard';
import { FadeUp, StaggerGrid, StaggerItem } from '@look/components/Motion';
import type { JournalData } from '@/lib/pages/journal';

/** Journal page, Heritage look. Data comes from lib/pages/journal.ts. */
export default async function JournalView({ featured, rest, groups, grouped }: { locale: Locale } & JournalData) {
  const t = await getTranslations('journalPage');
  const tSections = await getTranslations('journalSections');
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
