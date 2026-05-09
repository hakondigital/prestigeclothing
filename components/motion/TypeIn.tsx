'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  className?: string;
  /** Delay in ms before typing starts. */
  delay?: number;
  /** Per-character speed in ms. */
  speed?: number;
  caret?: boolean;
};

export default function TypeIn({ text, className, delay = 0, speed = 22, caret = true }: Props) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setInterval>;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }
    t1 = setTimeout(() => {
      let i = 0;
      t2 = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(t2);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, [text, delay, speed]);

  return (
    <span className={className} aria-label={text}>
      <span suppressHydrationWarning>{out}</span>
      {caret && (
        <span
          aria-hidden
          className={`inline-block w-[0.5ch] -mb-0.5 ${done ? 'animate-caret-blink' : ''}`}
        >
          ▍
        </span>
      )}
    </span>
  );
}
