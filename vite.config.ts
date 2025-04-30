import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./node_modules", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "vue-router", "pinia", "pinia-plugin-persistedstate"],
          vuetify: ["vuetify", "vuetify/components", "vuetify/directives"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/send-email": {
        target: "http://127.0.0.1:8788", // Wrangler dev server
        changeOrigin: true, // Required for CORS
        secure: false,
      },
      "/portfolio": {
        target: "http://127.0.0.1:8788", // Wrangler dev server
        changeOrigin: true, // Required for CORS
        secure: false,
      },
    },
  },
});
