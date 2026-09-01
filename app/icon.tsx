import { ImageResponse } from 'next/og';
import { hotelConfig } from '@/hotel.config';
import { palette } from '@/lib/tokens';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

/** Favicon / icon — generated so it stays on-palette. Initial of the
 *  hotel name, minus a leading "The". */
export default function Icon() {
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
          fontSize: 340,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {letter}
      </div>
    ),
    { ...size },
  );
}
