import { useAuth } from "../auth/auth-context";

export function HomePage() {
  const auth = useAuth();
  return (
    <p>
      {auth.isAuthenticated
        ? "Welcome back. Open your inbox from navigation."
        : "Welcome to Letteranne. Sign up or log in to continue."}
    </p>
  );
}
