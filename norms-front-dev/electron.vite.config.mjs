import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.SERVER_API_URL)
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    optimizeDeps: {
      include: [
        '@emotion/react', 
        '@emotion/styled', 
        '@mui/material/Tooltip'
      ],
    },
    plugins: [react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    })],
    server: {
      port: 5174,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: process.env.SERVER_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
  },
})
