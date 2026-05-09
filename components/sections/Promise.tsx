import WordReveal from '@/components/motion/WordReveal';
import Eyebrow from '@/components/type/Eyebrow';

export default function Promise() {
  return (
    <section
      data-section-index={2}
      data-bg="bone"
      className="section-bone w-full py-32 md:py-48 px-6 md:px-10 relative"
      aria-label="The promise"
    >
      <div className="max-w-[60ch] mx-auto">
        <Eyebrow className="block text-ink/60 mb-10">02 / The Promise</Eyebrow>
        <WordReveal
          className="text-[20px] md:text-[22px] leading-[1.45] tracking-[-0.005em] text-ink"
          highlights={['MINDSET', 'RAW', 'UNISEX', 'PRESTIGÉ', 'PRESTIGE']}
        >
          {`Prestigé is built on a single MINDSET — that what you wear is a posture, not a costume. The cuts are RAW. The construction is honest. The line is UNISEX, made for the body that owns the room without trying. PRESTIGÉ is for those who already know.`}
        </WordReveal>
      </div>
    </section>
  );
}
