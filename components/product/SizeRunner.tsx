'use client';

import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { SIZES } from '@/lib/products';

type Props = {
  available?: ReadonlyArray<(typeof SIZES)[number]>;
  defaultSize?: (typeof SIZES)[number];
  onChange?: (size: (typeof SIZES)[number]) => void;
};

export default function SizeRunner({ available = SIZES, defaultSize = 'M', onChange }: Props) {
  const [active, setActive] = useState<(typeof SIZES)[number]>(defaultSize);

  return (
    <LayoutGroup>
      <div className="flex items-center gap-6 eyebrow">
        {available.map((s) => {
          const isActive = s === active;
          return (
            <button
              key={s}
              type="button"
              onClick={() => {
                setActive(s);
                onChange?.(s);
              }}
              className={`relative py-2 ${isActive ? 'text-current' : 'text-smoke hover:text-current transition-colors'}`}
              aria-pressed={isActive}
            >
              <span className="tabular">{s}</span>
              {isActive && (
                <motion.span
                  layoutId="size-underline"
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-current"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
