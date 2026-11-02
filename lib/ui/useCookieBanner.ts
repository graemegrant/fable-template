'use client';

import { useEffect, useRef, useState } from 'react';
import { CONSENT_KEY, CONSENT_EVENT } from '@/lib/useCookieConsent';

/**
 * Cookie banner behaviour shared by every look: shown until a choice is
 * stored; while visible it publishes its real height as `--cookiebar-h`,
 * which the `bottom-cookiebar` spacing token reads, so the mobile booking
 * bar sits exactly above it however many lines the message wraps to.
 * Attach `ref` to the banner's outer element.
 */
export function useCookieBanner() {
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

  return { visible, ref, choose };
}
