import { createRouter } from "@tanstack/react-router";

import { appRoute } from "./routes/app";
import { indexRoute } from "./routes";
import { loginRoute } from "./routes/login";
import { rootRoute } from "./routes/root";
import { signupRoute } from "./routes/signup";

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute, appRoute]);

export const router = createRouter({ routeTree });

