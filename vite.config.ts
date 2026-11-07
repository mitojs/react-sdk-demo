import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-sdk-demo/',
  plugins: [react()],
  build: { outDir: 'docs' },
})
