'use client';

import { useEffect, useState } from 'react';

type Props = {
  total: number;
  className?: string;
};

export default function SectionIndicator({ total, className }: Props) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section-index]'));
    if (sections.length === 0) return;
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = 1;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid) current = Number(s.dataset.sectionIndex || 1);
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const collection = active === 1 ? 'Hero' : active === 2 ? 'Promise' : active === 3 ? 'Lookbook' : 'Access';

  return (
    <div className={`eyebrow tabular text-bone/80 ${className ?? ''}`}>
      <span>{pad(active)}</span>
      <span className="px-2 text-smoke">/</span>
      <span>{pad(total)}</span>
      <span className="px-3 text-smoke">—</span>
      <span>{collection}</span>
    </div>
  );
}
