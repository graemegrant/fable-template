import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from './SectionLabel';
import { FadeUp } from './Motion';

/**
 * Public review summary (hotelConfig.reviewSummary) on a glass panel: the
 * overall rating on a named platform, the themes guests keep praising,
 * and a link to read the reviews at source. Deliberately not individual
 * quotes (those need genuine, dated reviews in lib/data.ts `testimonials`)
 * and not structured data (seo.publishAggregateRating). Renders nothing
 * when not configured.
 */
export default async function ReviewsBand() {
  const r = hotelConfig.reviewSummary;
  if (!r) return null;
  const t = await getTranslations('shared');
  const locale = (await getLocale()) as Locale;
  return (
    <section className="px-2 py-12 lg:px-3 lg:py-20">
      <FadeUp className="glass mx-auto grid max-w-screen-2xl gap-10 rounded-card px-6 py-14 text-canvas lg:grid-cols-12 lg:px-12 lg:py-20">
        <div className="lg:col-span-7">
          <SectionLabel>{t('reviewsLabel')}</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl font-normal leading-none md:text-7xl">
            {t('reviewsHeading', { rating: r.rating, source: r.source, count: r.countLabel })}
          </h2>
        </div>
        <div className="lg:col-span-5 lg:pt-10">
          {r.praise.length > 0 && (
            <>
              <p className="font-body text-base leading-relaxed text-canvas/80">{t('reviewsIntro')}</p>
              <ul className="mt-6 border-t border-canvas/15">
                {r.praise.map((p) => (
                  <li key={p.en} className="border-b border-canvas/15 py-3 font-mono text-sm uppercase tracking-18">
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
            className="mt-8 inline-flex min-h-14 items-center gap-6 rounded-ctrl bg-canvas px-7 font-mono text-sm uppercase tracking-18 text-ink transition-colors hover:bg-accentfill"
          >
            {t('readReviews', { source: r.source })} <span aria-hidden>↗</span>
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
