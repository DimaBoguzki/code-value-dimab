import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve( __dirname, 'src' ) },
    ],
  },
  define: {
    'process.env': { ...process.env }
  }
})
