import { createRouter } from "@tanstack/react-router";

import { indexRoute } from "./routes";
import { rootRoute } from "./routes/root";

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({ routeTree });

