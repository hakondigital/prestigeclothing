import type { Metadata } from 'next';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import Eyebrow from '@/components/type/Eyebrow';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Lookbook',
  description: 'Drop 001 — the editorial cut. Unisex streetwear, photographed in studio.',
};

export default function LookbookPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40 pb-32 md:pb-48 bg-ink text-bone">
        <header className="px-6 md:px-10 mb-16 md:mb-24 grid grid-cols-12 gap-6">
          <Eyebrow className="col-span-12 md:col-span-3 text-bone/60">Drop No. 001</Eyebrow>
          <div className="col-span-12 md:col-span-9">
            <h1 className="display tracking-tightest leading-[0.92]"
                style={{ fontSize: 'clamp(64px, 11vw, 200px)' }}>
              Lookbook
            </h1>
            <p className="mt-6 max-w-[52ch] text-[16px] md:text-[17px] text-bone/80 leading-[1.5]">
              Nine pieces, shot in studio across two days. Heavyweight cottons, raw hems, dropped shoulders. Unisex by intent — not by compromise.
            </p>
          </div>
        </header>

        <ProductGrid products={PRODUCTS} />
      </main>
      <Footer />
    </>
  );
}
