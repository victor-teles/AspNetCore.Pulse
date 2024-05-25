import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import viteTsconfigPaths from 'vite-tsconfig-paths';

const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'assets',

  },
  experimental: {
    renderBuiltUrl(filename) {
      if ((filename.includes('js') || filename.includes('css') || filename.includes('svg')) && isProd) {
        return `https://uiResourcePath/${filename}`
      }

      return { relative: true }
    }
  }
})
