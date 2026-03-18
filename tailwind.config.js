/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#ffd1dc',
          blue: '#aec6cf',
          yellow: '#fdfd96',
          green: '#77dd77',
          purple: '#b39eb5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        handwriting: ['Dancing Script', 'cursive'],
      }
    },
  },
  plugins: [],
}
