import type { Metadata } from 'next';
import '../globals.css';

/** The embedded Sanity Studio is not a public page — keep it out of the
 *  index in addition to the robots.txt disallow.
 *
 * This is now an independent root layout (its own <html>/<body>): it used
 * to inherit those from the shared app/layout.tsx, but that file moved to
 * app/[locale]/layout.tsx as part of adding locale routing, and /studio
 * deliberately stays outside app/[locale] (see middleware.ts). Next.js
 * requires every top-level route subtree to reach a layout with its own
 * <html>/<body> — this is that layout for the /studio subtree. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
