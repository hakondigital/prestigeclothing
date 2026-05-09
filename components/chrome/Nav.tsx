import Link from 'next/link';
import Lockup from './Lockup';
import SydneyTime from '../motion/SydneyTime';
import { Cart } from './Icons';

const NAV_ITEMS = [
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/cart', label: 'Cart' },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference text-bone">
      <Link href="/" aria-label="Prestigé — Home" className="block">
        <Lockup />
      </Link>

      <nav className="hidden md:flex items-center gap-8 eyebrow">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative inline-block hover:text-bone group"
          >
            <span>{item.label}</span>
            <span
              aria-hidden
              className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-[width] duration-500 ease-out-expo group-hover:w-full"
            />
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <SydneyTime className="hidden md:flex" />
        <Link
          href="/cart"
          aria-label="Cart"
          className="md:hidden inline-flex items-center"
        >
          <Cart />
        </Link>
      </div>
    </header>
  );
}
