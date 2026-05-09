import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className }: Props) {
  return <span className={`eyebrow tabular ${className ?? ''}`}>{children}</span>;
}
