import { describe, expect, it } from "vitest";

import { getAppGateState } from "../app";

describe("app route gate", () => {
  it("should redirect when user is unauthenticated after bootstrap", () => {
    expect(getAppGateState(false, false)).toBe("redirect");
  });

  it("should allow access when authenticated", () => {
    expect(getAppGateState(false, true)).toBe("ready");
  });
});

