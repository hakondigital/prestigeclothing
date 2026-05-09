'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Wordmark from '@/components/type/Wordmark';

export default function Intro() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function dismiss() {
    document.body.style.overflow = '';
    setShow(false);
    window.dispatchEvent(new Event('prestige:entered'));
  }

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-paper text-ink overflow-hidden intro-root"
          role="dialog"
          aria-label="Prestigé — enter the site"
          aria-modal="true"
        >
          {/* Full-bleed ink blot video. Multiply blend so the white background
              stays paper-white and only the black ink reads through. */}
          {mounted && !reduce && (
            <video
              src="/intro/ink-blot.mp4"
              autoPlay
              muted
              loop
              playsInline
              // metadata only — browser doesn't pull the full 22 MB upfront,
              // streams as it plays
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply pointer-events-none"
              aria-hidden
            />
          )}

          {/* Top meta */}
          <div className="absolute top-6 left-6 md:left-10 z-20 eyebrow text-ink/60">
            Drop No. 001 — Coming 2026
          </div>
          <div className="absolute top-6 right-6 md:right-10 z-20 eyebrow text-ink/60">
            Sydney / Worldwide
          </div>

          {/* Centered wordmark.
              Letters use mix-blend-difference + bone fill so they auto-invert
              against the ink: render as black on the white ground, white on
              the black ink — never disappearing into either. The gradient
              accent on the É is OUTSIDE the blended layer so its colors stay
              true. */}
          <div className="relative z-10 h-full w-full flex items-center justify-center px-6">
            <motion.div
              layoutId="prestige-wordmark"
              layout="position"
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
              style={{ fontSize: 'clamp(96px, 18vw, 360px)' }}
            >
              <Wordmark
                className="block tracking-tightest"
                letterClassName="text-bone mix-blend-difference"
              />
            </motion.div>
          </div>

          {/* Bottom-center ENTER */}
          <div className="absolute bottom-10 md:bottom-14 left-0 right-0 flex flex-col items-center gap-4 z-20">
            <button
              type="button"
              onClick={dismiss}
              className="group relative px-10 md:px-14 py-4 md:py-5 eyebrow tracking-meta uppercase text-ink overflow-hidden"
              autoFocus
              aria-label="Enter site"
            >
              <span aria-hidden className="absolute inset-0 border border-ink" />
              <span
                aria-hidden
                className="absolute inset-0 bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-paper inline-flex items-center gap-3">
                Enter
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  aria-hidden
                >
                  <path d="M2 8 H14" strokeLinecap="square" />
                  <path d="M9 3 L14 8 L9 13" strokeLinecap="square" />
                </svg>
              </span>
            </button>
            <p className="eyebrow text-ink/50 text-[10px]">Press Enter, or tap</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
