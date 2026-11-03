import { Archivo, JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google';

/* Urban look fonts: Archivo for headlines (its width axis gives the
   condensed display cuts, see `.font-condensed` in styles.css), Schibsted
   Grotesk for editorial body text, and JetBrains Mono for labels, figures
   and metadata. Self-hosted via next/font; the Tailwind font-heading /
   font-body / font-mono utilities read these variables. */
export const fontHeading = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-heading',
  display: 'swap',
  fallback: ['Arial Narrow', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const fontBody = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
});

/** Every font variable this look sets, for the <html> element. */
export const fontVariables = [fontHeading.variable, fontBody.variable, fontMono.variable].join(' ');
