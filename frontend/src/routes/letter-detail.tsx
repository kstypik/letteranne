import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const letterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/letters/$letterId",
  component: lazyRouteComponent(() => import("./letter-detail.page"), "LetterDetailPage")
});
