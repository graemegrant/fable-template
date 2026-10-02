'use client';

/**
 * GA4, loaded only once the visitor has chosen "Accept all" in the cookie
 * banner (UK PECR / GDPR: analytics cookies need prior consent). It
 * previously loaded on every page view whenever NEXT_PUBLIC_GA4_ID was
 * set, regardless of the banner's choice. Listens for the banner's
 * change event, so accepting starts analytics without a reload.
 */
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_KEY, CONSENT_EVENT } from '@/lib/useCookieConsent';

export default function Analytics({ id }: { id: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setAllowed(window.localStorage.getItem(CONSENT_KEY) === 'all');
      } catch {
        setAllowed(false);
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');`}
      </Script>
    </>
  );
}
