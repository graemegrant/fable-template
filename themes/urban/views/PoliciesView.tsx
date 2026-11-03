import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG, policies } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';

/** Policies page, Coastal look. Data comes from lib/pages/policies.ts. */
export default async function PoliciesView({ locale }: { locale: Locale }) {
  const t = await getTranslations('policies');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.room2} />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <FadeUp className="rounded-card bg-accentondark/35 p-6 sm:px-8">
          <p className="max-w-3xl font-body text-lg leading-body text-ink/85">
            {t('intro')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-semibold text-primary underline decoration-accent underline-offset-4">
              {hotelConfig.contact.phone}
            </a>
          </p>
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-2">
          {policies.map((p) => (
            <StaggerItem key={p.title.en} className="h-full">
              <article className="shadow-sand h-full rounded-card bg-canvas p-7">
                <h2 className="font-heading text-2xl font-semibold text-primary">{pickLocale(p.title, locale)}</h2>
                <p className="mt-3 font-body text-base leading-relaxed text-ink/80">{pickLocale(p.body, locale)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
