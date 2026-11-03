'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { exploreLinks, visitLinks, useNewsletterForm } from '@/lib/ui/footer';

function NewsletterForm() {
  const t = useTranslations('footer');
  const { email, setEmail, done, submit } = useNewsletterForm();

  if (done) return <p className="font-body text-sm text-canvas">{t('subscribed')}</p>;
  return (
    <form onSubmit={submit} className="flex border-b border-canvas/40 focus-within:border-accentondark">
      <label htmlFor="newsletter-email" className="sr-only">{t('emailAddressLabel')}</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailPlaceholder')}
        className="w-full min-w-0 border-0 bg-transparent px-0 py-3 font-body text-base text-canvas placeholder:text-canvas/60 focus:outline-none focus:ring-0 sm:text-sm"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-18 text-accentondark transition-colors hover:text-canvas"
      >
        {t('subscribe')} <span aria-hidden>→</span>
      </button>
    </form>
  );
}

/** Urban footer: mono column heads, hairline rules, and the hotel's name
 *  as a giant condensed wordmark across the foot of the page. */
export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const heading = 'font-mono text-xs uppercase tracking-18 text-accentondark';
  const link = 'inline-flex min-h-9 items-center font-body text-sm text-canvas/80 transition-colors hover:text-canvas';

  return (
    <footer className="border-t border-canvas/10 bg-primarydeep pb-mobilebar text-canvas lg:pb-0">
      <div className="mx-auto max-w-screen-2xl px-5 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-xs font-body text-lg leading-snug text-canvas">{pickLocale(hotelConfig.tagline, locale)}</p>
            <address className="mt-6 font-mono text-xs uppercase not-italic leading-relaxed tracking-18 text-canvas/70">
              {hotelConfig.location.address}
              <br />
              {pickLocale(hotelConfig.location.regionLabel, locale)}
            </address>
            <ul className="mt-6 space-y-1 font-mono text-sm">
              <li>
                <a href={`tel:${hotelConfig.contact.phoneHref}`} className="inline-flex min-h-11 items-center text-canvas hover:text-accentondark">
                  {hotelConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${hotelConfig.contact.email}`} className="inline-flex min-h-11 items-center break-all text-canvas hover:text-accentondark">
                  {hotelConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={heading}>{t('explore')}</p>
            <ul className="mt-4">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{tNav(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={heading}>{t('visit')}</p>
            <ul className="mt-4">
              {visitLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{tNav(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <p className={heading}>{t('seasonalLetterHeading')}</p>
            <p className="mt-4 font-body text-sm leading-relaxed text-canvas/80">{t('seasonalLetterBody')}</p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
            {/* Each profile link renders only when its URL is set in hotel.config. */}
            {(hotelConfig.contact.instagram || hotelConfig.contact.facebook) && (
              <div className="mt-6 flex gap-6">
                {hotelConfig.contact.instagram && (
                  <a href={hotelConfig.contact.instagram} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-18 text-canvas/80 hover:text-accentondark">
                    {t('instagram')} ↗
                  </a>
                )}
                {hotelConfig.contact.facebook && (
                  <a href={hotelConfig.contact.facebook} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-18 text-canvas/80 hover:text-accentondark">
                    {t('facebook')} ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* The wordmark: decorative, the name is already in the header. */}
        <p
          aria-hidden
          className="font-condensed mt-16 select-none overflow-hidden font-heading text-7xl font-extrabold uppercase leading-none tracking-tight text-canvas sm:whitespace-nowrap sm:text-8xl lg:text-9xl"
        >
          {hotelConfig.name}
        </p>
      </div>

      <div className="mt-8 border-t border-canvas/10">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-1 px-5 py-4 font-mono text-xs uppercase tracking-18 text-canvas/70 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6">
            <p>© {year} {hotelConfig.name}. {t('rightsReserved')}</p>
            <Link href="/policies" className="inline-flex min-h-11 items-center hover:text-canvas">{t('goodToKnow')}</Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-canvas">{t('privacy')}</Link>
          </div>
          <p>
            {pickLocale(hotelConfig.location.regionLabel, locale)} · {hotelConfig.priceRange}
          </p>
        </div>
      </div>
      {/* Demos only (hotel.config.ts `demoNotice`). */}
      {hotelConfig.demoNotice && (
        <p className="border-t border-canvas/10 px-5 py-4 text-center font-mono text-xs text-canvas/70">{pickLocale(hotelConfig.demoNotice, locale)}</p>
      )}
    </footer>
  );
}
