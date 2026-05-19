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
        ink: {
          950: '#0A0A0A',
          900: '#111111',
          800: '#1A1A1A',
          700: '#222222',
          600: '#2A2A2A',
        },
        forest: {
          900: '#1F231F',
          800: '#2A302A',
          700: '#3A403A',
          600: '#4A524A',
          500: '#5C685C',
          400: '#7A8779',
        },
        safety: {
          700: '#B83A14',
          600: '#D9461A',
          500: '#FF5722',
          400: '#FF7547',
          300: '#FF9676',
        },
        bone: {
          50: '#F5F2EC',
          100: '#E6E2D7',
          200: '#C8C2B0',
          300: '#9C9580',
          400: '#6D6855',
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
        elev: '0 24px 60px -20px rgba(0, 0, 0, 0.7)',
        ring: '0 0 0 1px rgba(255, 87, 34, 0.5)',
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
