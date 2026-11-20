/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Burgundy & Champagne Design System
        brand: {
          burgundy: '#542334',    // Primary Burgundy
          secondary: '#873C50',    // Secondary Burgundy
          rose: '#B66A79',         // Muted Rose
          gold: '#C8A66B',         // Champagne Gold
          bg: '#F4EDE8',           // Champagne Background
          surface: '#FAF7F5',      // Subtle Surface
          border: '#E8DDD8',       // Border
          text: '#2D2528',         // Primary Text
          textMuted: '#75696B',    // Secondary Text
        },
        burgundy: {
          primary: '#542334',      // Sidebar, branding, primary identity
          secondary: '#873C50',    // Primary buttons, active nav, selected tabs
          muted: '#B66A79',        // Secondary accents, chart highlights
          dark: '#542334',
        },
        champagne: {
          bg: '#F4EDE8',           // Main application background
          gold: '#C8A66B',         // Premium highlights, metrics, decorative accents
          surface: '#FAF7F5',      // Subtle Surface & table header
          border: '#E8DDD8',       // Border tone
        },
        neutral: {
          primary: '#2D2528',      // Primary Text
          secondary: '#75696B',    // Secondary Text
          muted: '#9A8D8F',        // Muted Text & placeholders
          border: '#E8DDD8',       // Border
          subtle: '#FAF7F5',       // Subtle Surface
        },
        semantic: {
          success: '#21845A',
          successBg: '#E8F4ED',
          warning: '#B7791F',
          warningBg: '#FFF4DF',
          error: '#C44747',
          errorBg: '#FCECEC',
          info: '#3976B8',
          infoBg: '#EAF2FA',
        },
        // Backward-compatible shades mapped to Burgundy & Champagne system
        mocha: {
          50: '#FAF7F5',
          100: '#F4EDE8',
          200: '#E8DDD8',
          300: '#E8DDD8',
          400: '#B66A79',
          500: '#873C50',
          600: '#873C50',
          700: '#542334',
          800: '#542334',
          900: '#2D2528',
          950: '#2D2528',
        },
        gold: {
          400: '#C8A66B',
          500: '#C8A66B',
          600: '#B7791F',
        }
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        hanken: ['"Hanken Grotesk"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        manrope: ['"Hanken Grotesk"', 'sans-serif'],
        poppins: ['"Hanken Grotesk"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
