type Props = {
  size?: number;
  ring?: number;
  className?: string;
};

export default function HaloDot({ size = 22, ring = 1.5, className }: Props) {
  const r = size / 2;
  const id = `halo-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF1F8F" />
          <stop offset="50%" stopColor="#FF6A00" />
          <stop offset="100%" stopColor="#FFC400" />
        </linearGradient>
      </defs>
      <circle cx={r} cy={r} r={r - ring / 2} fill="#0A0A0A" stroke={`url(#${id})`} strokeWidth={ring} />
    </svg>
  );
}
