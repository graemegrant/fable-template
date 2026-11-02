'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import type { Locale } from '@/lib/locales';
import type { NavItem } from './navigation';

/**
 * Navbar behaviour shared by every look: scroll state, the mobile menu
 * (closes on navigation, locks page scroll while open), the open mobile
 * accordion, and which item is active.
 */
export function useNavbar({ scrollThreshold = 50 }: { scrollThreshold?: number } = {}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenAccordion(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (item: NavItem) =>
    item.href === pathname || Boolean(item.children?.some((c) => pathname.startsWith(c.href)));
  const toggleAccordion = (key: string) => setOpenAccordion((open) => (open === key ? null : key));

  return { locale, pathname, scrolled, mobileOpen, setMobileOpen, openAccordion, toggleAccordion, isActive };
}
