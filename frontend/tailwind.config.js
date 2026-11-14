/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact User 6-Color Palette: #38231F, #55352F, #754D45, #A2766B, #D0ADA0, #F2E5DB
        brand: {
          darkest: '#38231F',    // Darkest Espresso
          dark: '#55352F',       // Deep Mocha
          medium: '#754D45',     // Warm Terracotta
          accent: '#A2766B',     // Rose Taupe Accent
          muted: '#D0ADA0',      // Soft Beige Border
          light: '#F2E5DB',      // Light Linen Background
        },
        burgundy: {
          primary: '#38231F',    // Darkest Tone (#38231F)
          secondary: '#55352F',  // Secondary Dark (#55352F)
          muted: '#A2766B',      // Soft Rose Taupe (#A2766B)
          dark: '#38231F',       // Primary Deep Dark (#38231F)
        },
        champagne: {
          bg: '#F2E5DB',         // Main page background (#F2E5DB)
          gold: '#A2766B',       // Accent highlight (#A2766B)
          surface: '#F2E5DB',    // Subtle surface (#F2E5DB)
          border: '#D0ADA0',     // Border tone (#D0ADA0)
        },
        neutral: {
          primary: '#38231F',    // Primary text (#38231F)
          secondary: '#55352F',  // Secondary text (#55352F)
          muted: '#754D45',      // Muted text (#754D45)
          border: '#D0ADA0',     // Border (#D0ADA0)
          subtle: '#F2E5DB',     // Subtle surface (#F2E5DB)
        },
        semantic: {
          success: '#21845A',    // Completed, paid, available
          warning: '#B7791F',    // Pending, low stock, attention
          error: '#C44747',      // Cancelled, failed, overdue
          info: '#3976B8',       // Processing, informational
        },
        // Mapped aliases ensuring zero breakage across existing code
        mocha: {
          50: '#F2E5DB',
          100: '#F2E5DB',
          200: '#D0ADA0',
          300: '#D0ADA0',
          400: '#A2766B',
          500: '#754D45',
          600: '#754D45',
          700: '#38231F',
          800: '#38231F',
          900: '#38231F',
          950: '#38231F',
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