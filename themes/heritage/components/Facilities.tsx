import { getLocale, getTranslations } from 'next-intl/server';
import { facilities } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from './SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from './Motion';

/** Hotel facilities at a glance, from lib/data.ts `facilities` — keep to
 *  things that are actually true for the client. Renders nothing when the
 *  list is empty. Used on the homepage and the about page. */
export default async function Facilities() {
  if (!facilities.length) return null;
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  return (
    <section className="bg-canvasalt">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <FadeUp>
          <SectionLabel>{t('facilitiesLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('facilitiesHeading')}</h2>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <StaggerItem key={f.title.en} className="h-full">
              <div className="h-full rounded-card border border-ink/10 bg-canvas p-8">
                <span className="block h-px w-8 bg-accent" aria-hidden />
                <h3 className="mt-5 font-heading text-xl font-medium text-ink">{pickLocale(f.title, locale)}</h3>
                <p className="mt-2 font-body text-sm font-light leading-relaxed text-ink/75">{pickLocale(f.detail, locale)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
