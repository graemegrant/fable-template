'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { CODERO_CREDIT_URL, exploreLinks, useNewsletterForm, visitLinks } from '@/lib/ui/footer';

function NewsletterForm() {
  const t = useTranslations('footer');
  const { email, setEmail, done, submit } = useNewsletterForm();

  if (done) {
    return <p className="rounded-card bg-canvas/10 px-5 py-4 font-body text-sm text-canvas">{t('subscribed')}</p>;
  }
  return (
    <form onSubmit={submit} className="flex gap-2 rounded-ctrl bg-canvas/10 p-1.5">
      <label htmlFor="newsletter-email" className="sr-only">{t('emailAddressLabel')}</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailPlaceholder')}
        className="w-full min-w-0 rounded-ctrl bg-transparent px-4 py-2.5 font-body text-base text-canvas placeholder:text-canvas/70 focus:outline-none focus:ring-2 focus:ring-accentondark sm:text-sm"
      />
      <button
        type="submit"
        className="min-h-11 shrink-0 rounded-ctrl bg-accentfill px-5 font-body text-sm font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
      >
        {t('subscribe')}
      </button>
    </form>
  );
}

/** Coastal footer: a wave rolls in from the page above into deep sea. */
export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const heading = 'font-heading text-lg font-semibold italic text-accentondark';
  const link = 'inline-flex min-h-9 items-center font-body text-sm text-canvas/85 transition-colors hover:text-accentondark';

  return (
    <footer className="mt-10 text-canvas">
      <span aria-hidden className="wave text-primarydeep" />
      <div className="bg-primarydeep pb-mobilebar lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-10 lg:pb-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-heading text-3xl font-semibold">{hotelConfig.name}</p>
              <p className="mt-3 max-w-xs font-heading text-lg italic text-canvas/85">{pickLocale(hotelConfig.tagline, locale)}</p>
              <address className="mt-6 font-body text-sm not-italic leading-relaxed text-canvas/80">
                {hotelConfig.location.address}<br />
                {pickLocale(hotelConfig.location.regionLabel, locale)}
              </address>
              <ul className="mt-6 flex flex-wrap gap-2 font-body text-sm">
                <li>
                  <a
                    href={`tel:${hotelConfig.contact.phoneHref}`}
                    className="inline-flex min-h-11 items-center rounded-ctrl bg-canvas/10 px-4 transition-colors hover:bg-canvas/20"
                  >
                    {hotelConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${hotelConfig.contact.email}`}
                    className="inline-flex min-h-11 items-center rounded-ctrl bg-canvas/10 px-4 transition-colors hover:bg-canvas/20"
                  >
                    {hotelConfig.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className={heading}>{t('explore')}</p>
              <ul className="mt-4 space-y-1">
                {exploreLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>{tNav(l.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className={heading}>{t('visit')}</p>
              <ul className="mt-4 space-y-1">
                {visitLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>{tNav(l.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <div className="rounded-card bg-primary p-6 sm:p-7">
                <p className={heading}>{t('seasonalLetterHeading')}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-canvas/85">{t('seasonalLetterBody')}</p>
                <div className="mt-5">
                  <NewsletterForm />
                </div>
              </div>
              {/* Each profile link renders only when its URL is set in hotel.config. */}
              {(hotelConfig.contact.instagram || hotelConfig.contact.facebook) && (
                <div className="mt-5 flex gap-2">
                  {hotelConfig.contact.instagram && (
                    <a href={hotelConfig.contact.instagram} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-ctrl border border-canvas/25 px-5 font-body text-sm text-canvas/85 transition-colors hover:border-accentondark hover:text-accentondark">
                      {t('instagram')}
                    </a>
                  )}
                  {hotelConfig.contact.facebook && (
                    <a href={hotelConfig.contact.facebook} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-ctrl border border-canvas/25 px-5 font-body text-sm text-canvas/85 transition-colors hover:border-accentondark hover:text-accentondark">
                      {t('facebook')}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-canvas/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 p-6 sm:flex-row lg:px-10">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              <p className="font-body text-xs text-canvas/75">
                © {year} {hotelConfig.name}. {t('rightsReserved')}
              </p>
              <Link href="/policies" className="inline-flex min-h-11 items-center font-body text-xs text-canvas/75 transition-colors hover:text-accentondark">
                {t('goodToKnow')}
              </Link>
              <Link href="/privacy" className="inline-flex min-h-11 items-center font-body text-xs text-canvas/75 transition-colors hover:text-accentondark">
                {t('privacy')}
              </Link>
              {hotelConfig.coderoCredit && (
                <a href={CODERO_CREDIT_URL} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-body text-xs text-canvas/75 transition-colors hover:text-accentondark">
                  {t('websiteBy')}
                </a>
              )}
            </div>
            <p className="font-body text-xs text-canvas/75">
              {pickLocale(hotelConfig.location.regionLabel, locale)} · {hotelConfig.priceRange}
            </p>
          </div>
        </div>
        {/* Demos only (hotel.config.ts `demoNotice`). */}
        {hotelConfig.demoNotice && (
          <p className="border-t border-canvas/10 px-6 py-4 text-center font-body text-xs text-canvas/75">{pickLocale(hotelConfig.demoNotice, locale)}</p>
        )}
      </div>
    </footer>
  );
}
