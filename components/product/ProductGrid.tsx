import ProductCard from './ProductCard';
import type { Product } from '@/lib/products';

type Props = {
  products: Product[];
};

const PATTERN: Array<'sm' | 'md' | 'lg'> = ['md', 'md', 'lg', 'sm', 'md', 'md', 'sm', 'lg', 'md'];

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-16 md:gap-y-24 px-6 md:px-10">
      {products.map((p, i) => (
        <ProductCard
          key={p.slug}
          product={p}
          index={i}
          span={PATTERN[i % PATTERN.length]}
        />
      ))}
    </div>
  );
}
