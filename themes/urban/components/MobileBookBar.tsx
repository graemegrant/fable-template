'use client';

/**
 * Urban mobile booking bar (AGENTS.md §5): a flush black bar along the
 * bottom edge, phones only, with the accent button filling its right end.
 * Room detail pages render it with the room's rate; everywhere else
 * SiteMobileBookBar shows tap-to-call. The rules (above the cookie banner,
 * hidden while the booking panel is open, which pages get which bar) are
 * shared in lib/ui/mobileBookBar.ts. Footer reserves `pb-mobilebar` so the
 * bar never hides its content.
 */
import { useTranslations } from 'next-intl';
import { hotelConfig } from '@/hotel.config';
import { BookButton } from './BookingModal';
import { useMobileBookBar, useShowSiteBookBar } from '@/lib/ui/mobileBookBar';

export default function MobileBookBar({ rate, roomName }: { rate?: number; roomName?: string }) {
  const t = useTranslations('shared');
  const tBooking = useTranslations('booking');
  const { hidden, consentDecided } = useMobileBookBar();
  if (hidden) return null;

  return (
    <div
      className={`fixed inset-x-0 z-80 flex items-stretch border-t border-canvas/15 bg-primarydeep lg:hidden ${
        consentDecided ? 'bottom-0' : 'bottom-cookiebar'
      }`}
    >
      {roomName && rate !== undefined ? (
        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-2">
          <p className="truncate font-mono text-xs uppercase tracking-18 text-canvas/70">{roomName}</p>
          <p className="font-mono text-lg text-canvas">
            £{rate}
            <span className="text-xs text-canvas/70"> {t('perNight')}</span>
          </p>
        </div>
      ) : (
        // Label and number are one tap-to-call link: a single 44px+ target.
        <a href={`tel:${hotelConfig.contact.phoneHref}`} className="flex min-h-14 min-w-0 flex-1 flex-col justify-center px-5">
          <span className="truncate font-mono text-xs uppercase tracking-18 text-canvas/70">{tBooking('directBooking')}</span>
          <span className="whitespace-nowrap font-mono text-sm text-canvas">{hotelConfig.contact.phone}</span>
        </a>
      )}
      <BookButton
        roomHint={roomName}
        className="min-h-14 shrink-0 bg-accentfill px-5 font-mono text-xs uppercase tracking-18 text-onaccent"
      />
    </div>
  );
}

/** Layout-level bar for every page except room details, which render
 *  their own with the room's rate. */
export function SiteMobileBookBar() {
  return useShowSiteBookBar() ? <MobileBookBar /> : null;
}
