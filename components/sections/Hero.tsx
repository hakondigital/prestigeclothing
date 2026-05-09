'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Wordmark from '@/components/type/Wordmark';
import SectionIndicator from '@/components/motion/SectionIndicator';
import TypeIn from '@/components/motion/TypeIn';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const reduce = useReducedMotion();
  const fi = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : null;

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const onEntered = () => setEntered(true);
    window.addEventListener('prestige:entered', onEntered);
    return () => window.removeEventListener('prestige:entered', onEntered);
  }, []);

  return (
    <section
      data-section-index={1}
      data-bg="ink"
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden"
      aria-label="Prestigé — landing hero"
    >
      {/* Center wordmark */}
      <div className="relative z-10 px-6 md:px-10 text-center">
        {entered && (
          <div>
            <motion.div
              layoutId="prestige-wordmark"
              layout="position"
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
              style={{ fontSize: 'clamp(96px, 18vw, 360px)' }}
            >
              <Wordmark className="block tracking-tightest" animate={false} />
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {entered && (
            <motion.p
              key="hero-subtitle"
              className="eyebrow text-bone/80 mt-8 md:mt-10"
              {...(fi ?? fadeIn(0.9))}
            >
              <TypeIn text="Wear The Mindset — Drop 001 — Coming 2026" delay={900} speed={22} />
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom-left section indicator */}
      <motion.div
        className="absolute bottom-6 left-6 md:left-10 z-20"
        {...(fi ?? fadeIn(2.2))}
      >
        <SectionIndicator total={4} />
      </motion.div>

      {/* Bottom-right scroll indicator */}
      <motion.div
        className="absolute bottom-6 right-6 md:right-10 z-20 flex flex-col items-center gap-3"
        {...(fi ?? fadeIn(2.2))}
      >
        <span className="vtext text-bone/80">Scroll</span>
        <span aria-hidden className="relative h-[28px] w-px bg-bone/30 overflow-hidden">
          <span className="absolute inset-0 bg-bone animate-scroll-down" />
        </span>
      </motion.div>
    </section>
  );
}
