import { describe, expect, it, vi } from "vitest";

import { ApiUnauthorizedError, apiRequest } from "../http-client";

describe("apiRequest", () => {
  it("should send credentials by default", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true })
    });
    vi.stubGlobal("fetch", fetchMock);

    await apiRequest("/test");

    expect(fetchMock).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({ credentials: "include" })
    );
  });

  it("should forward csrf token on mutating requests", async () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "csrftoken=csrf-123"
    });
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true })
    });
    vi.stubGlobal("fetch", fetchMock);

    await apiRequest("/test", { method: "POST", body: { a: 1 } });

    expect(fetchMock).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({
        headers: expect.objectContaining({ "X-CSRFToken": "csrf-123" })
      })
    );
  });

  it("should trigger unauthorized handler and throw on 401", async () => {
    const onUnauthorized = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({})
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(apiRequest("/private", { onUnauthorized })).rejects.toBeInstanceOf(
      ApiUnauthorizedError
    );
    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });
});

