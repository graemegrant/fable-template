import localFont from 'next/font/local';

/* Heritage look fonts: Cormorant Garamond and Jost, latin, as variable
   woff2 files kept in ./fonts (SIL Open Font License, see the *-OFL.txt
   files beside them). Bundled rather than fetched from Google at build
   time, so a slow Google Fonts response can't fail a deploy. Served
   from the site itself, with size-matched fallback metrics to limit
   layout shift. The Tailwind font-heading / font-body utilities read
   these CSS variables. */
export const fontHeading = localFont({
  src: [
    { path: './fonts/cormorant-garamond-normal.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/cormorant-garamond-italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-heading',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const fontBody = localFont({
  src: [{ path: './fonts/jost-normal.woff2', weight: '300 500', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Century Gothic', 'Verdana', 'sans-serif'],
});

/** Every font variable this look sets, for the <html> element. */
export const fontVariables = [fontHeading.variable, fontBody.variable].join(' ');
