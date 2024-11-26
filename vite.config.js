// Vite Configuration for Cubix-Gen Project
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/cubix-gen/', // Base path for GitHub Pages
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
