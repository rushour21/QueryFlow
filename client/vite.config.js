import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base public path when served in production
  base: '/',
  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})