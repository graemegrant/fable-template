import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import SectionLabel from '../components/SectionLabel';
import { PageFade } from '../components/Motion';

/** 404 page, Urban look: the error set like a front page. */
export default function NotFoundView({ locale }: { locale: Locale }) {
  const blockButton =
    'inline-flex min-h-14 items-center justify-between gap-6 px-6 font-mono text-sm uppercase tracking-18 transition-colors';
  return (
    <div className="bg-grid flex min-h-screen items-end px-5 pb-16 pt-28 lg:px-8">
      <PageFade className="mx-auto w-full max-w-screen-2xl">
        <SectionLabel index="404">Page not found</SectionLabel>
        <h1 className="font-condensed mt-6 font-heading text-7xl font-extrabold uppercase leading-none text-canvas md:text-9xl">
          Wrong turn.
          <br />
          <span className="text-outline text-accentondark">Right city.</span>
        </h1>
        <div className="mt-10 grid gap-8 border-t border-canvas/15 pt-8 lg:grid-cols-12">
          <p className="font-body text-lg leading-relaxed text-canvas/85 lg:col-span-6">
            The page you were after isn’t here. The rest of {hotelConfig.name} is exactly where you left it.
          </p>
          <div className="flex flex-col gap-px sm:flex-row lg:col-span-5 lg:col-start-8">
            <Link href="/" className={`bg-accentfill text-onaccent hover:bg-canvas ${blockButton}`}>
              Back to the home page <span aria-hidden>→</span>
            </Link>
            <Link href="/contact" className={`border border-canvas/40 text-canvas hover:bg-canvas hover:text-ink ${blockButton}`}>
              Ask us
            </Link>
          </div>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-18 text-canvas/70">
          {hotelConfig.name} / {pickLocale(hotelConfig.location.regionLabel, locale)}
        </p>
      </PageFade>
    </div>
  );
}
