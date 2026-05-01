import { describe, expect, it } from "vitest";

const canAttach = (ownedIds: string[], selectedId: string) => ownedIds.includes(selectedId);

describe("postcard picker flow", () => {
  it("should allow attaching owned postcard IDs", () => {
    expect(canAttach(["a", "b"], "a")).toBe(true);
  });

  it("should block unowned postcard IDs", () => {
    expect(canAttach(["a", "b"], "z")).toBe(false);
  });
});

