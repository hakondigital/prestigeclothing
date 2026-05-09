export type Product = {
  slug: string;
  name: string;
  colorway: string;
  price: number;
  currency: 'AUD';
  drop: string;
  fabric: string;
  weight: string;
  sizes: ReadonlyArray<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>;
  images: string[];
  description: string;
};

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const PRODUCTS: Product[] = [
  {
    slug: 'oversized-heavyweight-tee-ivory',
    name: 'Oversized Heavyweight Tee',
    colorway: 'Ivory',
    price: 109,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '320 GSM Brushed Cotton',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/01.png',
      '/lookbook/02.png',
      '/lookbook/03.jpg',
      '/lookbook/04.jpg',
    ],
    description:
      'A blunt rewrite of the white tee. Boxed silhouette, dropped shoulder, longer body. Garment-washed for a worn hand. The piece you reach for when you have nothing left to prove.',
  },
  {
    slug: 'raw-hem-tank-ink',
    name: 'Raw-Hem Tank',
    colorway: 'Ink',
    price: 89,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '260 GSM Combed Cotton',
    weight: 'Mid',
    sizes: SIZES,
    images: [
      '/lookbook/05.jpg',
      '/lookbook/06.jpg',
      '/lookbook/07.jpg',
      '/lookbook/08.jpg',
    ],
    description:
      'Cut, not finished. Sleeveless, raw at the hem and armholes. Worn open or layered. Quiet on the body, loud in the room.',
  },
  {
    slug: 'longline-tee-bone',
    name: 'Longline Tee',
    colorway: 'Bone',
    price: 119,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '300 GSM Cotton Jersey',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/09.jpg',
      '/lookbook/10.jpg',
      '/lookbook/11.jpg',
      '/lookbook/12.jpg',
    ],
    description:
      'Long body, curved hem, dropped shoulder. Built to fall over the waist of denim or work pant. Bone — the warmer side of off-white.',
  },
  {
    slug: 'cropped-muscle-ink',
    name: 'Cropped Muscle',
    colorway: 'Ink',
    price: 99,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '280 GSM Ringspun Cotton',
    weight: 'Mid',
    sizes: SIZES,
    images: [
      '/lookbook/13.jpg',
      '/lookbook/14.jpg',
      '/lookbook/15.jpg',
      '/lookbook/16.jpg',
    ],
    description:
      'Cropped above the hip. Sleeveless, neckline cut wide. Worn close to the body. A piece for warm cities and unstudied confidence.',
  },
  {
    slug: 'studio-tee-ash',
    name: 'Studio Tee',
    colorway: 'Ash',
    price: 109,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '300 GSM Heavyweight Cotton',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/17.jpg',
      '/lookbook/18.jpg',
      '/lookbook/19.jpg',
      '/lookbook/20.png',
    ],
    description:
      'A neutral mid-grey, dyed in the same bath as the rest of the drop. The tee that wears every other piece in the wardrobe.',
  },
  {
    slug: 'curved-hem-tee-ink',
    name: 'Curved-Hem Tee',
    colorway: 'Ink',
    price: 109,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '300 GSM Cotton Jersey',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/21.jpg',
      '/lookbook/22.jpg',
      '/lookbook/23.jpg',
      '/lookbook/24.jpg',
    ],
    description:
      'A curved hem that catches the eye but never asks for it. Built around the body, never around the trend.',
  },
  {
    slug: 'heavy-tank-bone',
    name: 'Heavy Tank',
    colorway: 'Bone',
    price: 99,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '280 GSM Heavy Jersey',
    weight: 'Heavyweight for a tank',
    sizes: SIZES,
    images: [
      '/lookbook/25.jpg',
      '/lookbook/26.jpg',
      '/lookbook/27.jpg',
      '/lookbook/28.jpg',
    ],
    description:
      'Tank weight, tee construction. Holds shape. Worn solo, layered, sweated through. A summer staple cut for permanence.',
  },
  {
    slug: 'press-tee-ivory',
    name: 'Press Tee',
    colorway: 'Ivory',
    price: 119,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '320 GSM Heavy Cotton',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/29.jpg',
      '/lookbook/30.jpg',
      '/lookbook/31.jpg',
      '/lookbook/32.jpg',
    ],
    description:
      'Pressed from a single weight of cotton, no stretch, no second-thoughts. Straight shoulder, square chest, true to the studio cut.',
  },
  {
    slug: 'long-tank-ink',
    name: 'Long Tank',
    colorway: 'Ink',
    price: 99,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '260 GSM Combed Cotton',
    weight: 'Mid',
    sizes: SIZES,
    images: [
      '/lookbook/33.jpg',
      '/lookbook/34.jpg',
      '/lookbook/35.jpg',
      '/lookbook/36.jpg',
    ],
    description:
      'Longer body, narrower shoulder strap. Reads tank, wears tee. The transitional piece between this drop and the next.',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(p: Product): string {
  return `AU $${p.price}`;
}
