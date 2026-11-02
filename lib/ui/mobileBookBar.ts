'use client';

import { usePathname } from '@/i18n/navigation';
import { useCookieConsent } from '@/lib/useCookieConsent';
import { useBooking } from './booking';

/**
 * Mobile booking bar rules shared by every look (AGENTS.md §5): room detail
 * pages render their own bar with the room's rate, the layout-level bar
 * covers every other page, the bar sits above the cookie banner while
 * consent is pending, and it steps aside while the booking modal is open.
 */
export function useMobileBookBar() {
  const consentDecided = useCookieConsent();
  const { isOpen } = useBooking();
  return { hidden: isOpen, consentDecided };
}

/** Whether the layout-level bar should show (room details have their own). */
export function useShowSiteBookBar() {
  const pathname = usePathname();
  return !/^\/rooms\/[^/]+/.test(pathname);
}
