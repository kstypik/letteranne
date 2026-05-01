import { Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

import { ApiUnauthorizedError } from "../api/http-client";
import { register } from "../auth/auth-api";
import { useAuth } from "../auth/auth-context";
import { validateEmail, validatePassword } from "../auth/validation";

export function SignupPage() {
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
      await register({ email, password });
      auth.signIn(email);
      navigate({ to: "/app" });
    } catch (error) {
      if (error instanceof ApiUnauthorizedError) {
        setError("Please sign in to continue");
        return;
      }
      setError("Unable to register with provided credentials");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <h2>Sign up</h2>
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
      <button type="submit">Create account</button>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}
