'use client';

import { useEffect, useState } from 'react';
import { CONSENT_KEY, CONSENT_EVENT } from '@/lib/useCookieConsent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  function choose(level: 'essential' | 'all') {
    try {
      window.localStorage.setItem(CONSENT_KEY, level);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-70 border-t border-gold/40 bg-forest">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4 lg:px-10">
        <p className="font-body text-3xs leading-snug text-parchment/80 sm:text-xs sm:leading-relaxed">
          We use a small number of cookies to run the site and, with your consent, to understand
          how guests use it. No advertising.
        </p>
        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="rounded-ctrl border border-parchment/40 px-4 py-2.5 font-body text-3xs uppercase tracking-20 text-parchment transition-colors hover:border-parchment sm:px-5 sm:py-3"
          >
            Essential
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="rounded-ctrl border border-parchment bg-parchment px-4 py-2.5 font-body text-3xs uppercase tracking-20 text-forest transition-colors hover:bg-transparent hover:text-parchment sm:px-5 sm:py-3"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
