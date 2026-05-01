import { Link, Outlet } from "@tanstack/react-router";

import { useAuth } from "../auth/auth-context";
import { GlobalErrorBanner } from "./global-error-banner";

export const AppShell = () => {
  const auth = useAuth();

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "1rem", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.25rem" }}>Letteranne</h1>
        <nav style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/">Home</Link>
          {auth.isAuthenticated ? (
            <>
              <Link to="/app">Inbox</Link>
              <Link to="/compose">Compose</Link>
              <Link to="/history">History</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/discovery">Discovery</Link>
              <Link to="/open-letters">Open letters</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
      <section style={{ marginTop: "1rem" }}>
        <GlobalErrorBanner />
        <Outlet />
      </section>
    </main>
  );
};

