// Vite Configuration for Cubix-Gen Project
target: 'esnext';

import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    port: 3000,
  },
  esbuild: {
    minify: true,
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
});
