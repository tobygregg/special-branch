/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Special Branch – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      // "short" = laptop screens that are wide but not very tall (e.g. 1280×720)
      screens: {
        xs: '400px',
        short: { raw: '(min-width: 1024px) and (max-height: 820px)' },
      },
      colors: {
        // Deep forest green – the shaded conifers in the Facebook cover photo (#172928)
        forest: {
          950: '#0f1f19',
          900: '#16291f',
          800: '#1e3a2c',
          700: '#2a4d3a',
          600: '#3b664c',
          500: '#4f7d5d',
        },
        // Leaf greens – used in the tree illustrations and soft backgrounds
        leaf: {
          50: '#f4f7ee',
          100: '#e8eedc',
          200: '#d4e0c0',
          300: '#b3c991',
          400: '#8eb06a',
          500: '#6b904c',
        },
        // Bark / olive – the trunks and timber in the cover photo (#776738, #463817)
        bark: {
          300: '#c9a978',
          400: '#a8865a',
          500: '#8a6a3c',
          600: '#6b5130',
        },
        // Logo red – the roundel in the Special Branch logo (#f83839)
        brand: {
          50: '#fdf0ef',
          100: '#fbdcda',
          400: '#ec5455',
          500: '#e23a3b',
          600: '#c92e30',
          700: '#a72527',
        },
        // Warm off-white page background
        paper: '#faf8f2',
        // Logo tree / lettering charcoal (#3c3434)
        char: '#3a3232',
      },
      fontFamily: {
        display: ['"Zilla Slab"', 'Rockwell', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(22,41,31,.06), 0 12px 32px -14px rgba(22,41,31,.22)',
        lift: '0 2px 4px rgba(22,41,31,.06), 0 26px 50px -18px rgba(22,41,31,.34)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
