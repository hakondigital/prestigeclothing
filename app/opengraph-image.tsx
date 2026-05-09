import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Prestigé — Wear The Mindset';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          color: '#F4F1EC',
          display: 'flex',
          flexDirection: 'column',
          padding: 64,
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, letterSpacing: 2, textTransform: 'uppercase', color: '#F4F1EC99' }}>
          <span>Prestigé</span>
          <span>Drop No. 001 — Coming 2026</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
          <div
            style={{
              fontSize: 280,
              letterSpacing: -8,
              lineHeight: 0.85,
              fontWeight: 900,
              textTransform: 'uppercase',
            }}
          >
            PRESTIGE
          </div>
          {/* Gradient acute accent floating above the final E */}
          <div
            style={{
              position: 'absolute',
              right: 88,
              top: -20,
              width: 64,
              height: 64,
              transform: 'skewX(-22deg)',
              background: 'linear-gradient(135deg, #FF1F8F, #FF6A00, #FFC400)',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: '#F4F1ECCC' }}>
          <span>Wear The Mindset</span>
          <span>Sydney / Worldwide</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
