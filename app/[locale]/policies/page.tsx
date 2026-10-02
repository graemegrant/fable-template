import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { IMG, policies } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

/*
 * "Good to know" — hotel information and policies in plain language: the
 * page guests (and AI assistants) look for before booking. Content comes
 * from lib/data.ts `policies`; write each client's from their real
 * policies, never assumed ones (AGENTS.md §4).
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Good to Know: Hotel Information & Policies',
    description: `Hotel information for ${hotelConfig.name}, ${hotelConfig.location.locality}: check-in from ${pickLocale(hotelConfig.checkIn, locale)}, check-out by ${pickLocale(hotelConfig.checkOut, locale)}, parking, cancellations, children, dogs and accessibility.`,
    path: '/policies',
  });
}

export default async function PoliciesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
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
