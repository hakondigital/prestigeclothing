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
      '/lookbook/03.jpg',
      '/lookbook/04.jpg',
      '/lookbook/05.jpg',
      '/lookbook/02.jpg',
      '/lookbook/01.jpg',
      '/lookbook/09.jpg',
    ],
    description:
      'A blunt rewrite of the white tee. Boxed silhouette, dropped shoulder, longer body, raw hem. Embroidered wordmark at the front. The piece you reach for when you have nothing left to prove.',
  },
  {
    slug: 'heavyweight-muscle-tank-ink',
    name: 'Heavyweight Muscle Tank',
    colorway: 'Ink',
    price: 99,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '320 GSM Brushed Cotton',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/06.jpg',
      '/lookbook/11.jpg',
      '/lookbook/08.jpg',
    ],
    description:
      'Cut, not finished. Sleeveless, raw at the armholes. Same heavyweight body as the tee, stripped to its frame. Worn open or layered. Quiet on the body, loud in the room.',
  },
  {
    slug: 'back-print-tee-ink',
    name: 'Back-Print Tee',
    colorway: 'Ink',
    price: 119,
    currency: 'AUD',
    drop: 'Drop No. 001',
    fabric: '320 GSM Brushed Cotton',
    weight: 'Heavyweight',
    sizes: SIZES,
    images: [
      '/lookbook/10.jpg',
      '/lookbook/07.jpg',
    ],
    description:
      'Wordmark across the back, oversized and unsubtle. Boxed silhouette, raw shoulder, dropped through the body. A tee that announces itself when you walk away.',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(p: Product): string {
  return `AU $${p.price}`;
}
