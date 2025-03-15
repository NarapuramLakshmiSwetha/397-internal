import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: ' https://narapuramlakshmiswetha.github.io/397-internal/', // Set the base path
});
