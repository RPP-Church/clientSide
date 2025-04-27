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
            src: '/src/assets/web1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/web2.png',
            sizes: '512x512',
            type: 'image/png',
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
