import { getLocale, getTranslations } from 'next-intl/server';
import { facilities } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from './SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from './Motion';

/** Hotel facilities at a glance as a numbered index, from lib/data.ts
 *  `facilities`: keep to things that are actually true for the client.
 *  Renders nothing when the list is empty. Used on the homepage and the
 *  about page. */
export default async function Facilities() {
  if (!facilities.length) return null;
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <FadeUp className="lg:col-span-4">
          <SectionLabel>{t('facilitiesLabel')}</SectionLabel>
          <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-6xl">
            {t('facilitiesHeading')}
          </h2>
        </FadeUp>
        <StaggerGrid className="grid border-t border-canvas/15 sm:grid-cols-2 lg:col-span-8">
          {facilities.map((f, i) => (
            <StaggerItem key={f.title.en} className="h-full">
              <div className={`flex h-full gap-5 border-b border-canvas/15 py-6 sm:pr-6 ${i % 2 === 1 ? 'sm:border-l sm:pl-6' : ''}`}>
                <span className="font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-heading text-lg font-bold uppercase leading-tight text-canvas">{pickLocale(f.title, locale)}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-canvas/80">{pickLocale(f.detail, locale)}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
