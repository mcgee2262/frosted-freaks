import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Set VITE_BASE=/ for a root-domain deploy; GitHub Pages project sites use the repo name.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
