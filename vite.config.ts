import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  server: {
    port: 3005,
  },
  build: {
    outDir: 'dist',
  },
});