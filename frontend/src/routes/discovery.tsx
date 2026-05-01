import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const discoveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discovery",
  component: lazyRouteComponent(() => import("./discovery.page"), "DiscoveryPage")
});
