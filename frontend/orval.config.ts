import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "../.prodready/design/api/openapi.yaml"
    },
    output: {
      mode: "single",
      target: "src/api/openapi-generated.ts",
      client: "fetch",
      prettier: true,
      // Do not wipe `src/api/` — hooks and `http-client` live alongside generated types.
      clean: false
    }
  }
});

