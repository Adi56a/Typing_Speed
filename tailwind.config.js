/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Logo Primary: Muted Spruce Teal ("TS" monogram in mountain crest)
        brand: {
          50: '#f1f6f7',
          100: '#ddeaf0',
          200: '#bfd7e0',
          300: '#94becc',
          400: '#68a1b2',
          500: '#4a8292', // Primary TS Spruce Teal (Matches logo monogram)
          600: '#3d6d7c',
          700: '#345966',
          800: '#2f4b56',
          900: '#294049',
          950: '#17272e',
          accent: '#4a8292',
        },
        // Logo Mountain Accent: Warm Terracotta Rust (Right mountain slopes)
        terracotta: {
          50: '#faf4f2',
          100: '#f4e7e2',
          200: '#ead0c7',
          300: '#dbb1a3',
          400: '#ca8e7a',
          500: '#b96c54', // Mountain Terracotta
          600: '#a65841',
          700: '#8a4633',
          800: '#733b2d',
          900: '#603429',
          950: '#341913',
        },
        // Logo Sun Accent: Warm Golden Ochre (Central sunrise glow)
        ochre: {
          50: '#fefaf3',
          100: '#fbf1de',
          200: '#f4e0bc',
          300: '#eccb92',
          400: '#e1b267',
          500: '#d59744', // Sunrise Ochre
          600: '#bc7b34',
          700: '#995e2a',
          800: '#7c4c26',
          900: '#673f23',
          950: '#3a200f',
        },
        // Logo Pine Accent: Earthy Mountain Sage (Left mountain slopes & pine line-art)
        sage: {
          50: '#f4f6f4',
          100: '#e5ebe5',
          200: '#cbd8cc',
          300: '#a6bea8',
          400: '#7f9f82',
          500: '#648568', // Mountain Sage Pine
          600: '#4f6c53',
          700: '#405643',
          800: '#364638',
          900: '#2d3b2f',
          950: '#162017',
        },
        // Warm Canvas & Mountain Twilight Surfaces
        surface: {
          // Warm organic canvas ivory exactly matching logo background #f8f6f4
          light: '#f8f6f1',
          'light-card': '#ffffff',
          'light-muted': '#f0ebe2',
          'light-border': '#e4ded4',
          // Mountain nocturnal spruce dark surfaces
          dark: '#131716',
          'dark-card': '#1b2220',
          'dark-muted': '#242c2a',
          'dark-border': '#2d3835',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'Consolas', 'monospace'],
      },
      screens: {
        xs: '360px',
      },
    },
  },
  plugins: [],
};
