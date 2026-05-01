import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "../.prodready/design/api/openapi.yaml"
    },
    output: {
      mode: "single",
      target: "src/api/client.ts",
      client: "fetch",
      prettier: true,
      clean: true
    }
  }
});

