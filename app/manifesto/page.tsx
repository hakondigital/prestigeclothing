import type { Metadata } from 'next';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import Eyebrow from '@/components/type/Eyebrow';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'Prestigé is not a label. It is a posture. A way of moving through the world with quiet authority.',
};

const PARAGRAPHS = [
  `Prestigé is not a label. It is a posture. A way of moving through the world with quiet authority. We make garments for people who don't need to be told who they are.`,
  `The cuts are unfussed — heavyweight, dropped shoulder, raw at the edge. We design for the body, not the trend cycle. We don't chase a season. We don't chase a person. We outline a stance and leave room for the wearer to fill it.`,
  `Streetwear is at its most honest when it stops asking to be looked at. The pieces in Drop 001 are built to disappear into a wardrobe and re-emerge as a uniform. Worn enough times, the garment becomes a tell. That is what we are after.`,
  `We are unisex by intent. Not by compromise. The fits are cut once, sized for shoulders and chest and length and how it falls. They were drawn in a Sydney studio. They were sewn slowly. They will be shipped without fanfare.`,
];

const PULL = [
  `Quiet authority over loud declaration.`,
  `Wear the mindset, not the logo.`,
  `Built once. Worn permanently.`,
];

export default function ManifestoPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink text-bone pt-32 md:pt-40 pb-32 md:pb-48">
        <header className="px-6 md:px-10 mb-20 md:mb-32">
          <Eyebrow className="block text-bone/60 mb-8">Manifesto</Eyebrow>
          <h1 className="display tracking-tightest leading-[0.92]"
              style={{ fontSize: 'clamp(72px, 13vw, 240px)' }}>
            Wear<br />The<br />Mindset.
          </h1>
        </header>

        <div className="px-6 md:px-10 max-w-[80ch] mx-auto space-y-20 md:space-y-28">
          {PARAGRAPHS.map((p, i) => (
            <div key={i} className="grid grid-cols-12 gap-6">
              <Eyebrow className="col-span-12 md:col-span-2 text-smoke pt-2">
                {String(i + 1).padStart(2, '0')}
              </Eyebrow>
              <Reveal as="p" className="col-span-12 md:col-span-10 text-[19px] md:text-[20px] leading-[1.55] tracking-[-0.005em] max-w-[56ch]">
                {p}
              </Reveal>
              {PULL[i] && (
                <Reveal
                  as="p"
                  delay={0.1}
                  className={`col-span-12 ${i % 2 === 0 ? 'md:col-start-3' : 'md:col-start-2'} md:col-span-10 mt-4 display tracking-tightest leading-[0.95]`}
                >
                  <span style={{ fontSize: 'clamp(36px, 5.5vw, 84px)' }}>{PULL[i]}</span>
                </Reveal>
              )}
            </div>
          ))}
        </div>

        <div className="mt-32 px-6 md:px-10 hairline-t pt-10 max-w-[80ch] mx-auto eyebrow text-smoke">
          <p>Drop No. 001 — Sydney — Coming 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
