import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from './SectionLabel';
import { FadeUp } from './Motion';

/**
 * Public review summary (hotelConfig.reviewSummary): the overall rating on
 * a named platform, the themes guests keep praising, and a link to read
 * the reviews at source. Deliberately not individual quotes — those need
 * genuine, dated reviews (lib/data.ts `testimonials`) — and not structured
 * data (seo.publishAggregateRating). Renders nothing when not configured.
 */
export default async function ReviewsBand() {
  const r = hotelConfig.reviewSummary;
  if (!r) return null;
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  return (
    <section className="border-t border-canvas/10 bg-primary">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <FadeUp>
          <SectionLabel variant="ondark">{t('reviewsLabel')}</SectionLabel>
          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-canvas md:text-5xl">
            {t('reviewsHeading', { rating: r.rating, source: r.source, count: r.countLabel })}
          </h2>
          {r.praise.length > 0 && (
            <>
              <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-canvas/75">
                {t('reviewsIntro')}
              </p>
              <ul className="mt-8 flex flex-wrap justify-center gap-3">
                {r.praise.map((p) => (
                  <li key={p.en} className="rounded-full border border-canvas/25 px-5 py-2 font-body text-sm text-canvas">
                    {pickLocale(p, locale)}
                  </li>
                ))}
              </ul>
            </>
          )}
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-11 items-center font-body text-2xs uppercase tracking-25 text-accentondark transition-colors hover:text-canvas"
          >
            {t('readReviews', { source: r.source })} →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
