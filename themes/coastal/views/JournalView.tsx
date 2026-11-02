import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import JournalCard from '../components/JournalCard';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { JournalData } from '@/lib/pages/journal';

/** Journal page, Coastal look. Data comes from lib/pages/journal.ts. */
export default async function JournalView({ featured, rest, groups, grouped }: { locale: Locale } & JournalData) {
  const t = await getTranslations('journalPage');
  const tSections = await getTranslations('journalSections');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.forest} />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        {featured && (
          <FadeUp>
            <JournalCard post={featured} variant="featured" />
          </FadeUp>
        )}
        {grouped ? (
          <>
            {/* Jump links to each section, as pills */}
            <nav aria-label={t('title')} className="mt-12 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a
                  key={g.section}
                  href={`#${g.section}`}
                  className="inline-flex min-h-11 items-center rounded-ctrl bg-canvasalt px-5 font-body text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-canvas"
                >
                  {tSections(g.section)}
                </a>
              ))}
            </nav>
            {groups.map((g) => (
              <div key={g.section} id={g.section} className="mt-16 scroll-mt-28">
                <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">{tSections(g.section)}</h2>
                <StaggerGrid className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {g.posts.map((post) => (
                    <StaggerItem key={post.slug} className="h-full">
                      <JournalCard post={post} />
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            ))}
          </>
        ) : (
          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <JournalCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </section>
    </>
  );
}
