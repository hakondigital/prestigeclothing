type IconProps = { size?: number; className?: string };

const stroke = 1.25;
const base = 'inline-block';

export const ArrowNE = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden className={`${base} ${className ?? ''}`}>
    <path d="M4 12 L12 4" strokeLinecap="square" />
    <path d="M5 4 H12 V11" strokeLinecap="square" />
  </svg>
);

export const ArrowRight = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden className={`${base} ${className ?? ''}`}>
    <path d="M2 8 H14" strokeLinecap="square" />
    <path d="M9 3 L14 8 L9 13" strokeLinecap="square" />
  </svg>
);

export const Cart = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden className={`${base} ${className ?? ''}`}>
    <path d="M2 4 H4 L6 13 H15 L16 6 H5" strokeLinejoin="miter" strokeLinecap="square" />
    <circle cx="7" cy="16" r="0.6" fill="currentColor" />
    <circle cx="14" cy="16" r="0.6" fill="currentColor" />
  </svg>
);

export const Search = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden className={`${base} ${className ?? ''}`}>
    <circle cx="8" cy="8" r="5.25" />
    <path d="M12 12 L16 16" strokeLinecap="square" />
  </svg>
);

export const Close = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden className={`${base} ${className ?? ''}`}>
    <path d="M3 3 L15 15" strokeLinecap="square" />
    <path d="M15 3 L3 15" strokeLinecap="square" />
  </svg>
);

export const Plus = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden className={`${base} ${className ?? ''}`}>
    <path d="M8 2 V14" strokeLinecap="square" />
    <path d="M2 8 H14" strokeLinecap="square" />
  </svg>
);
