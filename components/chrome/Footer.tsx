import Link from 'next/link';
import Lockup from './Lockup';
import { ArrowNE } from './Icons';

const COLS = [
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/cart', label: 'Cart' },
  { href: 'https://instagram.com/prestigeclothingwear', label: 'Instagram', external: true },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink text-bone hairline-t pt-16 pb-0 overflow-hidden">
      <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        <div className="space-y-5">
          <Lockup />
          <p className="eyebrow text-smoke max-w-[28ch] leading-relaxed">
            © 2026 Prestigé — All rights reserved — Sydney
          </p>
        </div>

        <nav className="md:justify-self-center grid grid-cols-2 gap-x-10 gap-y-2 eyebrow">
          {COLS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group inline-flex items-center gap-1.5 text-bone/80 hover:text-bone transition-colors"
            >
              <span>{c.label}</span>
              {c.external && <ArrowNE size={11} />}
            </Link>
          ))}
        </nav>

        <div className="md:justify-self-end eyebrow text-smoke space-y-2 max-w-[26ch]">
          <p>Built in Sydney for those moving worldwide.</p>
          <p>Press & wholesale: studio@prestigeclothingwear.com</p>
        </div>
      </div>

      <div
        aria-hidden
        className="relative mt-16 -mb-[18%] md:-mb-[22%] overflow-hidden pointer-events-none select-none"
      >
        <h2 className="display text-concrete leading-[0.85] text-center"
            style={{ fontSize: 'clamp(120px, 26vw, 520px)' }}>
          PRESTIGÉ
        </h2>
      </div>
    </footer>
  );
}
