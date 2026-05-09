'use client';

import Link from 'next/link';
import ProductImage from './ProductImage';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { motion } from 'framer-motion';

type Props = {
  product: Product;
  index?: number;
  span?: 'sm' | 'md' | 'lg';
};

const SPAN: Record<NonNullable<Props['span']>, string> = {
  sm: 'col-span-12 md:col-span-4',
  md: 'col-span-12 md:col-span-6',
  lg: 'col-span-12 md:col-span-8',
};

export default function ProductCard({ product, index = 0, span = 'md' }: Props) {
  return (
    <motion.article
      className={`relative ${SPAN[span]}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.9, delay: index * 0.04, ease: [0.7, 0, 0.2, 1] }}
    >
      <Link
        href={`/drop/${product.slug}`}
        className="group block"
        data-cursor="image"
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] z-0"
            style={{ clipPath: 'inset(0 0 0 0)' }}
          >
            <ProductImage src={product.images[0]} alt={`${product.name} — ${product.colorway}`} />
          </div>

          {/* Hover gradient hairlines top + right */}
          <span
            aria-hidden
            className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-[width] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
            style={{ background: 'linear-gradient(90deg, #FF1F8F, #FF6A00, #FFC400)' }}
          />
          <span
            aria-hidden
            className="absolute top-0 right-0 w-px h-0 group-hover:h-full transition-[height] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[120ms] z-10"
            style={{ background: 'linear-gradient(180deg, #FF1F8F, #FF6A00, #FFC400)' }}
          />

          {/* Corner brackets */}
          <span aria-hidden className="absolute top-3 left-3 w-4 h-4 border-l border-t border-halo-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span aria-hidden className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-halo-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="eyebrow text-smoke">
              {String(index + 1).padStart(2, '0')} / {product.drop.replace('Drop No. ', 'Drop ')}
            </p>
            <h3 className="display text-[18px] md:text-[20px] tracking-tightest text-current">
              {product.name} <span className="text-smoke">— {product.colorway}</span>
            </h3>
          </div>
          <p className="eyebrow tabular text-current shrink-0">{formatPrice(product)}</p>
        </div>
      </Link>
    </motion.article>
  );
}
