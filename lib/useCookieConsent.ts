'use client';

import { useEffect, useState } from 'react';
import { hotelConfig } from '@/hotel.config';

export const CONSENT_KEY = `${hotelConfig.name
  .toLowerCase()
  .replace(/\s+/g, '-')}-cookie-consent`;

/** Fired by CookieBanner when a choice is made, so other fixed-bottom
 *  elements (MobileBookBar) can reclaim the space without a full reload. */
export const CONSENT_EVENT = 'cookie-consent-change';

/**
 * Whether the visitor has dismissed the cookie banner. Assumes decided
 * during SSR / first paint (most visits are returning) so nothing jumps
 * for the common case; corrects on mount for first-time visitors.
 */
export function useCookieConsent(): boolean {
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const read = () => {
      try {
        setDecided(Boolean(window.localStorage.getItem(CONSENT_KEY)));
      } catch {
        setDecided(true);
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  return decided;
}
