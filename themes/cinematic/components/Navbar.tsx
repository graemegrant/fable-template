'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { LOCALES } from '@/lib/locales';
import { NAV } from '@/lib/ui/navigation';
import { useNavbar } from '@/lib/ui/useNavbar';
import { useMotionEngine } from '@/lib/ui/gsap/engine';
import { BookButton } from './BookingModal';

/**
 * Cinematic navbar: a floating glass pill inset from the top of the screen,
 * with "Menu" on the left, the hotel's name centred in the didone, and
 * "Check availability" on the right (desktop; phones have the
 * MobileBookBar), fixed above every scene so booking is never more than a
 * click away (AGENTS.md §5).
 *
 * The menu is a frosted-glass overlay on every screen size, the same links
 * as every look (lib/ui/navigation.ts) set as large numbered headlines.
 * With the motion layer (`menuOverlay`) the panel drops like a curtain and
 * the headlines rise in sequence; otherwise it fades. "Check availability"
 * stays in the bar (and the MobileBookBar on phones) while it is open. The overlay is
 * always in the HTML, so crawlers see every link; it is `inert` while
 * closed, takes focus when opened, closes on Escape and hands focus back.
 */
export default function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { locale, pathname, mobileOpen: open, setMobileOpen: setOpen, isActive } = useNavbar({ scrollThreshold: 24 });
  const engine = useMotionEngine();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Focus in on open, back to the toggle on close; Escape closes.
  useEffect(() => {
    const panel = panelRef.current;
    if (open) {
      panel?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
  }, [open, setOpen]);

  // The curtain: panel drops, headlines rise, details fade up.
  useEffect(() => {
    const panel = panelRef.current;
    const was = wasOpen.current;
    wasOpen.current = open;
    if (!engine || !panel || !engine.settings.patterns.menuOverlay || !open || was) return;
    const { gsap, scale } = engine;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(panel, { yPercent: -100 }, { yPercent: 0, duration: 0.8 + 0.2 * scale, ease: 'expo.inOut' })
        .from('[data-menu-line]', { yPercent: 110, duration: 1.1, stagger: 0.06 }, '-=0.35')
        .from('[data-menu-aside]', { opacity: 0, y: 16, duration: 0.9 }, '<0.2');
    }, panel);
    return () => ctx.revert();
  }, [open, engine]);

  const barText = 'font-mono text-xs uppercase tracking-25';
  let n = 0;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-2 lg:p-3">
      {/* Overlay menu, behind the bar so Close stays in reach. */}
      <div
        ref={panelRef}
        id="site-menu"
        inert={!open}
        data-lenis-prevent
        className={`pointer-events-auto fixed inset-2 overflow-y-auto rounded-card border border-canvas/10 bg-primarydeep/80 backdrop-blur-2xl backdrop-saturate-150 transition-opacity duration-500 lg:inset-3 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="mx-auto grid min-h-full max-w-screen-2xl gap-12 px-5 pb-32 pt-24 lg:grid-cols-12 lg:px-8 lg:pb-12 lg:pt-28">
          <nav aria-label="Main" className="lg:col-span-8">
            <ul className="divide-y divide-canvas/10 border-y border-canvas/10">
              {NAV.map((item) => {
                const index = String(++n).padStart(2, '0');
                return (
                  <li key={item.labelKey} className="py-4 lg:py-5">
                    <div className="flex items-baseline gap-5">
                      <span className="w-8 shrink-0 font-mono text-xs text-accentondark">{index}</span>
                      <span className="block overflow-hidden pb-1">
                        {item.href ? (
                          <Link
                            href={item.href}
                            data-menu-line
                            className={`inline-block font-heading text-4xl leading-tight transition-colors md:text-6xl ${
                              isActive(item) ? 'italic text-accentondark' : 'text-canvas hover:italic hover:text-accentondark'
                            }`}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ) : (
                          <span data-menu-line className="inline-block font-heading text-4xl leading-tight text-canvas md:text-6xl">
                            {t(item.labelKey)}
                          </span>
                        )}
                      </span>
                    </div>
                    {item.children && (
                      <ul data-menu-aside className="mt-2 flex flex-wrap gap-x-6 pl-14">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`inline-flex min-h-11 items-center font-mono text-sm uppercase tracking-18 transition-colors ${
                                pathname.startsWith(child.href) ? 'text-accentondark' : 'text-canvas/80 hover:text-canvas'
                              }`}
                            >
                              {t(child.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <aside data-menu-aside className="glass flex flex-col justify-end gap-8 self-end rounded-card p-6 lg:col-span-4 lg:col-start-9">
            <address className="font-body text-base not-italic leading-relaxed text-canvas/85">
              {hotelConfig.location.address}
              <br />
              <a href={`tel:${hotelConfig.contact.phoneHref}`} className="inline-flex min-h-11 items-center text-canvas hover:text-accentondark">
                {hotelConfig.contact.phone}
              </a>
              <br />
              <a href={`mailto:${hotelConfig.contact.email}`} className="inline-flex min-h-11 items-center text-canvas hover:text-accentondark">
                {hotelConfig.contact.email}
              </a>
            </address>
            {LOCALES.length > 1 && (
              <div className="flex gap-1" role="group" aria-label={tCommon('changeLanguage')}>
                {LOCALES.map((l) => (
                  <Link
                    key={l.id}
                    href={pathname}
                    locale={l.id}
                    className={`inline-flex min-h-11 min-w-12 items-center justify-center rounded-ctrl font-mono text-xs uppercase ${
                      l.id === locale ? 'bg-canvas text-ink' : 'text-canvas/80 hover:text-canvas'
                    }`}
                  >
                    {l.id}
                  </Link>
                ))}
              </div>
            )}
            {/* No second CTA here: the bar's (desktop) and the MobileBookBar
                (phones) stay in view above the open menu (AGENTS.md §5). */}
          </aside>
        </div>
      </div>

      {/* The bar: smoked glass throughout, so its type reads over any
          hero photograph, bright or dark, before the page has moved. */}
      <div className="glass-deep pointer-events-auto relative mx-auto max-w-screen-2xl rounded-ctrl">
        <div className="flex h-14 items-center px-1 lg:grid lg:h-16 lg:grid-cols-3 lg:px-2">
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className={`inline-flex min-h-12 items-center gap-3 justify-self-start px-3 text-canvas ${barText}`}
          >
            <span aria-hidden className="relative block h-2.5 w-7">
              <span className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ${open ? 'translate-y-1 rotate-45' : ''}`} />
              <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
            <span className="sr-only sm:not-sr-only">{open ? t('close') : t('menu')}</span>
          </button>

          <Link
            href="/"
            className="mx-auto inline-flex min-h-11 items-center justify-self-center whitespace-nowrap pr-14 font-heading text-xl tracking-tight text-canvas md:text-2xl lg:pr-0"
          >
            {hotelConfig.name}
          </Link>

          <div className="hidden items-center gap-2 justify-self-end lg:flex">
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className={`inline-flex min-h-11 items-center px-3 text-canvas/80 hover:text-canvas ${barText}`}>
              {hotelConfig.contact.phone}
            </a>
            <BookButton className={`inline-flex min-h-12 items-center rounded-ctrl bg-accentfill px-6 text-onaccent shadow-lg transition-colors hover:bg-canvas hover:text-primary ${barText}`} />
          </div>
        </div>
      </div>
    </header>
  );
}
