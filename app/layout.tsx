import type { Metadata, Viewport } from 'next';
import { Inter, Anton, Bebas_Neue } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/chrome/SmoothScroll';
import CustomCursor from '@/components/chrome/CustomCursor';
import BackgroundLerp from '@/components/chrome/BackgroundLerp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
  weight: ['400'],
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prestigeclothingwear.com'),
  title: {
    default: 'Prestigé — Wear The Mindset',
    template: '%s — Prestigé',
  },
  description:
    'Prestigé is not a label. It is a posture. Unisex streetwear from Sydney — Drop 001 coming 2026.',
  openGraph: {
    title: 'Prestigé — Wear The Mindset',
    description:
      'Unisex streetwear from Sydney. Drop 001 coming 2026. Earn early access.',
    url: 'https://prestigeclothingwear.com',
    siteName: 'Prestigé',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prestigé — Wear The Mindset',
    description: 'Unisex streetwear from Sydney. Drop 001 coming 2026.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${bebas.variable}`}>
      <body className="antialiased relative min-h-screen text-bone">
        <BackgroundLerp />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
