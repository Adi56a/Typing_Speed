/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react';
          }
          if (id.includes('src/features/games') || id.includes('src/pages/TypingGamesPage')) {
            return 'games';
          }
          if (id.includes('src/pages/SscTypingTestPage')) {
            return 'ssc';
          }
          if (id.includes('src/pages/TypingLessonsPage') || id.includes('src/pages/TypingPracticePage')) {
            return 'lessons';
          }
        },
      },
    },
    target: 'es2020',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
});

