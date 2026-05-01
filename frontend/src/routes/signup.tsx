import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { rootRoute } from "./root";

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: lazyRouteComponent(() => import("./signup.page"), "SignupPage")
});
