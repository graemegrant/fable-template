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

  if (done) {
    return <p className="font-body text-sm text-canvas/80">{t('subscribed')}</p>;
  }
  return (
    <form onSubmit={submit} className="flex border-b border-canvas/30">
      <label htmlFor="newsletter-email" className="sr-only">{t('emailAddressLabel')}</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailPlaceholder')}
        className="w-full bg-transparent py-3 font-body text-base text-canvas placeholder:text-canvas/60 focus:outline-none sm:text-sm"
      />
      <button type="submit" className="shrink-0 rounded-ctrl border border-accentondark px-4 py-2 font-body text-2xs uppercase tracking-25 text-accentondark transition-colors hover:border-accentfill hover:bg-accentfill hover:text-onaccent">
        {t('subscribe')} →
      </button>
    </form>
  );
}

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary pb-mobilebar text-canvas lg:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-2xl font-medium">{hotelConfig.name}</p>
            <p className="mt-3 max-w-xs font-body text-sm font-light leading-relaxed text-canvas/70">
              {pickLocale(hotelConfig.tagline, locale)}
            </p>
            <address className="mt-6 font-body text-sm not-italic leading-relaxed text-canvas/70">
              {hotelConfig.location.address}<br />
              {pickLocale(hotelConfig.location.regionLabel, locale)}
            </address>
          </div>

          <div>
            <p className="font-body text-2xs uppercase tracking-30 text-accentondark">{t('explore')}</p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-canvas/80 transition-colors hover:text-accentondark">
                    {tNav(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-2xs uppercase tracking-30 text-accentondark">{t('visit')}</p>
            <ul className="mt-5 space-y-3">
              {visitLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-canvas/80 transition-colors hover:text-accentondark">
                    {tNav(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-2xs uppercase tracking-30 text-accentondark">{t('contactHeading')}</p>
            <ul className="mt-5 space-y-3 font-body text-sm text-canvas/80">
              <li>
                <a href={`tel:${hotelConfig.contact.phoneHref}`} className="transition-colors hover:text-accentondark">
                  {hotelConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${hotelConfig.contact.email}`} className="transition-colors hover:text-accentondark">
                  {hotelConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-2xs uppercase tracking-30 text-accentondark">{t('seasonalLetterHeading')}</p>
            <p className="mt-5 font-body text-sm font-light leading-relaxed text-canvas/70">
              {t('seasonalLetterBody')}
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
            {/* Each profile link renders only when its URL is set in hotel.config. */}
            {(hotelConfig.contact.instagram || hotelConfig.contact.facebook) && (
              <div className="mt-8 flex gap-6">
                {hotelConfig.contact.instagram && (
                  <a href={hotelConfig.contact.instagram} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-body text-2xs uppercase tracking-25 text-canvas/70 transition-colors hover:text-accentondark">
                    {t('instagram')}
                  </a>
                )}
                {hotelConfig.contact.facebook && (
                  <a href={hotelConfig.contact.facebook} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-body text-2xs uppercase tracking-25 text-canvas/70 transition-colors hover:text-accentondark">
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
            <p className="font-body text-xs text-canvas/70">
              © {year} {hotelConfig.name}. {t('rightsReserved')}
            </p>
            <Link href="/policies" className="inline-flex min-h-11 items-center font-body text-xs text-canvas/70 transition-colors hover:text-accentondark">
              {t('goodToKnow')}
            </Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center font-body text-xs text-canvas/70 transition-colors hover:text-accentondark">
              {t('privacy')}
            </Link>
          </div>
          <p className="font-body text-xs text-canvas/70">
            {pickLocale(hotelConfig.location.regionLabel, locale)} · {hotelConfig.priceRange}
          </p>
        </div>
      </div>
      {/* Demos only (hotel.config.ts `demoNotice`). */}
      {hotelConfig.demoNotice && (
        <p className="border-t border-canvas/10 px-6 py-4 text-center font-body text-xs text-canvas/70">{pickLocale(hotelConfig.demoNotice, locale)}</p>
      )}
    </footer>
  );
}
