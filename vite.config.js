import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = Number(process.env.PORT) || 5173
const host = process.env.HOST || '0.0.0.0'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host,
    port,
  },
  preview: {
    host,
    port,
  },
})
