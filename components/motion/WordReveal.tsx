'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: string;
  highlights?: string[];
  className?: string;
};

/**
 * Renders prose with each word as an animated span. Words listed in `highlights`
 * get a subtle gradient accent on reveal — used for MINDSET / RAW / UNISEX / PRESTIGÉ.
 */
export default function WordReveal({ children, highlights = [], className }: Props) {
  const reduce = useReducedMotion();
  const words = children.split(/(\s+)/);
  const norm = (w: string) => w.replace(/[^A-Za-zÀ-ÿ]/g, '').toUpperCase();

  return (
    <p className={className}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        const hit = highlights.some((h) => norm(w) === h.toUpperCase());
        return (
          <motion.span
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.012, 0.45), ease: [0.16, 1, 0.3, 1] }}
            className={hit ? 'inline-block relative font-medium text-ink' : 'inline-block'}
          >
            {w}
            {hit && (
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-0.5 h-px"
                style={{
                  background: 'linear-gradient(90deg, #FF1F8F, #FF6A00, #FFC400)',
                }}
              />
            )}
          </motion.span>
        );
      })}
    </p>
  );
}
