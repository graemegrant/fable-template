import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import { FadeUp } from '../components/Motion';
import type { PrivacyData } from '@/lib/pages/privacy';

/** Privacy page, Urban look. Data comes from lib/pages/privacy.ts. */
export default async function PrivacyView({ values, sections }: { locale: Locale } & PrivacyData) {
  const t = await getTranslations('privacy');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.dining1} />
      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <FadeUp className="grid gap-10 lg:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-18 text-canvas/70 lg:col-span-3">{t('updated', values)}</p>
          <div className="border-t border-canvas/15 lg:col-span-8">
            {sections.map(([title, body], i) => (
              <div key={title} className="grid gap-4 border-b border-canvas/15 py-8 sm:grid-cols-12">
                <span className="font-mono text-xs text-accentondark sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="sm:col-span-11">
                  <h2 className="font-heading text-xl font-bold uppercase leading-tight text-canvas">{title}</h2>
                  <p className="mt-3 font-body text-base leading-body text-canvas/85">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
