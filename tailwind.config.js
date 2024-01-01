/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        poppinsDark: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        xxs: ['0.65rem', { lineHeight: '1.325' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      screens: {
        xs: '480px',
        sm: '420px',
        md: '765px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        1.25: '0.3125rem',
        3.75: '0.9375rem',
        7.5: '1.875rem',
        12.5: '3.125rem',
        15: '3.75rem',
        25: '6.25rem',
        30: '7.5rem',
      },
    },
  },
  plugins: [],
};
