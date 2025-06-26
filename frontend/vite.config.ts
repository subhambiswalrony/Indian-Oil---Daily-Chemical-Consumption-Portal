import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
