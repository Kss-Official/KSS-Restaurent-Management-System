/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mocha: {
          50: '#FAF6F0',
          100: '#F4ECE1',
          200: '#E6D7C3',
          300: '#D5BFA4',
          400: '#B88B5C',
          500: '#8E5B34',
          600: '#6F4E37', // Official Mocha Brown from reference
          700: '#563B29',
          800: '#3E271A',
          900: '#26160E',
          950: '#170B06',
        },
        gold: {
          400: '#E4BE75',
          500: '#C89B4A',
          600: '#A97C2F',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
