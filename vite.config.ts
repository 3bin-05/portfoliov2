import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://ebin-reji.vercel.app',
      exclude: ['/googlee5d3d0ab480fb9c8']
    }),
    visualizer({ open: false, gzipSize: true })
  ],

  optimizeDeps: {
    include: ['framer-motion', 'react', 'react-dom'],
  },

  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; font-src 'self' https: data:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    }
  },

  build: {
    target: 'esnext',
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
      format: {
        comments: false,
      },
    } as any,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // React core — always loaded first
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          // Framer Motion — separate so it can be loaded in parallel
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion';
          }
          // Three.js / R3F (future-proofing)
          if (
            id.includes('node_modules/three/') ||
            id.includes('node_modules/@react-three/fiber/') ||
            id.includes('node_modules/@react-three/drei/')
          ) {
            return 'vendor-three';
          }
          // Everything else in node_modules
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
      } as any,
    },
  },
})
