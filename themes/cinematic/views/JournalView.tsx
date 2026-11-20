import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import DayPage from '../components/day/DayPage';
import JournalCard from '../components/JournalCard';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { JournalData } from '@/lib/pages/journal';

/** Journal page, Cinematic look. Data comes from lib/pages/journal.ts. */
export default async function JournalView({ featured, rest, groups, grouped }: { locale: Locale } & JournalData) {
  const t = await getTranslations('journalPage');
  const d = await getTranslations('day');
  const tSections = await getTranslations('journalSections');
  return (
    <DayPage light="night" time="22:00" label={d('night')}>
      <PageHero light="night" hour={{ time: '22:00', label: d('night') }} eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.forest} />
      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-16 lg:py-24">
        {featured && (
          <FadeUp>
            <JournalCard post={featured} variant="featured" />
          </FadeUp>
        )}
        {grouped ? (
          <>
            {/* Jump links to each section, as a mono contents line */}
            <nav aria-label={t('title')} className="glass mt-12 inline-flex flex-wrap gap-1 rounded-card p-1">
              {groups.map((g, i) => (
                <a
                  key={g.section}
                  href={`#${g.section}`}
                  className="inline-flex min-h-12 items-center gap-3 rounded-ctrl px-5 font-mono text-xs uppercase tracking-18 text-canvas transition-colors hover:bg-canvas hover:text-ink"
                >
                  <span className="text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                  {tSections(g.section)}
                </a>
              ))}
            </nav>
            {groups.map((g, i) => (
              <div key={g.section} id={g.section} className="mt-16 scroll-mt-24">
                <h2 className="flex items-baseline gap-4 border-b border-canvas/15 pb-6 font-heading text-4xl font-normal leading-none text-canvas md:text-6xl">
                  <span className="font-mono text-sm font-normal text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                  {tSections(g.section)}
                </h2>
                <StaggerGrid className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
          <StaggerGrid className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <JournalCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </section>
    </DayPage>
  );
}
