import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['backbone', 'backbone.marionette', 'backbone.radio', 'jquery', 'underscore'],
          bootstrap: ['bootstrap'],
        },
      },
    },
  },
  plugins: [
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});