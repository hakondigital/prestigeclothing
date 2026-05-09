import HaloDot from './HaloDot';

const PHRASES = [
  'Wear The Mindset',
  'Prestigé',
  'Drop 001',
  'Unisex Streetwear',
  'Sydney',
  'Coming 2026',
];

export default function Marquee() {
  const sequence = [...PHRASES, ...PHRASES];
  return (
    <div
      className="relative w-full overflow-hidden hairline-tb py-4 select-none"
      role="presentation"
    >
      <div className="marquee-track">
        {sequence.map((p, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 eyebrow whitespace-nowrap text-bone/80"
          >
            <span>{p}</span>
            <HaloDot size={8} />
          </span>
        ))}
      </div>
    </div>
  );
}
