import ProductImage from './ProductImage';

type Props = {
  images: string[];
  alt: string;
};

export default function ImageStack({ images, alt }: Props) {
  return (
    <div className="space-y-3 md:space-y-4">
      {images.map((src, i) => (
        <div key={src + i} className="relative w-full aspect-[4/5]">
          <ProductImage
            src={src}
            alt={`${alt} — view ${i + 1}`}
            priority={i === 0}
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
