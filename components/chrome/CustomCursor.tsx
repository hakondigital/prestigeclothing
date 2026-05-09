'use client';

import { useEffect, useRef } from 'react';

type CursorMode = 'default' | 'link' | 'image' | 'drag';

/**
 * Custom cursor: a small bone dot that lags the mouse, plus a gradient ring
 * that scales up over interactive elements. The dot lerps toward the target
 * position each frame — hand-rolled rather than pulling GSAP onto every route
 * just for `quickTo`.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add('custom-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dotPos = { ...target };
    let ringPos = { ...target };
    let labelPos = { ...target };

    let mode: CursorMode = 'default';
    const setMode = (next: CursorMode, text = '') => {
      if (next === mode) return;
      mode = next;
      dot.classList.toggle('is-link', next === 'link');
      ring.classList.toggle('is-link', next === 'link');
      ring.classList.toggle('is-image', next === 'image');
      ring.classList.toggle('is-drag', next === 'drag');
      label.classList.toggle('is-image', next === 'image');
      label.classList.toggle('is-drag', next === 'drag');
      label.textContent = text;
    };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-cursor="drag"]')) return setMode('drag', 'Drag ↔');
      if (t.closest('[data-cursor="image"]')) return setMode('image', 'View');
      if (t.closest('a, button, [role="button"], [data-cursor="link"]')) return setMode('link');
      setMode('default');
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    const tick = () => {
      dotPos.x = lerp(dotPos.x, target.x, 0.42);
      dotPos.y = lerp(dotPos.y, target.y, 0.42);
      ringPos.x = lerp(ringPos.x, target.x, 0.18);
      ringPos.y = lerp(ringPos.y, target.y, 0.18);
      labelPos.x = lerp(labelPos.x, target.x, 0.14);
      labelPos.y = lerp(labelPos.y, target.y, 0.14);

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${labelPos.x}px, ${labelPos.y}px, 0) translate(-50%, -50%) scale(${
        mode === 'image' || mode === 'drag' ? 1 : 0
      })`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  );
}
