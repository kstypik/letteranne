import { describe, expect, it } from "vitest";

const renderLookupState = (found: boolean) => (found ? "card" : "no-result");
const renderDiscoveryState = (count: number) => (count > 0 ? "list" : "empty");

describe("discovery flow states", () => {
  it("should represent user lookup no-result and success states", () => {
    expect(renderLookupState(false)).toBe("no-result");
    expect(renderLookupState(true)).toBe("card");
  });

  it("should represent discovery empty and success list states", () => {
    expect(renderDiscoveryState(0)).toBe("empty");
    expect(renderDiscoveryState(3)).toBe("list");
  });
});

