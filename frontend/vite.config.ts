import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects',
          dest: '.', // copy to `dist/` root
        },
      ],
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
