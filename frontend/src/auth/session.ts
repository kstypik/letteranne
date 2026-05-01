const SESSION_KEY = "letteranne.auth.email";

export type AuthSession = {
  email: string;
};

export const loadSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const email = window.localStorage.getItem(SESSION_KEY);
  return email ? { email } : null;
};

export const persistSession = (session: AuthSession): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, session.email);
};

export const clearSession = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
};

