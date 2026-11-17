/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          accent: '#10b981', // Clean accessible emerald
        },
        surface: {
          dark: '#121316',
          'dark-card': '#1a1c22',
          'dark-muted': '#252830',
          'dark-border': '#2e323b',
          light: '#f8fafc',
          'light-card': '#ffffff',
          'light-muted': '#f1f5f9',
          'light-border': '#e2e8f0',
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

