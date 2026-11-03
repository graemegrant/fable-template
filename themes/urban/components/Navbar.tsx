'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { LOCALES } from '@/lib/locales';
import { NAV } from '@/lib/ui/navigation';
import { useNavbar } from '@/lib/ui/useNavbar';
import { BookButton } from './BookingModal';

/**
 * Urban navbar: a full-width black bar with a hairline rule. Transparent
 * over the hero, solid once scrolled. On phones the menu is a full-screen
 * index of numbered, condensed headlines. Menu items and behaviour are
 * shared (lib/ui/navigation.ts, useNavbar).
 */
export default function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { locale, pathname, scrolled, mobileOpen, setMobileOpen, openAccordion, toggleAccordion, isActive } = useNavbar({
    scrollThreshold: 24,
  });
  const solid = scrolled || mobileOpen;
  const navItem = 'inline-flex min-h-11 items-center gap-1.5 px-3 font-mono text-xs uppercase tracking-18 transition-colors';

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          solid ? 'border-canvas/10 bg-primary/95 backdrop-blur-md' : 'border-transparent bg-gradient-to-b from-primarydeep/70 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-6 pl-5 lg:pl-8">
          <Link
            href="/"
            className="font-condensed inline-flex min-h-11 shrink-0 items-center whitespace-nowrap font-heading text-2xl font-extrabold uppercase leading-none tracking-tight text-canvas"
          >
            {hotelConfig.name}
          </Link>

          <nav className="ml-auto hidden items-center lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <div key={item.labelKey} className="group relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${navItem} ${isActive(item) ? 'text-accentondark' : 'text-canvas/80 hover:text-canvas'}`}
                  >
                    {t(item.labelKey)}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="true"
                    className={`${navItem} ${isActive(item) ? 'text-accentondark' : 'text-canvas/80 hover:text-canvas'}`}
                  >
                    {t(item.labelKey)}
                    <span aria-hidden className="text-accentondark">+</span>
                  </button>
                )}
                {item.children && (
                  <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="w-60 border border-canvas/15 bg-primarydeep">
                      {item.children.map((child, i) => (
                        <li key={child.href} className="border-b border-canvas/10 last:border-b-0">
                          <Link
                            href={child.href}
                            className={`flex min-h-12 items-center gap-4 px-4 font-body text-sm transition-colors ${
                              pathname.startsWith(child.href) ? 'text-accentondark' : 'text-canvas hover:bg-canvas/5'
                            }`}
                          >
                            <span className="font-mono text-xs text-canvas/60">{String(i + 1).padStart(2, '0')}</span>
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

          <div className="hidden h-full items-center lg:flex">
            {LOCALES.length > 1 && (
              <div className="group relative h-full">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-label={tCommon('changeLanguage')}
                  className="inline-flex h-full min-w-14 items-center justify-center border-l border-canvas/10 font-mono text-xs uppercase text-canvas/80 transition-colors hover:text-canvas"
                >
                  {locale}
                </button>
                <div className="invisible absolute right-0 top-full opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="w-44 border border-canvas/15 bg-primarydeep">
                    {LOCALES.map((l) => (
                      <li key={l.id}>
                        <Link
                          href={pathname}
                          locale={l.id}
                          className={`flex min-h-11 items-center justify-between px-4 font-body text-sm transition-colors ${
                            l.id === locale ? 'text-accentondark' : 'text-canvas hover:bg-canvas/5'
                          }`}
                        >
                          {l.label}
                          <span className="font-mono text-xs uppercase text-canvas/60">{l.id}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <BookButton className="inline-flex h-full items-center gap-3 bg-accentfill px-7 font-mono text-xs uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas" />
          </div>

          {/* 48×48 hit area (WCAG 2.5.8). */}
          <button
            type="button"
            className="ml-auto flex size-16 items-center justify-center border-l border-canvas/10 text-canvas lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={t('toggleMenu')}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? '-translate-y-1 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: a full-screen index */}
      <div
        className={`overflow-y-auto bg-primary transition-max-height duration-500 ease-out-expo lg:hidden ${
          mobileOpen ? 'max-h-nav-open' : 'max-h-0'
        }`}
      >
        <nav className="px-5 pb-32 pt-4" aria-label="Mobile">
          {NAV.map((item, i) => {
            const number = <span className="w-8 shrink-0 font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>;
            const label = 'font-condensed font-heading text-4xl font-extrabold uppercase leading-none text-canvas';
            return item.href ? (
              <Link key={item.labelKey} href={item.href} className="flex min-h-16 items-center gap-3 border-b border-canvas/10">
                {number}
                <span className={label}>{t(item.labelKey)}</span>
              </Link>
            ) : (
              <div key={item.labelKey} className="border-b border-canvas/10">
                <button
                  type="button"
                  className="flex min-h-16 w-full items-center gap-3 text-left"
                  onClick={() => toggleAccordion(item.labelKey)}
                  aria-expanded={openAccordion === item.labelKey}
                >
                  {number}
                  <span className={label}>{t(item.labelKey)}</span>
                  <span aria-hidden className={`ml-auto font-mono text-lg text-accentondark transition-transform duration-300 ${openAccordion === item.labelKey ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-max-height duration-500 ease-out-expo ${openAccordion === item.labelKey ? 'max-h-64' : 'max-h-0'}`}>
                  <ul className="pb-4 pl-11">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="flex min-h-11 items-center font-mono text-sm uppercase tracking-18 text-canvas/80">
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          {LOCALES.length > 1 && (
            <div className="flex border-b border-canvas/10 py-4" role="group" aria-label={tCommon('changeLanguage')}>
              {LOCALES.map((l) => (
                <Link
                  key={l.id}
                  href={pathname}
                  locale={l.id}
                  className={`inline-flex min-h-11 min-w-12 items-center justify-center font-mono text-xs uppercase ${
                    l.id === locale ? 'bg-canvas text-ink' : 'text-canvas/80'
                  }`}
                >
                  {l.id}
                </Link>
              ))}
            </div>
          )}
          <div className="grid gap-px pt-6">
            <BookButton className="min-h-14 w-full bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent" />
            <a
              href={`tel:${hotelConfig.contact.phoneHref}`}
              className="flex min-h-14 w-full items-center justify-center border border-canvas/25 font-mono text-sm tracking-18 text-canvas"
            >
              {hotelConfig.contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
