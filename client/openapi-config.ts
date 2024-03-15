import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
	schemaFile: "http://localhost:8000/api/schema/",
	apiFile: "./src/store/api.ts",
	apiImport: "api",
	outputFile: "./src/store/letteranneApi.ts",
	exportName: "letteranneApi",
	hooks: true,
};

export default config;
