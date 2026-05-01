import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const composeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compose",
  component: lazyRouteComponent(() => import("./compose.page"), "ComposePage")
});
