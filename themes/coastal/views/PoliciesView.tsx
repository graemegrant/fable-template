import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG, policies } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '@look/components/PageHero';
import { FadeUp, StaggerGrid, StaggerItem } from '@look/components/Motion';

/** Policies page, Heritage look. Data comes from lib/pages/policies.ts. */
export default async function PoliciesView({ locale }: { locale: Locale }) {
  const t = await getTranslations('policies');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.room2} />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-body text-ink/80">
            {t('intro')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="text-primary underline decoration-accent underline-offset-4">
              {hotelConfig.contact.phone}
            </a>
          </p>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-6 md:grid-cols-2">
          {policies.map((p) => (
            <StaggerItem key={p.title.en} className="h-full">
              <article className="h-full rounded-card border border-ink/10 bg-canvasalt p-8">
                <h2 className="font-heading text-2xl font-medium text-ink">{pickLocale(p.title, locale)}</h2>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink/80">{pickLocale(p.body, locale)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
