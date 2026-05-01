import { afterEach, describe, expect, it } from "vitest";

import { clearSession, loadSession, persistSession } from "../session";

describe("auth session bootstrap", () => {
  afterEach(() => {
    clearSession();
  });

  it("should load persisted auth state on bootstrap", () => {
    persistSession({ email: "bootstrap@example.com" });
    expect(loadSession()).toEqual({ email: "bootstrap@example.com" });
  });
});

