import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        bone: '#F4F1EC',
        paper: '#FFFFFF',
        ash: '#1A1A1A',
        smoke: '#6B6B6B',
        concrete: '#2A2A2A',
        halo: {
          1: '#FF1F8F',
          2: '#FF6A00',
          3: '#FFC400',
        },
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        wordmark: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        tighter: '-0.01em',
        meta: '0.08em',
        wide: '0.12em',
      },
      lineHeight: {
        display: '1.05',
        body: '1.45',
      },
      fontSize: {
        eyebrow: ['11px', { lineHeight: '1.2', letterSpacing: '0.08em' }],
        meta: ['12px', { lineHeight: '1.3', letterSpacing: '0.08em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'out-back-soft': 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      animation: {
        'scroll-down': 'scroll-down 1.6s var(--ease-out-expo) infinite',
        'caret-blink': 'caret-blink 1.05s steps(1) infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'marquee': 'marquee 60s linear infinite',
      },
      keyframes: {
        'scroll-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'caret-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      maxWidth: {
        '60ch': '60ch',
        '56ch': '56ch',
      },
    },
  },
  plugins: [],
};

export default config;
