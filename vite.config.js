import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: '@', replacement: '/src'},
      {find: '@components', replacement: '/src/components'},
      {find: '@hooks', replacement: '/src/hooks'},
      {find: '@pages', replacement: '/src/pages'},
    ]
  },
});