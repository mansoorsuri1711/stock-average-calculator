/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        // Navy + green + gold from Stock Average Calculator logo
        brand: {
          DEFAULT: '#0A1020',
          deep: '#060A14',
          soft: '#121A2E',
          glow: '#22C55E',
        },
        mist: '#121A2E',
        blush: '#0A1020',
        ink: '#E8EEF8',
        pink: {
          DEFAULT: '#22C55E',
          soft: '#4ADE80',
          deep: '#16A34A',
        },
        coral: {
          DEFAULT: '#22C55E',
          deep: '#16A34A',
        },
        violet: {
          DEFAULT: '#22C55E',
          soft: '#4ADE80',
          deep: '#16A34A',
        },
        lilac: '#86EFAC',
        teal: {
          DEFAULT: '#22C55E',
          deep: '#15803D',
        },
        sky: '#86EFAC',
        gold: '#F0B030',
        primary: '#0A1020',
        secondary: '#121A2E',
        accent: '#22C55E',
        sunrise: '#F0B030',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
    },
  },
  plugins: [],
}
