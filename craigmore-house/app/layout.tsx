import type { Metadata } from 'next';
import Script from 'next/script';
import { hotelConfig } from '@/hotel.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { BookingProvider } from '@/components/BookingModal';
import './globals.css';

/* Fonts are loaded via stylesheet link (see <head>) and exposed to Tailwind
   through the --font-heading / --font-body variables set in globals.css. */
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Jost:wght@300;400;500&display=swap';

export const metadata: Metadata = {
  verification: {
    google: '2-YXrDrFJiEnjmRK1CURCGmAxBjqvzeG6PWyJYyLfsE',
  },
  metadataBase: new URL(hotelConfig.siteUrl),
  title: {
    default: `${hotelConfig.name} — ${hotelConfig.tagline}`,
    template: `%s — ${hotelConfig.name}`,
  },
  description: hotelConfig.description,
  openGraph: {
    siteName: hotelConfig.name,
    type: 'website',
    locale: 'en_GB',
  },
};

const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: hotelConfig.name,
  description: hotelConfig.description,
  url: hotelConfig.siteUrl,
  telephone: hotelConfig.contact.phone,
  email: hotelConfig.contact.email,
  priceRange: hotelConfig.priceRange,
  starRating: { '@type': 'Rating', ratingValue: hotelConfig.starRating },
  numberOfRooms: hotelConfig.rooms,
  checkinTime: hotelConfig.checkIn,
  checkoutTime: hotelConfig.checkOut,
  address: {
    '@type': 'PostalAddress',
    addressLocality: hotelConfig.location.region,
    postalCode: hotelConfig.location.address.split(',').pop()?.trim(),
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: hotelConfig.location.lat,
    longitude: hotelConfig.location.lng,
  },
  sameAs: [hotelConfig.contact.instagram, hotelConfig.contact.facebook],
};

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_HREF} />
      </head>
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
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </BookingProvider>
      </body>
    </html>
  );
}
