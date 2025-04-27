import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'RPP App',
        short_name: 'Scanner',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007bff',
        icons: [
          {
            src: '/src/assets/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
