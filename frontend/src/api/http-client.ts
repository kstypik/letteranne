export class ApiUnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "ApiUnauthorizedError";
  }
}

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestOptions = {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  onUnauthorized?: () => void;
};

const getCsrfTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("csrftoken="));

  return value ? decodeURIComponent(value.split("=")[1] ?? "") : null;
};

const requiresCsrf = (method: RequestMethod): boolean => {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(method);
};

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const method: RequestMethod = options.method ?? "GET";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers ?? {})
  };

  if (requiresCsrf(method)) {
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }
  }

  const response = await fetch(path, {
    method,
    credentials: "include",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined
  });

  if (response.status === 401) {
    options.onUnauthorized?.();
    throw new ApiUnauthorizedError();
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

