import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: lazyRouteComponent(() => import("./history.page"), "HistoryPage")
});
