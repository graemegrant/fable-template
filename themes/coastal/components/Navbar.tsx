'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { LOCALES } from '@/lib/locales';
import { NAV } from '@/lib/ui/navigation';
import { useNavbar } from '@/lib/ui/useNavbar';
import { BookButton } from './BookingModal';

/**
 * Coastal navbar: a floating rounded island inset from the edges.
 * Transparent with light text over the hero, frosted sand once scrolled.
 * Menu items and behaviour are shared (lib/ui/navigation.ts, useNavbar).
 */
export default function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { locale, pathname, scrolled, mobileOpen, setMobileOpen, openAccordion, toggleAccordion, isActive } = useNavbar({
    scrollThreshold: 24,
  });

  const light = !scrolled && !mobileOpen;
  const text = light ? 'text-canvas' : 'text-primary';
  const hover = light ? 'hover:text-accentondark' : 'hover:text-accent';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center gap-4 rounded-card px-5 py-2.5 transition-all duration-500 lg:px-7 ${
          light ? 'bg-primarydeep/20 backdrop-blur-sm' : 'shadow-sand bg-canvas/90 backdrop-blur-md'
        }`}
      >
        <Link
          href="/"
          className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap font-heading text-xl font-semibold tracking-tight transition-colors md:text-2xl ${text}`}
        >
          {hotelConfig.name}
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <div key={item.labelKey} className="group relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`inline-flex min-h-11 items-center rounded-ctrl px-3.5 font-body text-sm font-medium transition-colors ${
                    isActive(item) ? (light ? 'bg-canvas/15 text-canvas' : 'bg-canvasalt text-primary') : `${text} ${hover}`
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-haspopup="true"
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-ctrl px-3.5 font-body text-sm font-medium transition-colors ${
                    isActive(item) ? (light ? 'bg-canvas/15 text-canvas' : 'bg-canvasalt text-primary') : `${text} ${hover}`
                  }`}
                >
                  {t(item.labelKey)}
                  <span aria-hidden className="text-xs transition-transform duration-300 group-hover:rotate-180">⌄</span>
                </button>
              )}
              {item.children && (
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="shadow-sand w-56 rounded-card bg-canvas p-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`flex min-h-11 items-center rounded-ctrl px-4 font-body text-sm transition-colors ${
                            pathname.startsWith(child.href) ? 'bg-canvasalt text-primary' : 'text-ink hover:bg-canvasalt'
                          }`}
                        >
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {LOCALES.length > 1 && (
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-label={tCommon('changeLanguage')}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-ctrl font-body text-xs font-semibold uppercase transition-colors ${text} ${hover}`}
              >
                {locale}
              </button>
              <div className="invisible absolute right-0 top-full pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="shadow-sand w-40 rounded-card bg-canvas p-2">
                  {LOCALES.map((l) => (
                    <li key={l.id}>
                      <Link
                        href={pathname}
                        locale={l.id}
                        className={`flex min-h-11 items-center rounded-ctrl px-4 font-body text-sm transition-colors ${
                          l.id === locale ? 'bg-canvasalt text-primary' : 'text-ink hover:bg-canvasalt'
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <BookButton className="min-h-11 whitespace-nowrap rounded-ctrl bg-accentfill px-6 py-2.5 font-body text-sm font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5" />
        </div>

        {/* 48×48 hit area (WCAG 2.5.8). */}
        <button
          type="button"
          className={`-mr-2 ml-auto flex size-12 items-center justify-center rounded-ctrl lg:hidden ${text}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={t('toggleMenu')}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-300 ${mobileOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition-transform duration-300 ${mobileOpen ? '-translate-y-1 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu: a full-height sand sheet under the island */}
      <div
        className={`shadow-sand mx-auto mt-2 max-w-7xl overflow-y-auto rounded-card bg-canvas transition-max-height duration-700 ease-out-expo lg:hidden ${
          mobileOpen ? 'max-h-nav-open' : 'max-h-0'
        }`}
      >
        <nav className="px-6 pb-32 pt-4" aria-label="Mobile">
          {NAV.map((item) =>
            item.href ? (
              <Link
                key={item.labelKey}
                href={item.href}
                className="flex min-h-14 items-center border-b border-ink/10 font-heading text-2xl text-primary"
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <div key={item.labelKey} className="border-b border-ink/10">
                <button
                  type="button"
                  className="flex min-h-14 w-full items-center justify-between font-heading text-2xl text-primary"
                  onClick={() => toggleAccordion(item.labelKey)}
                  aria-expanded={openAccordion === item.labelKey}
                >
                  {t(item.labelKey)}
                  <span aria-hidden className={`font-body text-lg transition-transform duration-300 ${openAccordion === item.labelKey ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                <div
                  className={`overflow-hidden transition-max-height duration-500 ease-out-expo ${
                    openAccordion === item.labelKey ? 'max-h-64' : 'max-h-0'
                  }`}
                >
                  <ul className="flex flex-wrap gap-2 pb-5">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="inline-flex min-h-11 items-center rounded-ctrl bg-canvasalt px-4 font-body text-sm text-primary"
                        >
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          )}
          {LOCALES.length > 1 && (
            <div className="flex items-center gap-2 py-5" role="group" aria-label={tCommon('changeLanguage')}>
              {LOCALES.map((l) => (
                <Link
                  key={l.id}
                  href={pathname}
                  locale={l.id}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-ctrl font-body text-xs font-semibold uppercase ${
                    l.id === locale ? 'bg-primary text-canvas' : 'bg-canvasalt text-primary'
                  }`}
                >
                  {l.id}
                </Link>
              ))}
            </div>
          )}
          <div className="space-y-3 pt-4">
            <BookButton className="min-h-12 w-full rounded-ctrl bg-accentfill px-6 py-3.5 font-body text-base font-semibold text-onaccent" />
            <a
              href={`tel:${hotelConfig.contact.phoneHref}`}
              className="flex min-h-12 w-full items-center justify-center rounded-ctrl border border-primary/30 font-body text-base font-medium text-primary"
            >
              {hotelConfig.contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
