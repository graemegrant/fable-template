import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';
import { hotelSchema } from '@/lib/schema';
import { pickLocale } from '@/lib/resolveLocale';
import { LOCALE_IDS, DEFAULT_LOCALE, isLocale, bcp47For, type Locale } from '@/lib/locales';
import { fontHeading, fontBody } from '@look/fonts';
import { MotionProvider } from '@look/components/Motion';
import Navbar from '@look/components/Navbar';
import Footer from '@look/components/Footer';
import CookieBanner from '@look/components/CookieBanner';
import { BookingProvider } from '@look/components/BookingModal';
import Analytics from '@/components/Analytics';
import { SiteMobileBookBar } from '@look/components/MobileBookBar';
import '../globals.css';
import '@look/styles.css';

export function generateStaticParams() {
  return LOCALE_IDS.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return {
    metadataBase: new URL(hotelConfig.siteUrl),
    title: {
      default: `${hotelConfig.name} — ${pickLocale(hotelConfig.seo.descriptor, locale)} in ${pickLocale(hotelConfig.seo.locationLabel, locale)}`,
      template: `%s — ${hotelConfig.name}`,
    },
    description: pickLocale(hotelConfig.description, locale),
    // Canonical is set per-route via lib/seo.ts pageMetadata(); not inherited
    // from here, so a route that forgets it self-canonicalises rather than
    // pointing at '/'.
    openGraph: {
      siteName: hotelConfig.name,
      type: 'website',
      locale: bcp47For(locale),
    },
    twitter: {
      card: 'summary_large_image',
    },
    // Marker for the SEO checks (scripts/seo-check.mjs and codero-ops):
    // Clarity itself only loads after consent, so crawlers can't see it.
    ...(clarityId ? { other: { 'codero-clarity': 'on' } } : {}),
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: palette.primary,
};

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

/** messages/*.json namespaces used by 'use client' components (see below). */
const CLIENT_NAMESPACES = ['common', 'nav', 'footer', 'booking', 'cookies', 'home', 'shared', 'contactForm', 'glenMoment'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  // Required by next-intl for static rendering alongside generateStaticParams.
  setRequestLocale(locale);

  // Only the namespaces client components read go to the browser; every
  // other string is rendered on the server. Sending the whole catalogue put
  // ~17 KB of unused copy into every page's HTML. Add a namespace here when
  // a 'use client' component starts using a new one (a missing one shows up
  // as a MISSING_MESSAGE console error).
  const allMessages = await getMessages();
  const messages = Object.fromEntries(CLIENT_NAMESPACES.filter((ns) => ns in allMessages).map((ns) => [ns, allMessages[ns]]));
  const tCommon = await getTranslations('common');
  const lodgingSchema = hotelSchema(locale);

  return (
    <html lang={bcp47For(locale)} className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
        />
        {/* Analytics loads only after cookie consent — see components/Analytics.tsx */}
        {(ga4Id || clarityId) && <Analytics ga4Id={ga4Id} clarityId={clarityId} />}
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <BookingProvider>
              <a
                href="#main"
                className="sr-only rounded-ctrl bg-accentfill px-5 py-3 font-body text-sm text-onaccent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-80"
              >
                {tCommon('skipToContent')}
              </a>
              <Navbar />
              <main id="main">{children}</main>
              <Footer />
              <SiteMobileBookBar />
              <CookieBanner />
            </BookingProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
