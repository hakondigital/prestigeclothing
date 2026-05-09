import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Promise from '@/components/sections/Promise';
import Newsletter from '@/components/sections/Newsletter';
import Marquee from '@/components/chrome/Marquee';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import { PRODUCTS } from '@/lib/products';

// Lookbook strip pulls in GSAP ScrollTrigger — defer until below-the-fold.
const LookbookStrip = dynamic(() => import('@/components/product/LookbookStrip'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-ink" aria-hidden />,
});

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Promise />
        <div data-section-index={3} data-bg="ink">
          <LookbookStrip products={PRODUCTS.slice(0, 6)} />
        </div>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
