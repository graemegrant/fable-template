import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';
import { hotelSchema } from '@/lib/schema';
import { pickLocale } from '@/lib/resolveLocale';
import { LOCALE_IDS, DEFAULT_LOCALE, isLocale, bcp47For, type Locale } from '@/lib/locales';
import { MotionProvider } from '@/components/Motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { BookingProvider } from '@/components/BookingModal';
import '../globals.css';

/* Self-hosted via next/font — no render-blocking request to Google's CDN,
   no font-swap layout shift beyond the built-in fallback metrics. The
   Tailwind font-heading / font-body utilities read these CSS variables. */
const fontHeading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
const fontBody = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Century Gothic', 'Verdana', 'sans-serif'],
});

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
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: palette.forest,
};

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

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

  const messages = await getMessages();
  const lodgingSchema = hotelSchema(locale);

  return (
    <html lang={bcp47For(locale)} className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
        />
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
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <BookingProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <CookieBanner />
            </BookingProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
