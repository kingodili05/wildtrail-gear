import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Dark navy authority surfaces (hero, footer, key cells) ──
        navy: {
          950: '#050A1F',
          900: '#0A1733',
          800: '#0F2147',
          700: '#173063',
          600: '#1F4083',
          500: '#2C5AA8',
          400: '#4F7DCE',
          300: '#8AA6DD',
        },
        // ── Warm ivory retailer body ─────────────────────────────
        ivory: {
          50: '#FAFAF7',
          100: '#F2F1EB',
          200: '#E2E0D6',
          300: '#CFCDC0',
        },
        graphite: {
          900: '#14140F',
          800: '#1F1F1A',
          700: '#2D2D27',
          500: '#67675E',
          400: '#8A8A80',
          300: '#B5B5AC',
        },
        // ── Razor accent ─────────────────────────────────────────
        red: {
          700: '#9B1A21',
          600: '#BF252D',
          500: '#DD2A2A',
          400: '#E85059',
          300: '#F08389',
        },

        // ── Legacy aliases so existing components keep resolving ─
        ink: {
          950: '#050A1F',
          900: '#0A1733',
          800: '#0F2147',
          700: '#173063',
          600: '#1F4083',
        },
        forest: {
          900: '#0A1733',
          800: '#0F2147',
          700: '#173063',
          600: '#1F4083',
          500: '#2C5AA8',
          400: '#4F7DCE',
        },
        safety: {
          700: '#9B1A21',
          600: '#BF252D',
          500: '#DD2A2A',
          400: '#E85059',
          300: '#F08389',
        },
        bone: {
          50: '#FAFAF7',
          100: '#F2F1EB',
          200: '#E2E0D6',
          300: '#B5B5AC',
          400: '#8A8A80',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-rajdhani)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.3em' }],
      },
      letterSpacing: {
        ultra: '0.3em',
      },
      boxShadow: {
        elev: '0 24px 60px -20px rgba(5, 10, 31, 0.45)',
        ring: '0 0 0 1px rgba(221, 42, 42, 0.55)',
        card: '0 1px 3px rgba(20, 20, 15, 0.06), 0 8px 24px -12px rgba(20, 20, 15, 0.12)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        pulse: 'pulse 1.8s ease-in-out infinite',
        fadeUp: 'fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        ticker: 'ticker 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
