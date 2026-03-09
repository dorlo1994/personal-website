import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/personal-website/',
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: 'jsx', // ensure jsx files are correctly parsed
    include: /src\/.*\.jsx?$/,
  },
  server: {
	  host: '0.0.0.0',
	  port: 5173,
	  strictPort: true,
	  allowedHosts: true,
  },
})
