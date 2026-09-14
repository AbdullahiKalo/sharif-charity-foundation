/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          dark: 'var(--color-gold-dark)',
          // Text-safe pairings; see the note in _tokens.scss.
          'on-dark': 'var(--color-gold-on-dark)',
          'on-light': 'var(--color-gold-on-light)',
        },
        'bg-warm': 'var(--color-bg-warm)',
        'text-body': 'var(--color-text-body)',
        'text-muted': 'var(--color-text-muted)',
        'border-soft': 'var(--color-border-soft)',
      },
      fontFamily: {
        // Both families resolve to Arial. `font-serif` is kept as a named role
        // for headings so the hierarchy can be retargeted in one place later.
        serif: ['Arial', 'Helvetica', 'sans-serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
