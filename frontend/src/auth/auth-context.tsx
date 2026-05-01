import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { clearSession, loadSession, persistSession } from "./session";

type AuthContextValue = {
  isAuthenticated: boolean;
  email: string | null;
  isBootstrapping: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const session = loadSession();
    setEmail(session?.email ?? null);
    setIsBootstrapping(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(email),
      email,
      isBootstrapping,
      signIn: (nextEmail: string) => {
        persistSession({ email: nextEmail });
        setEmail(nextEmail);
      },
      signOut: () => {
        clearSession();
        setEmail(null);
      }
    }),
    [email, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
};

