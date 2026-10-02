'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CONSENT_KEY, CONSENT_EVENT } from '@/lib/useCookieConsent';

/**
 * Cookie consent banner. Sits in front of everything else fixed to the
 * bottom (z-90, above MobileBookBar's z-80) so the visitor can always see
 * and tap both choices. While visible it publishes its real height as
 * `--cookiebar-h`, which the `bottom-cookiebar` spacing token reads, so the
 * booking bar sits exactly above it however many lines the message wraps
 * to — a fixed 4.25rem estimate let the bar cover the buttons on narrow
 * phones.
 */
export default function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!visible || !el) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty('--cookiebar-h', `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--cookiebar-h');
    };
  }, [visible]);

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
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-90 border-t border-accentondark/40 bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 sm:py-4 lg:px-10">
        <p className="font-body text-3xs leading-snug text-canvas/80 sm:text-xs sm:leading-relaxed">
          {t('message')}
        </p>
        <div className="flex gap-2 sm:shrink-0 sm:gap-3">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="min-h-11 flex-1 rounded-ctrl border border-canvas/40 px-4 py-2.5 font-body text-3xs uppercase tracking-20 text-canvas transition-colors hover:border-canvas sm:flex-none sm:px-5 sm:py-3"
          >
            {t('essential')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="min-h-11 flex-1 rounded-ctrl border border-canvas bg-canvas px-4 py-2.5 font-body text-3xs uppercase tracking-20 text-primary transition-colors hover:bg-transparent hover:text-canvas sm:flex-none sm:px-5 sm:py-3"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
