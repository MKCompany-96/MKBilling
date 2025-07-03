import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Jarrys-app/", // 👈 IMPORTANT: this is your repo name
  plugins: [react()],
})
