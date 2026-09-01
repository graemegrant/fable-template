import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';
import { hotelSchema } from '@/lib/schema';
import { MotionProvider } from '@/components/Motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { BookingProvider } from '@/components/BookingModal';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL(hotelConfig.siteUrl),
  title: {
    default: `${hotelConfig.name} — ${hotelConfig.seo.descriptor} in ${hotelConfig.seo.locationLabel}`,
    template: `%s — ${hotelConfig.name}`,
  },
  description: hotelConfig.description,
  // Canonical is set per-route via lib/seo.ts pageMetadata(); not inherited
  // from here, so a route that forgets it self-canonicalises rather than
  // pointing at '/'.
  openGraph: {
    siteName: hotelConfig.name,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: palette.forest,
};

const lodgingSchema = hotelSchema();

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fontHeading.variable} ${fontBody.variable}`}>
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
        <MotionProvider>
          <BookingProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
          </BookingProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
