'use client';

import { useState } from 'react';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import Eyebrow from '@/components/type/Eyebrow';
import Link from 'next/link';
import { ArrowRight } from '@/components/chrome/Icons';

export default function CartPage() {
  const [items] = useState<Array<{ name: string; size: string; price: number }>>([]);
  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <Nav />
      <main className="bg-ink text-bone pt-32 md:pt-40 pb-32 md:pb-48 px-6 md:px-10 min-h-[80vh]">
        <header className="mb-16 md:mb-24">
          <Eyebrow className="block text-bone/60 mb-6">Cart</Eyebrow>
          <h1 className="display tracking-tightest leading-[0.92]"
              style={{ fontSize: 'clamp(56px, 9vw, 168px)' }}>
            Your Cart
          </h1>
        </header>

        {items.length === 0 ? (
          <div className="hairline-t pt-12">
            <p className="display tracking-tightest leading-[0.95]"
               style={{ fontSize: 'clamp(28px, 3.6vw, 56px)' }}>
              Empty for now.
            </p>
            <p className="mt-6 text-bone/70 max-w-[52ch] leading-[1.6]">
              Drop No. 001 lands in 2026. Earn early access on the landing page, or read the manifesto while you wait.
            </p>
            <div className="mt-10 flex gap-10 eyebrow tracking-meta uppercase">
              <Link href="/" className="inline-flex items-center gap-2 hover:text-bone group">
                <span className="relative">
                  Return Home
                  <span aria-hidden className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-[width] duration-500 ease-out-expo group-hover:w-full" />
                </span>
                <ArrowRight />
              </Link>
              <Link href="/lookbook" className="inline-flex items-center gap-2 hover:text-bone group">
                <span className="relative">
                  View Lookbook
                  <span aria-hidden className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-[width] duration-500 ease-out-expo group-hover:w-full" />
                </span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <ul className="hairline-t">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between hairline-b py-6">
                <div>
                  <p className="display text-[20px]">{item.name}</p>
                  <p className="eyebrow text-smoke mt-1">Size {item.size}</p>
                </div>
                <p className="eyebrow tabular">AU ${item.price}</p>
              </li>
            ))}
            <li className="flex justify-between py-6 eyebrow tabular">
              <span>Subtotal</span>
              <span>AU ${total}</span>
            </li>
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
