'use client';

import { useEffect } from 'react';

export default function BackgroundLerp() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'));
    if (sections.length === 0) return;

    const root = document.documentElement;

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let active = sections[0];
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          active = s;
          break;
        }
      }
      const bg = active.getAttribute('data-bg') || 'ink';
      const next = bg === 'bone' ? '#F4F1EC' : '#0A0A0A';
      const fg = bg === 'bone' ? '#0A0A0A' : '#F4F1EC';
      root.style.setProperty('--page-bg', next);
      root.style.setProperty('--page-fg', fg);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div aria-hidden className="bg-canvas" style={{ background: 'var(--page-bg, #0A0A0A)' }} />;
}
