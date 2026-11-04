import localFont from 'next/font/local';

/* Urban look fonts: Archivo for headlines (its width axis gives the
   condensed display cuts, see `.font-condensed` in styles.css), Schibsted
   Grotesk for editorial body text, and JetBrains Mono for labels, figures
   and metadata. Latin, as variable woff2 files kept in ./fonts (SIL Open
   Font License, see the *-OFL.txt files beside them). Bundled rather than
   fetched from Google at build time, so a slow Google Fonts response can't
   fail a deploy. The Tailwind font-heading / font-body / font-mono
   utilities read these variables. */
export const fontHeading = localFont({
  src: [{ path: './fonts/archivo-normal.woff2', weight: '100 900', style: 'normal' }],
  // Declares the width range the file covers, so `font-stretch` reaches the
  // wdth axis; without it browsers treat the face as normal width only.
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  variable: '--font-heading',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Arial Narrow', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const fontBody = localFont({
  src: [{ path: './fonts/schibsted-grotesk-normal.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const fontMono = localFont({
  src: [{ path: './fonts/jetbrains-mono-normal.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
});

/** Every font variable this look sets, for the <html> element. */
export const fontVariables = [fontHeading.variable, fontBody.variable, fontMono.variable].join(' ');
