import { DM_Sans, Fraunces } from 'next/font/google';

/* Coastal look fonts: Fraunces with its "soft" axis for warm, rounded
   headings, DM Sans for friendly, open body text. Self-hosted via next/font;
   the Tailwind font-heading / font-body utilities read these variables. */
export const fontHeading = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-heading',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});
