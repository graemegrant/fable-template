import { ImageResponse } from 'next/og';
import { hotelConfig } from '@/hotel.config';
import { palette } from './tokens';

/** Shared renderer for the file-convention Open Graph images
 *  (app/opengraph-image.tsx and per dynamic segment). 1200x630 PNG,
 *  brand colours from lib/tokens.ts. Uses the system serif — a bundled
 *  display face can be added later if the type treatment needs to match. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function renderOgImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow?: string;
  title: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px 80px',
          background: palette.forest,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: palette.goldbright,
          }}
        >
          {eyebrow ?? `${hotelConfig.seo.descriptor} · ${hotelConfig.seo.locationLabel}`}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            lineHeight: 1.06,
            color: palette.parchment,
            maxWidth: 960,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: palette.parchment,
          }}
        >
          <span>{hotelConfig.name}</span>
          <span style={{ color: palette.gold }}>
            {footer ?? new URL(hotelConfig.siteUrl).host}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
