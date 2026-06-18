# Craigmore House — Next.js 15 Hotel Website

Production-ready luxury hotel website. Clone this repo and update `hotel.config.ts` to rebrand for any property.

## Tech Stack

- **Next.js 15** (App Router, TypeScript, strict mode)
- **Tailwind CSS** — custom design tokens: `forest`, `gold`, `parchment`, `warmgrey`, `ink`
- **Sanity v3** — headless CMS; app runs in static-fallback mode when Sanity is not configured
- **Framer Motion** — page transitions, stagger reveals, hero entrance
- **Resend** — contact/enquiry email; silent no-op when API key is absent

---

## Quick Start

```bash
# 1. Clone and install
git clone <repo> craigmore-house
cd craigmore-house
npm install           # or: pnpm install

# 2. Copy env template
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

The site works immediately with static placeholder data — no Sanity account required.

---

## Environment Variables

Create `.env.local` (none are required to run the site):

```env
# Sanity CMS — leave blank to use static fallback data
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Booking engine deep-link (RoomRaccoon, SiteMinder, etc.)
NEXT_PUBLIC_BOOKING_ENGINE_URL=

# Public site URL (used for sitemap + OG tags)
NEXT_PUBLIC_SITE_URL=https://www.craigmorehouse.com

# Resend — leave blank to log emails to console only
RESEND_API_KEY=

# Google Analytics 4 (optional)
NEXT_PUBLIC_GA4_ID=
```

---

## Cloning for a New Property

**One file controls all client-specific copy:**

```
hotel.config.ts
```

Edit the exported `hotelConfig` object:

```ts
export const hotelConfig = {
  name: 'Your Hotel Name',
  tagline: 'Your tagline here.',
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourhotel.com',
  // location, contact, rooms, starRating, priceRange, checkIn/Out...
};
```

Then update:
- `lib/data.ts` — replace placeholder rooms, experiences, offers, journal posts, team members
- `public/` — swap in actual photography
- `app/globals.css` — adjust brand colours if needed (or update `tailwind.config.ts` tokens)

---

## Pages (15 total)

| Route | Page |
|---|---|
| `/` | Homepage — Ken Burns hero, rooms preview, testimonials |
| `/rooms` | Rooms listing with filter (All / Classic / Deluxe / Suite) |
| `/rooms/[slug]` | Room detail — gallery lightbox, sticky booking sidebar |
| `/experiences` | Experiences grid |
| `/experiences/[slug]` | Experience detail |
| `/dining` | Dining page |
| `/weddings` | Weddings page |
| `/offers` | Offers / packages |
| `/journal` | Journal / blog index |
| `/journal/[slug]` | Journal article with Portable Text renderer |
| `/about` | About & team |
| `/contact` | Contact form (POST → `/api/contact`) |
| `/location` | Location, directions, nearby attractions |
| `/gift-vouchers` | Gift voucher selector |
| `/studio/[[...tool]]` | Sanity Studio (embedded) |

---

## CMS Collections (Sanity)

Schemas in `sanity/schemas/`:

- **Room** — name, slug, type, price, images, description, amenities, maxOccupancy
- **Experience** — name, slug, category, images, description, duration, price
- **Offer** — title, slug, images, description, validUntil, priceFrom
- **Journal Post** — title, slug, publishedAt, author, coverImage, body (Portable Text)
- **Testimonial** — quote, author, location, rating, roomStayed
- **Team Member** — name, role, photo, bio

Access Sanity Studio at `/studio` (requires `NEXT_PUBLIC_SANITY_PROJECT_ID`).

---

## Components

| Component | Purpose |
|---|---|
| `KenBurnsHero` | Full-screen homepage hero with CSS Ken Burns pan |
| `Navbar` | Scroll-aware (transparent → forest), dropdown nav, mobile accordion |
| `Footer` | 4-column layout, newsletter signup |
| `BookingModal` | Context-driven booking widget; collects dates/guests/rooms |
| `BookButton` | Trigger for BookingModal, usable anywhere |
| `GalleryLightbox` | Image grid + full-screen lightbox with keyboard nav |
| `RoomsFilter` | Client-side filter by room type with stagger reveal |
| `TestimonialSlider` | Prev/next + dot indicators |
| `PortableText` | Styled Sanity Portable Text renderer |
| `CookieBanner` | Essential / Accept All with localStorage persistence |
| `Motion` | Shared Framer Motion primitives: FadeUp, StaggerGrid, PageFade, etc. |

---

## SEO / Structured Data

- `LodgingBusiness` JSON-LD on every page (root layout)
- `HotelRoom` JSON-LD on each room detail page
- `BlogPosting` JSON-LD on each journal article
- Dynamic `sitemap.ts` and `robots.ts` (static data; no external requests at build time)
- Open Graph tags on all pages via `generateMetadata()`

---

## Deployment (Vercel)

```bash
# Push to GitHub, connect repo in Vercel dashboard
# Add environment variables in Vercel → Settings → Environment Variables
# Deploy
```

All pages with dynamic slugs use `export const dynamic = 'force-dynamic'` — compatible with Vercel Serverless and Edge runtimes.

---

## Local Build

```bash
npm run build   # Next.js production build
npm run start   # Serve production build locally
```

TypeScript is verified clean (`tsc --noEmit` exits 0). Dev server starts in ~2s.
