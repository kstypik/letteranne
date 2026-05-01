export class ApiUnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "ApiUnauthorizedError";
  }
}

export class ApiResponseError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiResponseError";
    this.status = status;
    this.code = code;
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

/** Absolute backend origin + path prefix (no trailing slash), e.g. http://localhost:8000 */
const resolveApiUrl = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const rawBase = import.meta.env.VITE_API_BASE_URL;
  const base =
    typeof rawBase === "string" && rawBase.length > 0 ? rawBase.replace(/\/$/, "") : "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalizedPath}` : normalizedPath;
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

  const response = await fetch(resolveApiUrl(path), {
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
    try {
      const body = (await response.json()) as { error?: { message?: string; code?: string } };
      const message = body.error?.message || "Something went wrong. Please try again.";
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("app:error", { detail: message }));
      }
      throw new ApiResponseError(message, response.status, body.error?.code);
    } catch {
      const fallback = "Something went wrong. Please try again.";
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("app:error", { detail: fallback }));
      }
      throw new ApiResponseError(fallback, response.status);
    }
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

