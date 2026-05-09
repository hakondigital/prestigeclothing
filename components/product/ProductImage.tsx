'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function ProductImage({ src, alt, priority, sizes, className }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative w-full h-full skeleton ${className ?? ''}`}>
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? '(min-width: 768px) 50vw, 100vw'}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
