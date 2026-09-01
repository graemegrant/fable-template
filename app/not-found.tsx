import type { Metadata } from 'next';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';
import SectionLabel from '@/components/SectionLabel';
import { PageFade } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest px-6">
      <PageFade className="max-w-xl text-center">
        <SectionLabel variant="parchment">Page not found</SectionLabel>
        <h1 className="mt-6 font-heading text-6xl font-medium text-parchment">
          You’ve wandered off the path.
        </h1>
        <p className="mt-6 font-body text-base font-light leading-relaxed text-parchment/75">
          It happens on four hundred acres. The page you’re after isn’t here — but the house is
          just over the rise, and the fire is lit.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-ctrl bg-gold px-8 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-parchment"
          >
            Back to the house
          </Link>
          <Link
            href="/contact"
            className="rounded-ctrl border border-parchment/60 px-8 py-4 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-parchment hover:text-forest"
          >
            Ask for directions
          </Link>
        </div>
        <p className="mt-10 font-body text-xs text-parchment/50">
          {hotelConfig.name} · {hotelConfig.location.regionLabel}
        </p>
      </PageFade>
    </div>
  );
}
