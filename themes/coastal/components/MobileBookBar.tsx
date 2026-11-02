'use client';

/**
 * Coastal mobile booking bar (AGENTS.md §5): a floating rounded pill at the
 * bottom of the screen, phones only. Room detail pages render it with the
 * room's rate; everywhere else SiteMobileBookBar shows tap-to-call. The
 * rules (above the cookie banner, hidden while the booking modal is open,
 * which pages get which bar) are shared in lib/ui/mobileBookBar.ts. Footer
 * reserves `pb-mobilebar` so the bar never hides its content.
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
    <div className={`fixed inset-x-0 z-80 px-3 lg:hidden ${consentDecided ? 'bottom-3' : 'bottom-cookiebar'}`}>
      {/* Even 6px padding all round, and the button fills the inner height, so
          the two pills are concentric (inner radius = outer minus padding).
          The text sits 28px in, clear of the pill's curved end. */}
      <div className="shadow-sand flex items-stretch justify-between gap-3 rounded-ctrl bg-primary p-1.5 pl-7">
        {roomName && rate !== undefined ? (
          <div className="flex min-w-0 flex-col justify-center py-1.5">
            <p className="truncate font-body text-xs text-canvas/75">{roomName}</p>
            <p className="font-heading text-xl font-semibold leading-none text-canvas">
              £{rate}
              <span className="font-body text-xs font-normal text-canvas/75"> {t('perNight')}</span>
            </p>
          </div>
        ) : (
          <div className="flex min-w-0 flex-col justify-center">
            <p className="truncate pt-1.5 font-body text-xs text-canvas/75">{tBooking('directBooking')}</p>
            <a
              href={`tel:${hotelConfig.contact.phoneHref}`}
              className="inline-flex min-h-11 items-center whitespace-nowrap font-body text-sm font-semibold leading-none text-canvas sm:text-base"
            >
              {hotelConfig.contact.phone}
            </a>
          </div>
        )}
        <BookButton
          roomHint={roomName}
          className="min-h-12 shrink-0 self-stretch rounded-ctrl bg-accentfill px-5 font-body text-sm font-semibold text-onaccent"
        />
      </div>
    </div>
  );
}

/** Layout-level bar for every page except room details, which render
 *  their own with the room's rate. */
export function SiteMobileBookBar() {
  return useShowSiteBookBar() ? <MobileBookBar /> : null;
}
