import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: './',
  server: {
    port: 3005,
  },
  build: {
    outDir: 'dist',
  },
});