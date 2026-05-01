import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: lazyRouteComponent(() => import("./profile.page"), "ProfilePage")
});
