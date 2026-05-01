/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@tanstack/react-query")) {
              return "react-query";
            }
            if (id.includes("@tanstack/react-router")) {
              return "tanstack-router";
            }
            if (id.includes("react-dom") || id.includes("/react/")) {
              return "react-vendor";
            }
          }
        }
      }
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    exclude: ["**/node_modules/**", "**/dist/**", "e2e/**"]
  }
});

