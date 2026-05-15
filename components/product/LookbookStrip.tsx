'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';

type Props = {
  products: Product[];
};

export default function LookbookStrip({ products }: Props) {
  return (
    <section className="relative bg-ink text-bone" aria-label="Lookbook">
      <div className="sticky top-0 z-20 px-6 md:px-10 pt-6 pointer-events-none">
        <p className="eyebrow text-bone/60">03 / Lookbook — Drop 001</p>
      </div>

      {products.map((p, i) => (
        <ProductMoment key={p.slug} product={p} index={i} />
      ))}

      <ClosingMoment />
    </section>
  );
}

function ProductMoment({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // image crossfade — first image is the establishing shot (visible immediately),
  // then crossfades through 2nd and 3rd as the user scrolls through the section
  const img1Opacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const img3Opacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  // subtle parallax drift + breathing scale
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.04]);

  // staggered text reveals — each appears once and stays
  const nameY = useTransform(scrollYProgress, [0.22, 0.32], [60, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);

  const copyY = useTransform(scrollYProgress, [0.48, 0.58], [30, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.48, 0.58], [0, 1]);

  const ctaY = useTransform(scrollYProgress, [0.68, 0.76], [24, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.68, 0.76], [0, 1]);

  // index counter
  const indexLabel = String(index + 1).padStart(2, '0');

  // pick first three images for the cycle, falling back to the first if a product has fewer
  const slots = [
    product.images[0],
    product.images[1] ?? product.images[0],
    product.images[2] ?? product.images[1] ?? product.images[0],
  ];

  return (
    <section ref={ref} className="relative" style={{ height: '320vh' }} data-section-index={3 + index}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Stacked images that crossfade */}
        <ImageLayer src={slots[0]} alt={`${product.name} ${product.colorway} — 1`} opacity={img1Opacity} y={imgY} scale={imgScale} priority />
        <ImageLayer src={slots[1]} alt={`${product.name} ${product.colorway} — 2`} opacity={img2Opacity} y={imgY} scale={imgScale} />
        <ImageLayer src={slots[2]} alt={`${product.name} ${product.colorway} — 3`} opacity={img3Opacity} y={imgY} scale={imgScale} />

        {/* Soft vignette so type reads */}
        <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/70 via-ink/0 to-ink/40" />

        {/* Top-right: index */}
        <div className="absolute top-6 right-6 md:right-10 z-10 eyebrow text-bone/70 tabular">
          {indexLabel} / {String(product.images.length).padStart(2, '0')}
        </div>

        {/* Left rail: colorway + drop */}
        <div className="absolute top-1/2 left-6 md:left-10 z-10 -translate-y-1/2 [writing-mode:vertical-rl] [transform:rotate(180deg)] origin-center">
          <p className="eyebrow text-bone/60 tracking-meta">
            {product.colorway} — {product.drop}
          </p>
        </div>

        {/* Product name — bottom-left */}
        <motion.h2
          style={{ y: nameY, opacity: nameOpacity }}
          className="absolute left-6 md:left-12 bottom-12 md:bottom-16 z-10 display tracking-tightest leading-[0.85] text-bone max-w-[18ch]"
        >
          <span style={{ fontSize: 'clamp(56px, 10vw, 180px)' }} className="block">
            {product.name}
          </span>
        </motion.h2>

        {/* Description — mid-right */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="absolute right-6 md:right-12 bottom-44 md:bottom-56 z-10 max-w-[40ch] text-right"
        >
          <p className="text-[14px] md:text-[16px] text-bone/85 leading-[1.55]">
            {product.description}
          </p>
        </motion.div>

        {/* Stats + CTA — bottom-right, appears last */}
        <motion.div
          style={{ y: ctaY, opacity: ctaOpacity }}
          className="absolute right-6 md:right-12 bottom-12 md:bottom-16 z-10 text-right"
        >
          <div className="flex flex-col gap-1 mb-5">
            <p className="eyebrow text-bone/60">{product.fabric}</p>
            <p className="eyebrow text-bone/60">{product.weight}</p>
            <p className="eyebrow tabular text-bone/90 mt-2">{formatPrice(product)}</p>
          </div>
          <a
            href={`/drop/${product.slug}`}
            data-cursor="link"
            className="group relative inline-flex items-center gap-3 eyebrow tracking-meta uppercase text-bone px-6 py-3 overflow-hidden"
          >
            <span aria-hidden className="absolute inset-0 border border-bone/80" />
            <span aria-hidden className="absolute inset-0 bg-bone origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-ink inline-flex items-center gap-3">
              View
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden>
                <path d="M2 8 H14" strokeLinecap="square" />
                <path d="M9 3 L14 8 L9 13" strokeLinecap="square" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ImageLayer({
  src,
  alt,
  opacity,
  y,
  scale,
  priority,
}: {
  src: string;
  alt: string;
  opacity: MotionValue<number>;
  y: MotionValue<string>;
  scale: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <motion.div style={{ opacity, y, scale }} className="absolute inset-0 will-change-transform">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
        style={{ objectPosition: 'center 28%' }}
      />
    </motion.div>
  );
}

function ClosingMoment() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1.0], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);

  return (
    <section ref={ref} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-ink">
        <motion.div style={{ opacity, y }} className="text-center px-6">
          <p className="eyebrow text-bone/50 mb-6 md:mb-8 tracking-meta">End of Drop 001</p>
          <h3
            className="display tracking-tightest leading-[0.85] text-bone"
            style={{ fontSize: 'clamp(56px, 12vw, 220px)' }}
          >
            Coming<br />2026
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
