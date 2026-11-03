import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import { FadeUp } from '../components/Motion';
import type { PrivacyData } from '@/lib/pages/privacy';

/** Privacy page, Coastal look. Data comes from lib/pages/privacy.ts. */
export default async function PrivacyView({ values, sections }: { locale: Locale } & PrivacyData) {
  const t = await getTranslations('privacy');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.dining1} />
      <section className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <FadeUp>
          <p className="inline-flex rounded-ctrl bg-canvasalt px-4 py-2 font-body text-sm text-ink/80">{t('updated', values)}</p>
          <div className="mt-10 space-y-4">
            {sections.map(([title, body]) => (
              <div key={title} className="shadow-sand rounded-card bg-canvas p-7">
                <h2 className="font-heading text-2xl font-semibold text-primary md:text-3xl">{title}</h2>
                <p className="mt-3 font-body text-base leading-body text-ink/85">{body}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
