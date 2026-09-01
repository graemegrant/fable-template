import type { Metadata } from 'next';

/** The embedded Sanity Studio is not a public page — keep it out of the
 *  index in addition to the robots.txt disallow. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
