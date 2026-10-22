import { defineConfig } from 'vite';

export default defineConfig({
  base: '/alchemists-cauldron/',
  root: './',
  server: {
    port: 3005,
  },
  build: {
    outDir: 'dist',
  },
});