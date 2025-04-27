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
        name: 'RPP App', // Name of the app
        short_name: 'RPP', // Short name of the app
        description: 'A church app for attendance and services', // App description
        start_url: '/', // The starting point of the app
        display: 'standalone', // Standalone mode (no browser UI)
        background_color: '#ffffff', // Background color of the splash screen
        theme_color: '#000000',
        icons: [
          {
            src: './src/assets/web1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './src/assets/web2.png',
            sizes: '512x512',
            type: 'image/png',
          
          },
        ],
        // screenshots: [
        //   {
        //     src: './src/assets/web4.jpg',
        //     sizes: '1280x800',
        //     type: 'image/png',
        //     form_factor: 'wide',
        //   },
        //   {
        //     src: './src/assets/web3.jpg',
        //     sizes: '360x640',
        //     type: 'image/png',
        //   },
        // ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Optional: Set file size limit for caching
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
