import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

import { login } from "../auth/auth-api";
import { ApiUnauthorizedError } from "../api/http-client";
import { useAuth } from "../auth/auth-context";
import { validateEmail, validatePassword } from "../auth/validation";
import { rootRoute } from "./root";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage
});

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setError(emailError ?? passwordError);
      return;
    }

    try {
      await login({ email, password });
      auth.signIn(email);
      navigate({ to: "/app" });
    } catch (error) {
      if (error instanceof ApiUnauthorizedError) {
        setError("Invalid credentials");
        return;
      }
      setError("Unable to sign in right now");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <h2>Login</h2>
      <label>
        Email
        <input value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error ? <p role="alert">{error}</p> : null}
      <button type="submit">Sign in</button>
      <p>
        Need an account? <Link to="/signup">Create one</Link>
      </p>
    </form>
  );
}

