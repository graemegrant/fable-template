import localFont from 'next/font/local';

/* Coastal look fonts: Fraunces (variable, with its "soft" and optical-size
   axes, for warm, rounded headings) and DM Sans (friendly, open body text),
   latin, as woff2 files kept in ./fonts (SIL Open Font License, see the
   *-OFL.txt files beside them). Bundled rather than fetched from Google at
   build time, so a slow Google Fonts response can't fail a deploy. The
   Tailwind font-heading / font-body utilities read these variables. */
export const fontHeading = localFont({
  src: [
    { path: './fonts/fraunces-normal.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/fraunces-italic.woff2', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-heading',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const fontBody = localFont({
  src: [{ path: './fonts/dm-sans-normal.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

/** Every font variable this look sets, for the <html> element. */
export const fontVariables = [fontHeading.variable, fontBody.variable].join(' ');
