import { defineConfig } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./frontend/e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true
  },
  ...(!isCI
    ? {
        webServer: {
          command: "pnpm --dir frontend dev --host 127.0.0.1 --port 5173",
          url: "http://127.0.0.1:5173",
          reuseExistingServer: true
        }
      }
    : {})
});

