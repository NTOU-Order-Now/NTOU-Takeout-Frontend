import path from "path"
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Order-Now-Frontend/",
  resolve: {
    alias: {
      "@": path.resolve(-__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})
