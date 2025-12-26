import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // GSAP chunk
          'gsap-vendor': ['gsap', '@gsap/react'],
          // Icons chunk
          'icons': ['lucide-react', 'react-icons'],
        },
      },
    },
    // Reduce chunk size warning threshold
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps for debugging (disable for smaller bundles)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', '@gsap/react'],
  },
  // Server configuration for development
  server: {
    // Enable HMR
    hmr: true,
  },
  // CSS configuration
  css: {
    devSourcemap: true,
  },
});
