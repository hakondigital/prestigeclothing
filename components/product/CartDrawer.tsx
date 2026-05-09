'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Close } from '../chrome/Icons';

type Props = {
  open: boolean;
  onClose: () => void;
  items: Array<{ name: string; size: string; price: number }>;
};

export default function CartDrawer({ open, onClose, items }: Props) {
  const total = items.reduce((s, i) => s + i.price, 0);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40"
            aria-hidden
          />
          <motion.aside
            key="drawer"
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0%)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-label="Cart"
            className="fixed top-0 right-0 z-[60] h-full w-full sm:w-[440px] bg-ink/70 text-bone p-8 hairline-t"
            style={{ backdropFilter: 'blur(24px) saturate(140%)', WebkitBackdropFilter: 'blur(24px) saturate(140%)' }}
          >
            <div className="flex items-center justify-between hairline-b pb-5">
              <span className="eyebrow">Cart</span>
              <button onClick={onClose} aria-label="Close cart" className="p-1">
                <Close />
              </button>
            </div>

            <ul className="mt-8 space-y-6">
              {items.length === 0 ? (
                <li className="eyebrow text-smoke">No pieces yet — Drop 001 lands soon.</li>
              ) : (
                items.map((item, i) => (
                  <li key={i} className="flex justify-between hairline-b pb-5">
                    <div>
                      <p className="display text-[18px]">{item.name}</p>
                      <p className="eyebrow text-smoke mt-1">Size {item.size}</p>
                    </div>
                    <p className="eyebrow tabular">AU ${item.price}</p>
                  </li>
                ))
              )}
            </ul>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex justify-between eyebrow tabular hairline-t pt-5">
                <span>Subtotal</span>
                <span>AU ${total}</span>
              </div>
              <button
                type="button"
                disabled
                className="mt-5 w-full hairline-tb py-4 eyebrow tracking-meta uppercase text-current opacity-60"
              >
                Checkout — Drop 001 Coming 2026
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
