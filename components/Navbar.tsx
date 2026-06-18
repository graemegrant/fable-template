'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { BookButton } from './BookingModal';

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    label: 'Stay',
    children: [
      { label: 'Rooms & Suites', href: '/rooms' },
      { label: 'Special Offers', href: '/offers' },
    ],
  },
  { label: 'Dining', href: '/dining' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Gift Vouchers', href: '/gift-vouchers' },
  {
    label: 'Discover',
    children: [
      { label: 'Journal', href: '/journal' },
      { label: 'Our Story', href: '/about' },
      { label: 'Location', href: '/location' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenAccordion(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;
  const isActive = (item: NavItem) =>
    item.href === pathname || item.children?.some((c) => pathname.startsWith(c.href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-forest' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="font-heading text-2xl font-medium tracking-wide text-parchment">
          {hotelConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`font-body text-[11px] uppercase tracking-[0.25em] transition-colors ${
                    isActive(item) ? 'text-gold' : 'text-parchment hover:text-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`font-body text-[11px] uppercase tracking-[0.25em] transition-colors ${
                    isActive(item) ? 'text-gold' : 'text-parchment group-hover:text-gold'
                  }`}
                >
                  {item.label}
                </button>
              )}
              {item.children && (
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <ul className="w-56 border-t-2 border-gold bg-forest py-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-6 py-2.5 font-body text-[11px] uppercase tracking-[0.2em] transition-colors ${
                            pathname.startsWith(child.href) ? 'text-gold' : 'text-parchment/85 hover:text-gold'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${hotelConfig.contact.phone.replace(/[^+\d]/g, '')}`}
            className="hidden font-body text-xs text-parchment/80 transition-colors hover:text-gold xl:block"
          >
            {hotelConfig.contact.phone}
          </a>
          <BookButton className="border border-gold bg-gold px-6 py-3 font-body text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-transparent hover:text-gold" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex flex-col gap-[7px] p-2 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-7 bg-parchment transition-transform duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-px w-7 bg-parchment transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-7 bg-parchment transition-transform duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto bg-forest transition-[max-height] duration-700 ease-out-expo lg:hidden ${
          mobileOpen ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0'
        }`}
      >
        <nav className="space-y-1 px-6 pb-10 pt-4" aria-label="Mobile">
          {NAV.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="block border-b border-parchment/10 py-4 font-body text-xs uppercase tracking-[0.25em] text-parchment"
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="border-b border-parchment/10">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 font-body text-xs uppercase tracking-[0.25em] text-parchment"
                  onClick={() => setOpenAccordion(openAccordion === item.label ? null : item.label)}
                  aria-expanded={openAccordion === item.label}
                >
                  {item.label}
                  <span className={`transition-transform duration-300 ${openAccordion === item.label ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-out-expo ${
                    openAccordion === item.label ? 'max-h-64' : 'max-h-0'
                  }`}
                >
                  <ul className="space-y-3 pb-5 pl-4">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="font-body text-xs uppercase tracking-[0.2em] text-parchment/70">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          )}
          <div className="pt-6">
            <BookButton className="w-full bg-gold px-6 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-forest" />
          </div>
        </nav>
      </div>
    </header>
  );
}
