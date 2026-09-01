'use client';

/**
 * Fixed bottom bar visible only on mobile for room detail pages.
 * Gives users a persistent booking CTA without the desktop sticky sidebar.
 * Sits above the cookie bar while consent is still pending so the primary
 * booking CTA is never covered (AGENTS.md §5).
 */
import { BookButton } from './BookingModal';
import { useCookieConsent } from '@/lib/useCookieConsent';

export default function MobileBookBar({
  rate,
  roomName,
}: {
  rate: number;
  roomName: string;
}) {
  const consentDecided = useCookieConsent();

  return (
    <div
      className={`fixed inset-x-0 z-80 flex items-center justify-between gap-4 border-t border-ink/10 bg-parchment px-5 py-4 shadow-lg lg:hidden ${
        consentDecided ? 'bottom-0' : 'bottom-cookiebar'
      }`}
    >
      <div className="min-w-0">
        <p className="truncate font-body text-3xs uppercase tracking-20 text-ink/50">
          {roomName}
        </p>
        <p className="font-heading text-2xl font-medium leading-none text-forest">
          £{rate}
          <span className="font-body text-xs font-light text-ink/60"> / night</span>
        </p>
      </div>
      <BookButton roomHint={roomName} className="shrink-0 rounded-ctrl bg-forest px-6 py-3.5 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest">
        Check availability
      </BookButton>
    </div>
  );
}
