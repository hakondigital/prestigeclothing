'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'section' | 'article' | 'p' | 'li';
};

export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: Props) {
  const reduce = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{
        duration: reduce ? 0.2 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Cmp>
  );
}
