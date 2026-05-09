'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductImage from './ProductImage';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';

type Props = {
  products: Product[];
};

export default function LookbookStrip({ products }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (reduce) {
      track.style.transform = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => `-${distance()}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative w-full h-screen overflow-hidden bg-ink text-bone"
      data-cursor="drag"
      aria-label="Lookbook horizontal strip"
    >
      <div className="absolute top-6 left-6 md:left-10 z-10 eyebrow text-bone/80">
        03 / Lookbook
      </div>
      <div className="absolute top-6 right-6 md:right-10 z-10 eyebrow text-bone/80">
        Drag ↔ to scrub
      </div>

      <div
        ref={trackRef}
        className="flex h-full items-center gap-6 md:gap-10 px-6 md:px-10 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {products.map((p, i) => (
          <a
            key={p.slug}
            href={`/drop/${p.slug}`}
            className="group relative shrink-0 h-[70vh] aspect-[4/5] block"
            data-cursor="image"
          >
            <ProductImage
              src={p.images[0]}
              alt={`${p.name} — ${p.colorway}`}
              sizes="56vh"
              priority={i < 2}
            />

            {/* Corner brackets — magenta */}
            <span aria-hidden className="absolute top-3 left-3 w-4 h-4 border-l border-t border-halo-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span aria-hidden className="absolute top-3 right-3 w-4 h-4 border-r border-t border-halo-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span aria-hidden className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-halo-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span aria-hidden className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-halo-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover meta */}
            <div
              className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-ink/70 text-bone overflow-hidden"
              style={{
                clipPath: 'inset(100% 0 0 0)',
                transition: 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              data-meta
            >
              <p className="eyebrow text-bone/70 mb-1">
                {String(i + 1).padStart(2, '0')} / {p.drop.replace('Drop No. ', 'Drop ')}
              </p>
              <p className="display text-[18px] md:text-[20px]">
                {p.name} <span className="text-smoke">— {p.colorway}</span>
              </p>
              <p className="eyebrow tabular mt-1">{formatPrice(p)}</p>
            </div>

            <style jsx>{`
              .group:hover [data-meta] { clip-path: inset(0 0 0 0); }
            `}</style>
          </a>
        ))}

        {/* Trailing caesura */}
        <div className="shrink-0 h-[70vh] w-[40vw] flex items-end pb-6">
          <p className="display leading-[0.9] text-[80px] md:text-[120px] tracking-tightest">
            Drop 001 — <span className="text-smoke">Coming 2026</span>
          </p>
        </div>
      </div>
    </section>
  );
}
