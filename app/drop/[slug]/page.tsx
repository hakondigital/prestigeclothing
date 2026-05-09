import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import Eyebrow from '@/components/type/Eyebrow';
import ImageStack from '@/components/product/ImageStack';
import ProductActions from './ProductActions';
import { PRODUCTS, getProduct, formatPrice } from '@/lib/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: 'Off the grid' };
  return {
    title: `${p.name} — ${p.colorway}`,
    description: p.description,
  };
}

export default function DropPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32 pb-32 bg-ink text-bone">
        <div className="px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <ImageStack images={product.images} alt={product.name} />
          </div>

          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
            <Eyebrow className="block text-bone/60 mb-5">{product.drop}</Eyebrow>
            <h1 className="display tracking-tightest leading-[0.95]"
                style={{ fontSize: 'clamp(40px, 6vw, 96px)' }}>
              {product.name}
              <span className="block text-smoke mt-1" style={{ fontSize: 'clamp(20px, 2.4vw, 36px)' }}>
                {product.colorway}
              </span>
            </h1>

            <div className="mt-6 flex items-center justify-between hairline-tb py-5">
              <span className="eyebrow tabular text-bone/80">{product.fabric}</span>
              <span className="eyebrow tabular text-bone">{formatPrice(product)}</span>
            </div>

            <p className="mt-8 text-[15px] md:text-[16px] leading-[1.6] text-bone/80 max-w-[52ch]">
              {product.description}
            </p>

            <ProductActions product={product} />

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 hairline-t pt-6 eyebrow text-smoke">
              <div>
                <dt>Weight</dt>
                <dd className="text-bone mt-1">{product.weight}</dd>
              </div>
              <div>
                <dt>Fabric</dt>
                <dd className="text-bone mt-1">{product.fabric}</dd>
              </div>
              <div>
                <dt>Cut</dt>
                <dd className="text-bone mt-1">Unisex, oversized</dd>
              </div>
              <div>
                <dt>Made in</dt>
                <dd className="text-bone mt-1">Sydney studio</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
