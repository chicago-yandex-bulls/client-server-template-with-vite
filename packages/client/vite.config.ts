import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    https: true,
  },
  preview: {
    port: Number(process.env.PORT) || Number(process.env.CLIENT_PORT) || 3000,
  },
  plugins: [react(), mkcert()],
  build: {
    minify: mode === 'production',
  },
  ssr: {
    target: 'node',
    format: 'cjs',
  },
}));
