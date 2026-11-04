import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  root: './',
  plugins: [react()],
  server: {
    port: 3005,
  },
  build: {
    outDir: 'dist',
  },
});