'use client';

import { useEffect, useState } from 'react';
import { hotelConfig } from '@/hotel.config';

const KEY = `${hotelConfig.name.toLowerCase().replace(/\s+/g, '-')}-cookie-consent`;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  function choose(level: 'essential' | 'all') {
    try {
      window.localStorage.setItem(KEY, level);
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-gold/40 bg-forest">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-6 sm:flex-row sm:items-center lg:px-10">
        <p className="max-w-2xl font-body text-xs leading-relaxed text-parchment/80">
          We use a small number of cookies to run the site and, with your consent, to understand how
          guests use it. No advertising, no nonsense.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="border border-parchment/40 px-5 py-3 font-body text-[10px] uppercase tracking-[0.2em] text-parchment transition-colors hover:border-parchment"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="bg-gold px-5 py-3 font-body text-[10px] uppercase tracking-[0.2em] text-forest transition-colors hover:bg-parchment"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
