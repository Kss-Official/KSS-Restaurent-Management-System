/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact User 3-Color Palette: #55352F, #754D45, #A2766B
        burgundy: {
          primary: '#55352F',    // Dark Espresso (#55352F)
          secondary: '#754D45',  // Medium Terracotta (#754D45)
          muted: '#A2766B',      // Soft Rose Taupe (#A2766B)
          dark: '#55352F',       // Primary Deep Dark (#55352F)
        },
        champagne: {
          bg: '#F4EDE8',         // Main page background
          gold: '#A2766B',       // Accent highlight (#A2766B)
          surface: '#FAF7F5',    // Subtle surface
          border: '#E8DDD8',     // Border tone
        },
        neutral: {
          primary: '#55352F',    // Primary text (#55352F)
          secondary: '#754D45',  // Secondary text (#754D45)
          muted: '#A2766B',      // Muted text (#A2766B)
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
          400: '#A2766B',
          500: '#754D45',
          600: '#754D45',
          700: '#55352F',
          800: '#55352F',
          900: '#55352F',
          950: '#55352F',
        },
        gold: {
          400: '#A2766B',
          500: '#A2766B',
          600: '#754D45',
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