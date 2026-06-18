'use client';

import { useState } from 'react';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';

const exploreLinks = [
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Special Offers', href: '/offers' },
  { label: 'Gift Vouchers', href: '/gift-vouchers' },
];

const visitLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Location & Directions', href: '/location' },
  { label: 'Contact', href: '/contact' },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, subject: 'Newsletter signup' }),
      });
    } catch {
      /* non-blocking */
    }
    setDone(true);
  }

  if (done) {
    return <p className="font-body text-sm text-parchment/80">Thank you — you’re on the list. Letters arrive seasonally, never more.</p>;
  }
  return (
    <form onSubmit={submit} className="flex border-b border-parchment/30">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full bg-transparent py-3 font-body text-sm text-parchment placeholder:text-parchment/40 focus:outline-none"
      />
      <button type="submit" className="shrink-0 rounded-none border border-gold px-4 py-2 font-body text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-forest">
        Subscribe →
      </button>
    </form>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest text-parchment">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-2xl font-medium">{hotelConfig.name}</p>
            <p className="mt-3 max-w-xs font-body text-sm font-light leading-relaxed text-parchment/70">
              {hotelConfig.tagline}
            </p>
            <address className="mt-6 font-body text-sm not-italic leading-relaxed text-parchment/70">
              {hotelConfig.location.address}<br />
              {hotelConfig.location.region}
            </address>
          </div>

          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold">Explore</p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-parchment/80 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold">Visit</p>
            <ul className="mt-5 space-y-3">
              {visitLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-parchment/80 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-[11px] uppercase tracking-[0.3em] text-gold">Contact</p>
            <ul className="mt-5 space-y-3 font-body text-sm text-parchment/80">
              <li>
                <a href={`tel:${hotelConfig.contact.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-gold">
                  {hotelConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${hotelConfig.contact.email}`} className="transition-colors hover:text-gold">
                  {hotelConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold">The seasonal letter</p>
            <p className="mt-5 font-body text-sm font-light leading-relaxed text-parchment/70">
              What the glen is doing, what the kitchen is planning, and first word on offers. Four letters a year.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
            <div className="mt-8 flex gap-6">
              <a href={hotelConfig.contact.instagram} target="_blank" rel="noopener noreferrer"
                className="font-body text-[11px] uppercase tracking-[0.25em] text-parchment/70 transition-colors hover:text-gold">
                Instagram
              </a>
              <a href={hotelConfig.contact.facebook} target="_blank" rel="noopener noreferrer"
                className="font-body text-[11px] uppercase tracking-[0.25em] text-parchment/70 transition-colors hover:text-gold">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row lg:px-10">
          <p className="font-body text-xs text-parchment/50">
            © {year} {hotelConfig.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-parchment/50">
            {hotelConfig.location.region} · {hotelConfig.priceRange}
          </p>
        </div>
      </div>
    </footer>
  );
}
