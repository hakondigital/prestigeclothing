import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background:
              'conic-gradient(from 200deg, #FF1F8F, #FF6A00, #FFC400, #FF1F8F)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#0A0A0A',
              color: '#F4F1EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            P
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
