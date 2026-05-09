'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  className?: string;
  /** Applied to the letter row specifically (not the accent SVG). Use for
   *  blend modes that should affect only the type, e.g. `mix-blend-difference`. */
  letterClassName?: string;
  /** When true, plays the letter-by-letter reveal once on mount. */
  animate?: boolean;
};

const LETTERS = ['P', 'R', 'E', 'S', 'T', 'I', 'G', 'E'] as const;

/**
 * Hero wordmark — "PRESTIGÉ".
 *
 * The acute accent over the final E renders as a separate gradient-filled SVG
 * positioned over the right side of the letter row. It sits as a SIBLING of
 * the letter row (not a child), so:
 *   1. The per-letter clip-path mask can't clip the accent away.
 *   2. Blend modes applied to the letter row don't mangle the accent's
 *      gradient colors.
 */
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
      </span>

      {/* Accent — sibling of letter row. Position is relative to the outer
          wordmark span which is the same bounding box as the letter row. */}
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
        <defs>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF1F8F" />
            <stop offset="50%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#FFC400" />
          </linearGradient>
        </defs>
        <path d="M62 8 L92 0 L42 92 L12 84 Z" fill="url(#accentGrad)" />
      </motion.svg>
    </span>
  );
}
