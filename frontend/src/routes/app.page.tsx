import { Navigate } from "@tanstack/react-router";

import { useAuth } from "../auth/auth-context";
import { getAppGateState } from "./app-gate";

export function AppHome() {
  const auth = useAuth();
  const state = getAppGateState(auth.isBootstrapping, auth.isAuthenticated);

  if (state === "loading") {
    return <p>Loading session...</p>;
  }

  if (state === "redirect") {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2>Your letter space</h2>
      <p>Signed in as {auth.email}</p>
    </section>
  );
}
