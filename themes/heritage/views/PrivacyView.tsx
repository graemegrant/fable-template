import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import { FadeUp } from '../components/Motion';
import type { PrivacyData } from '@/lib/pages/privacy';

/** Privacy page, Heritage look. Data comes from lib/pages/privacy.ts. */
export default async function PrivacyView({ values, sections }: { locale: Locale } & PrivacyData) {
  const t = await getTranslations('privacy');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.dining1} />
      <section className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <FadeUp>
          <p className="font-body text-xs uppercase tracking-20 text-ink/70">{t('updated', values)}</p>
          <div className="mt-10 space-y-12">
            {sections.map(([title, body]) => (
              <div key={title}>
                <h2 className="font-heading text-3xl font-medium text-ink">{title}</h2>
                <p className="mt-4 font-body text-base font-light leading-body text-ink/80">{body}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
