import HaloDot from './HaloDot';

type Props = {
  size?: number;
};

export default function Lockup({ size = 22 }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none" aria-label="Prestigé">
      <HaloDot size={size} />
      <span className="wordmark text-[14px] leading-none tracking-[0.04em]">PRESTIGÉ</span>
    </span>
  );
}
