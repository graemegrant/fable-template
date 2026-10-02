'use client';

/**
 * Fixed bottom booking bar, mobile only (AGENTS.md §5 — stays on all client
 * sites). Room detail pages render it with the room's rate; everywhere
 * else SiteMobileBookBar (mounted once in the layout) shows tap-to-call
 * instead, so a guest on any page is one tap from the hotel or from
 * availability. Sits above the cookie bar while consent is still pending
 * so the primary booking CTA is never covered, and steps aside while the
 * booking modal is open. Footer reserves `pb-mobilebar` so the bar never
 * hides its content.
 */
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { BookButton, useBooking } from './BookingModal';
import { useCookieConsent } from '@/lib/useCookieConsent';

export default function MobileBookBar({
  rate,
  roomName,
}: {
  rate?: number;
  roomName?: string;
}) {
  const t = useTranslations('shared');
  const tBooking = useTranslations('booking');
  const consentDecided = useCookieConsent();
  const { isOpen } = useBooking();

  if (isOpen) return null;

  return (
    <div
      className={`fixed inset-x-0 z-80 flex items-center justify-between gap-4 border-t border-ink/10 bg-canvas px-5 py-4 shadow-lg lg:hidden ${
        consentDecided ? 'bottom-0' : 'bottom-cookiebar'
      }`}
    >
      {roomName && rate !== undefined ? (
        <div className="min-w-0">
          <p className="truncate font-body text-3xs uppercase tracking-20 text-ink/50">
            {roomName}
          </p>
          <p className="font-heading text-2xl font-medium leading-none text-primary">
            £{rate}
            <span className="font-body text-xs font-light text-ink/60"> {t('perNight')}</span>
          </p>
        </div>
      ) : (
        <div className="min-w-0">
          <p className="truncate font-body text-3xs uppercase tracking-20 text-ink/50">
            {tBooking('directBooking')}
          </p>
          <a
            href={`tel:${hotelConfig.contact.phoneHref}`}
            className="inline-flex min-h-11 items-center font-heading text-lg font-medium leading-none text-primary"
          >
            {hotelConfig.contact.phone}
          </a>
        </div>
      )}
      <BookButton roomHint={roomName} className="min-h-11 shrink-0 rounded-ctrl bg-primary px-6 py-3.5 font-body text-2xs uppercase tracking-25 text-canvas transition-colors duration-300 hover:bg-accentfill hover:text-onaccent" />
    </div>
  );
}

/** Layout-level bar for every page except room details, which render
 *  their own with the room's rate. */
export function SiteMobileBookBar() {
  const pathname = usePathname();
  if (/^\/rooms\/[^/]+/.test(pathname)) return null;
  return <MobileBookBar />;
}
