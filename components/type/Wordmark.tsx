'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  className?: string;
  /** Applied to the letter row, which now also wraps the accent. Use for
   *  blend modes that should affect the whole wordmark, e.g. `mix-blend-difference`. */
  letterClassName?: string;
  /** When true, plays the letter-by-letter reveal once on mount. */
  animate?: boolean;
};

const LETTERS = ['P', 'R', 'E', 'S', 'T', 'I', 'G', 'E'] as const;

export default function Wordmark({ className, letterClassName, animate = true }: Props) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;
  const accentDelay = 0.5 + LETTERS.length * 0.045 + 0.05;

  return (
    <span
      className={`relative inline-block display leading-[0.85] ${className ?? ''}`}
      aria-label="Prestigé"
    >
      <span
        aria-hidden
        className={`inline-flex relative ${letterClassName ?? ''}`}
      >
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={shouldAnimate ? { clipPath: 'inset(0 0 100% 0)' } : false}
            animate={shouldAnimate ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
            transition={
              shouldAnimate
                ? {
                    duration: 0.9,
                    delay: 0.5 + i * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }
                : undefined
            }
          >
            {l}
          </motion.span>
        ))}

        <motion.svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute pointer-events-none"
          style={{
            top: '-0.04em',
            right: '0.06em',
            width: '0.18em',
            height: '0.22em',
          }}
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={shouldAnimate ? { opacity: 1 } : undefined}
          transition={
            shouldAnimate
              ? { duration: 0.4, delay: accentDelay, ease: [0.16, 1, 0.3, 1] }
              : undefined
          }
        >
          <path d="M62 4 L88 4 L50 88 L24 88 Z" fill="currentColor" />
        </motion.svg>
      </span>
    </span>
  );
}
