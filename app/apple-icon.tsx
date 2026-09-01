import { ImageResponse } from 'next/og';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** apple-touch-icon — iOS home-screen bookmark. */
export default function AppleIcon() {
  const letter = hotelConfig.name.replace(/^The\s+/i, '').charAt(0).toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: palette.forest,
          color: palette.goldbright,
          fontSize: 120,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {letter}
      </div>
    ),
    { ...size },
  );
}
