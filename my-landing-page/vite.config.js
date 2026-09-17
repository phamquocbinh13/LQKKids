import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        adminLogin: resolve(__dirname, 'admin/login.html'),
        adminEdit: resolve(__dirname, 'admin/edit-product.html'),
        adminContent: resolve(__dirname, 'admin/content.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
