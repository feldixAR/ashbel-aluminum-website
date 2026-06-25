import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ashbelContentEditorPlugin } from './tools/editor-dev-server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ashbel-aluminum-website/' : '/',
  plugins: [react(), tailwindcss(), ashbelContentEditorPlugin(__dirname)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
