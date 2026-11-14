/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact Reference Brand Color Palette (Burgundy & Champagne)
        burgundy: {
          primary: '#873C50',    // Main brand identity, headings, primary buttons
          secondary: '#873C50',  // Secondary buttons, active states, primary chart series
          muted: '#B66A79',      // Highlights, secondary chart series, subtle accents
          dark: '#873C50',       // Exact Primary Burgundy
        },
        champagne: {
          bg: '#F4EDE8',         // Main page background
          gold: '#C8A66B',       // Premium highlights & special accents
          surface: '#FAF7F5',    // Subtle surface
          border: '#E8DDD8',     // Border tone
        },
        neutral: {
          primary: '#2D2528',    // Primary text
          secondary: '#75696B',  // Secondary text
          muted: '#9A8D8F',      // Muted text
          border: '#E8DDD8',     // Border
          subtle: '#FAF7F5',     // Subtle surface
        },
        semantic: {
          success: '#21845A',    // Completed, paid, available
          warning: '#B7791F',    // Pending, low stock, attention
          error: '#C44747',      // Cancelled, failed, overdue
          info: '#3976B8',       // Processing, informational
        },
        // Mapped aliases ensuring zero breakage across existing code
        mocha: {
          50: '#FAF7F5',
          100: '#F4EDE8',
          200: '#E8DDD8',
          300: '#E8DDD8',
          400: '#B66A79',
          500: '#873C50',
          600: '#873C50',
          700: '#873C50',
          800: '#873C50',
          900: '#2D2528',
          950: '#873C50',
        },
        gold: {
          400: '#D8BC86',
          500: '#C8A66B',
          600: '#B5955B',
        }
      },
      fontFamily: {
        sans: ['"Manrope"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        manrope: ['"Manrope"', 'sans-serif']
      }
    },
  },
  plugins: [],
}