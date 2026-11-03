import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG, policies } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';

/** Policies page, Urban look. Data comes from lib/pages/policies.ts. */
export default async function PoliciesView({ locale }: { locale: Locale }) {
  const t = await getTranslations('policies');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.room2} />

      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <FadeUp>
          <p className="max-w-3xl border-l-2 border-accentondark pl-6 font-body text-xl leading-snug text-canvas">
            {t('intro')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-mono underline decoration-accentondark underline-offset-4">
              {hotelConfig.contact.phone}
            </a>
          </p>
        </FadeUp>
        <StaggerGrid className="mt-14 grid border-t border-canvas/15 md:grid-cols-2">
          {policies.map((p, i) => (
            <StaggerItem key={p.title.en} className="h-full">
              <article className={`flex h-full gap-5 border-b border-canvas/15 py-8 md:pr-8 ${i % 2 === 1 ? 'md:border-l md:pl-8' : ''}`}>
                <span className="font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-heading text-xl font-bold uppercase leading-tight text-canvas">{pickLocale(p.title, locale)}</h2>
                  <p className="mt-3 font-body text-base leading-relaxed text-canvas/80">{pickLocale(p.body, locale)}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
