import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <main>
      <h1>Letteranne</h1>
      <Outlet />
    </main>
  )
});

