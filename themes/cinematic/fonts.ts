import localFont from 'next/font/local';

/* Cinematic look fonts: Instrument Serif for display (an airy, modern
   serif, light and tall, whose italic carries emphasis), and its partner
   Instrument Sans for body text, labels and figures. Latin, as variable woff2 files kept in
   ./fonts (SIL Open Font License, see the *-OFL.txt files beside them).
   Bundled rather than fetched from Google at build time, so a slow Google
   Fonts response can't fail a deploy.

   --font-mono is pointed at Instrument Sans too: the components shared in
   shape with Urban use `font-mono` for labels, and in this look those are
   set as tracked sans capitals instead. */
export const fontHeading = localFont({
  src: [
    { path: './fonts/instrument-serif-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-heading',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'serif'],
});

export const fontBody = localFont({
  src: [{ path: './fonts/instrument-sans-normal.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const fontMono = localFont({
  src: [{ path: './fonts/instrument-sans-normal.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

/** Every font variable this look sets, for the <html> element. */
export const fontVariables = [fontHeading.variable, fontBody.variable, fontMono.variable].join(' ');
