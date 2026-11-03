import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from '../components/SectionLabel';
import { PageFade } from '../components/Motion';

/** 404 page, Coastal look: a deep-sea card with a wave along its foot. */
export default function NotFoundView({ locale }: { locale: Locale }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-3 pb-6 pt-28 sm:px-5">
      <PageFade className="relative w-full max-w-3xl overflow-hidden rounded-card bg-primarydeep px-6 pb-24 pt-16 text-center sm:px-12">
        <SectionLabel>Page not found</SectionLabel>
        <h1 className="mt-6 font-heading text-5xl font-semibold leading-display text-canvas md:text-6xl">
          The tide has taken this page.
        </h1>
        <p className="mx-auto mt-6 max-w-lg font-body text-lg leading-relaxed text-canvas/85">
          The page you were after has drifted off. The hotel is right where you left it, and the kettle is on.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-ctrl bg-accentfill px-8 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
          >
            Back to the hotel
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center rounded-ctrl border border-canvas/50 px-8 py-3.5 font-body text-base font-medium text-canvas transition-colors duration-300 hover:bg-canvas hover:text-primary"
          >
            Ask for directions
          </Link>
        </div>
        <p className="mt-10 font-body text-sm text-canvas/80">
          {hotelConfig.name} · {pickLocale(hotelConfig.location.regionLabel, locale)}
        </p>
        <div aria-hidden className="wave absolute inset-x-0 bottom-0 text-accentondark/25" />
      </PageFade>
    </div>
  );
}
