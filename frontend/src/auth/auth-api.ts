import { apiRequest } from "../api/http-client";

type AuthPayload = {
  email: string;
  password: string;
};

type AuthSuccess = {
  email?: string;
  detail?: string;
};

export const register = (payload: AuthPayload): Promise<AuthSuccess> =>
  apiRequest<AuthSuccess>("/auth/register", { method: "POST", body: payload });

export const login = (payload: AuthPayload): Promise<AuthSuccess> =>
  apiRequest<AuthSuccess>("/auth/login", { method: "POST", body: payload });

