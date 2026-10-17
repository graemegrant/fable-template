'use client';

/**
 * GA4 and Microsoft Clarity, loaded only once the visitor has chosen
 * "Accept all" in the cookie banner (UK PECR / GDPR: analytics cookies need
 * prior consent). Listens for the banner's change event, so accepting starts
 * analytics without a reload.
 *
 * Clarity (heatmaps and session recordings, for CRO) also needs an explicit
 * consent signal for UK/EEA visits — enforced by Microsoft since 31 Oct
 * 2025 — so it's sent with Consent API v2 straight after the tag loads. We
 * grant analytics storage only: the site runs no ads.
 */
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_KEY, CONSENT_EVENT } from '@/lib/useCookieConsent';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Clarity project IDs are short alphanumeric strings. Anything else is
 * refused rather than written into an inline script. */
const CLARITY_ID = /^[a-z0-9]{6,20}$/i;

export default function Analytics({ ga4Id, clarityId }: { ga4Id?: string; clarityId?: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      let next = false;
      try {
        next = window.localStorage.getItem(CONSENT_KEY) === 'all';
      } catch {
        next = false;
      }
      // Consent withdrawn after Clarity started: erase its cookies.
      if (!next && window.clarity) window.clarity('consent', false);
      setAllowed(next);
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!allowed) return null;
  const clarity = clarityId && CLARITY_ID.test(clarityId) ? clarityId : null;
  return (
    <>
      {ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');`}
          </Script>
        </>
      )}
      {clarity && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarity}");
          window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });`}
        </Script>
      )}
    </>
  );
}
