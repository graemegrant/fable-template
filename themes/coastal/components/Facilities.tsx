import { getLocale, getTranslations } from 'next-intl/server';
import { facilities } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from './SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from './Motion';

/** Hotel facilities at a glance as rounded tiles, from lib/data.ts
 *  `facilities`: keep to things that are actually true for the client.
 *  Renders nothing when the list is empty. Used on the homepage and the
 *  about page. */
export default async function Facilities() {
  if (!facilities.length) return null;
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <FadeUp className="text-center">
        <SectionLabel>{t('facilitiesLabel')}</SectionLabel>
        <h2 className="mx-auto mt-5 max-w-2xl font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">
          {t('facilitiesHeading')}
        </h2>
      </FadeUp>
      <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f, i) => (
          <StaggerItem key={f.title.en} className="h-full">
            <div className="flex h-full gap-5 rounded-card bg-canvasalt p-6 sm:p-7">
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-canvas font-heading text-lg font-semibold text-accent"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold text-primary">{pickLocale(f.title, locale)}</h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/80">{pickLocale(f.detail, locale)}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
