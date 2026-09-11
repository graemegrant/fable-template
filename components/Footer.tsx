'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';

const exploreLinks = [
  { labelKey: 'roomsAndSuites', href: '/rooms' },
  { labelKey: 'dining', href: '/dining' },
  { labelKey: 'experiences', href: '/experiences' },
  { labelKey: 'weddings', href: '/weddings' },
  { labelKey: 'specialOffers', href: '/offers' },
  { labelKey: 'giftVouchers', href: '/gift-vouchers' },
] as const;

const visitLinks = [
  { labelKey: 'ourStory', href: '/about' },
  { labelKey: 'journal', href: '/journal' },
  { labelKey: 'locationAndDirections', href: '/location' },
  { labelKey: 'contact', href: '/contact' },
] as const;

function NewsletterForm() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, subject: 'Newsletter signup' }),
      });
    } catch {
      /* non-blocking */
    }
    setDone(true);
  }

  if (done) {
    return <p className="font-body text-sm text-parchment/80">{t('subscribed')}</p>;
  }
  return (
    <form onSubmit={submit} className="flex border-b border-parchment/30">
      <label htmlFor="newsletter-email" className="sr-only">{t('emailAddressLabel')}</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailPlaceholder')}
        className="w-full bg-transparent py-3 font-body text-sm text-parchment placeholder:text-parchment/40 focus:outline-none"
      />
      <button type="submit" className="shrink-0 rounded-none border border-gold px-4 py-2 font-body text-2xs uppercase tracking-25 text-gold transition-colors hover:bg-gold hover:text-forest">
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
    <footer className="bg-forest text-parchment">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-2xl font-medium">{hotelConfig.name}</p>
            <p className="mt-3 max-w-xs font-body text-sm font-light leading-relaxed text-parchment/70">
              {pickLocale(hotelConfig.tagline, locale)}
            </p>
            <address className="mt-6 font-body text-sm not-italic leading-relaxed text-parchment/70">
              {hotelConfig.location.address}<br />
              {pickLocale(hotelConfig.location.regionLabel, locale)}
            </address>
          </div>

          <div>
            <p className="font-body text-2xs uppercase tracking-30 text-gold">{t('explore')}</p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-parchment/80 transition-colors hover:text-gold">
                    {tNav(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-2xs uppercase tracking-30 text-gold">{t('visit')}</p>
            <ul className="mt-5 space-y-3">
              {visitLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-parchment/80 transition-colors hover:text-gold">
                    {tNav(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-2xs uppercase tracking-30 text-gold">{t('contactHeading')}</p>
            <ul className="mt-5 space-y-3 font-body text-sm text-parchment/80">
              <li>
                <a href={`tel:${hotelConfig.contact.phoneHref}`} className="transition-colors hover:text-gold">
                  {hotelConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${hotelConfig.contact.email}`} className="transition-colors hover:text-gold">
                  {hotelConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-2xs uppercase tracking-30 text-gold">{t('seasonalLetterHeading')}</p>
            <p className="mt-5 font-body text-sm font-light leading-relaxed text-parchment/70">
              {t('seasonalLetterBody')}
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
            <div className="mt-8 flex gap-6">
              <a href={hotelConfig.contact.instagram} target="_blank" rel="noopener noreferrer"
                className="font-body text-2xs uppercase tracking-25 text-parchment/70 transition-colors hover:text-gold">
                {t('instagram')}
              </a>
              <a href={hotelConfig.contact.facebook} target="_blank" rel="noopener noreferrer"
                className="font-body text-2xs uppercase tracking-25 text-parchment/70 transition-colors hover:text-gold">
                {t('facebook')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 p-6 sm:flex-row lg:px-10">
          <p className="font-body text-xs text-parchment/50">
            © {year} {hotelConfig.name}. {t('rightsReserved')}
          </p>
          <p className="font-body text-xs text-parchment/50">
            {pickLocale(hotelConfig.location.regionLabel, locale)} · {hotelConfig.priceRange}
          </p>
        </div>
      </div>
    </footer>
  );
}
