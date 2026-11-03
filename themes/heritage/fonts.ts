import { Cormorant_Garamond, Jost } from 'next/font/google';

/* Heritage look fonts. Self-hosted via next/font: no render-blocking
   request to Google's CDN, no font-swap layout shift beyond the built-in
   fallback metrics. The Tailwind font-heading / font-body utilities read
   these CSS variables. */
export const fontHeading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const fontBody = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Century Gothic', 'Verdana', 'sans-serif'],
});

/** Every font variable this look sets, for the <html> element. */
export const fontVariables = [fontHeading.variable, fontBody.variable].join(' ');
