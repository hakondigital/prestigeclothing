'use client';

import { useState } from 'react';
import { MagneticButton } from '@/components/motion/MagneticLink';
import Eyebrow from '@/components/type/Eyebrow';
import { ArrowRight } from '@/components/chrome/Icons';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error('bad');
      setStatus('sent');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      data-section-index={4}
      data-bg="ink"
      className="w-full py-32 md:py-48 px-6 md:px-10 text-center"
      aria-label="Earn early access"
    >
      <Eyebrow className="block text-bone/60 mb-10">04 / Access</Eyebrow>
      <h2 className="display text-bone leading-[0.95] tracking-tightest"
          style={{ fontSize: 'clamp(56px, 10vw, 156px)' }}>
        Earn Early Access.
      </h2>

      <form
        onSubmit={onSubmit}
        className="mt-14 mx-auto max-w-[520px] flex items-end gap-6"
        noValidate
      >
        <div className="field-wrap flex-1 text-left">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="field"
            aria-label="Email address"
            autoComplete="email"
          />
          <label htmlFor="email" className="field-label">Email address</label>
        </div>
        <MagneticButton
          type="submit"
          ariaLabel="Request early access"
          className="inline-flex items-center gap-2 pb-4 eyebrow tracking-meta uppercase text-bone hover:text-bone"
        >
          {status === 'sending' ? 'Sending' : status === 'sent' ? 'Welcome' : 'Request'}
          <ArrowRight />
        </MagneticButton>
      </form>

      <p className="eyebrow text-smoke mt-6" style={{ fontSize: '11px' }}>
        We send drops, not noise.
      </p>
      {status === 'sent' && (
        <p className="eyebrow text-bone/80 mt-4" role="status">You&apos;re on the list. Watch the inbox.</p>
      )}
      {status === 'error' && (
        <p className="eyebrow text-halo-1 mt-4" role="status">Something dropped — try again.</p>
      )}
    </section>
  );
}
