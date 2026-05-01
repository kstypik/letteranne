import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export { getAppGateState } from "./app-gate";

export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: lazyRouteComponent(() => import("./app.page"), "AppHome")
});
