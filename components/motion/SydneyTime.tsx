'use client';

import { useEffect, useState } from 'react';

type Props = { className?: string };

export default function SydneyTime({ className }: Props) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Australia/Sydney',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`eyebrow tabular text-bone/80 inline-flex items-center gap-3 ${className ?? ''}`} aria-live="off">
      <span>Sydney / Worldwide</span>
      <span aria-hidden className="inline-block w-px h-3 bg-current/40" />
      <span suppressHydrationWarning>{time || '— — —'}</span>
    </div>
  );
}
