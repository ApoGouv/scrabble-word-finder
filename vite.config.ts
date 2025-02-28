import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // '@' maps to 'src'
    },
  },
  base: "/scrabble-word-finder/",
  build: {
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true, // Remove all console.* calls in production
      },
    },
  },
});
