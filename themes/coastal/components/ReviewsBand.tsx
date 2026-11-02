import { getLocale, getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from './SectionLabel';
import { FadeUp } from './Motion';

/**
 * Public review summary (hotelConfig.reviewSummary) on a sea-glass panel:
 * the overall rating on a named platform, the themes guests keep praising,
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
    <section className="px-3 py-6 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-card bg-accentondark/35 px-6 py-20 text-center lg:py-24">
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel variant="raised">{t('reviewsLabel')}</SectionLabel>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">
            {t('reviewsHeading', { rating: r.rating, source: r.source, count: r.countLabel })}
          </h2>
          {r.praise.length > 0 && (
            <>
              <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-ink/85">{t('reviewsIntro')}</p>
              <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                {r.praise.map((p) => (
                  <li key={p.en} className="shadow-sand rounded-ctrl bg-canvas px-5 py-2.5 font-body text-sm text-primary">
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
            className="mt-10 inline-flex min-h-12 items-center rounded-ctrl bg-primary px-7 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t('readReviews', { source: r.source })} →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
