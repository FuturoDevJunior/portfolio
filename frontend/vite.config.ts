import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge']
        }
      }
    }
  },
  // Configurações para resolver problemas de CORS durante desenvolvimento
  server: {
    cors: true,
    proxy: {
      // Redirecionar solicitações para API durante desenvolvimento
      '/api': {
        target: process.env.VITE_API_URL || 'https://api.devferreirag.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
