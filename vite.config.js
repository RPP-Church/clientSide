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
        name: 'Church Attendance Scanner',
        short_name: 'Scanner',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007bff',
        icons: [
          {
            src: '/assets/RCCG_logo_400px 1.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/assets/RCCG_logo_400px 1.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/assets/RCCG_logo_400px 1.png',
            sizes: '192x192',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: '/assets/RCCG_logo_400px 1.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow'
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Optional: Set file size limit for caching
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
