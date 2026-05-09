'use client';

import { useState } from 'react';
import SizeRunner from '@/components/product/SizeRunner';
import CartDrawer from '@/components/product/CartDrawer';
import type { Product } from '@/lib/products';
import { SIZES } from '@/lib/products';

type Props = { product: Product };

export default function ProductActions({ product }: Props) {
  const [size, setSize] = useState<(typeof SIZES)[number]>('M');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Array<{ name: string; size: string; price: number }>>([]);

  function add() {
    const next = [...items, { name: `${product.name} — ${product.colorway}`, size, price: product.price }];
    setItems(next);
    setOpen(true);
  }

  return (
    <div className="mt-10 space-y-8">
      <div>
        <p className="eyebrow text-smoke mb-4">Size</p>
        <SizeRunner defaultSize={size} onChange={setSize} />
      </div>

      <button
        type="button"
        onClick={add}
        className="group relative w-full hairline-tb py-5 eyebrow tracking-meta uppercase overflow-hidden"
        aria-label={`Add ${product.name} to cart`}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-bone origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
          Add to Cart — {size}
        </span>
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} items={items} />
    </div>
  );
}
