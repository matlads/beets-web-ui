import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  // For GitHub Pages deployment, set base to repository name
  // Can be overridden with VITE_BASE_PATH environment variable
  const base = process.env.VITE_BASE_PATH || '/';

  return {
    base,
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
  };
});
