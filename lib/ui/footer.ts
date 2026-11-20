'use client';

import { useRef, useState } from 'react';

/** The "Website by Codero" credit (hotel.config.ts `coderoCredit`). */
export const CODERO_CREDIT_URL = 'https://www.codero.co.uk';

/** Footer link lists, shared by every look. Labels are `nav.*` keys. */
export const exploreLinks = [
  { labelKey: 'roomsAndSuites', href: '/rooms' },
  { labelKey: 'dining', href: '/dining' },
  { labelKey: 'experiences', href: '/experiences' },
  { labelKey: 'weddings', href: '/weddings' },
  { labelKey: 'specialOffers', href: '/offers' },
  { labelKey: 'giftVouchers', href: '/gift-vouchers' },
] as const;

export const visitLinks = [
  { labelKey: 'ourStory', href: '/about' },
  { labelKey: 'journal', href: '/journal' },
  { labelKey: 'locationAndDirections', href: '/location' },
  { labelKey: 'contact', href: '/contact' },
] as const;

/** Newsletter sign-up state. Posts to /api/contact; a failed request
 *  still shows the thank-you, as signing up is never blocking. */
export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  // When the form appeared: the server rejects posts sent faster than a person types.
  const startedAt = useRef(Date.now());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, subject: 'Newsletter signup', startedAt: startedAt.current }),
      });
    } catch {
      /* non-blocking */
    }
    setDone(true);
  }

  return { email, setEmail, done, submit };
}
