import { createRoute } from "@tanstack/react-router";

import { useAuth } from "../auth/auth-context";
import { rootRoute } from "./root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage
});

function HomePage() {
  const auth = useAuth();
  return (
    <p>
      {auth.isAuthenticated
        ? "Welcome back. Open your inbox from navigation."
        : "Welcome to Letteranne. Sign up or log in to continue."}
    </p>
  );
}

