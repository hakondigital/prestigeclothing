'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const MotionLink = motion.create(Link);

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
};

export default function MagneticLink({
  href,
  children,
  className,
  radius = 80,
  strength = 0.25,
  external = false,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </MotionLink>
  );
}

/**
 * Magnetic <button> variant for in-form submits where wrapping a button in an
 * <a> would be invalid.
 */
export function MagneticButton({
  children,
  className,
  radius = 80,
  strength = 0.25,
  type = 'button',
  ariaLabel,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    if (Math.hypot(dx, dy) > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={className}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
