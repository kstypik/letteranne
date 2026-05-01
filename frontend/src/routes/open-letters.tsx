import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const openLettersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/open-letters",
  component: lazyRouteComponent(() => import("./open-letters.page"), "OpenLettersPage")
});
