import { describe, expect, it } from "vitest";

const getDetailState = (input: { isLoading: boolean; isError: boolean; hasData: boolean }) => {
  if (input.isLoading) {
    return "loading";
  }
  if (input.isError) {
    return "error";
  }
  if (!input.hasData) {
    return "empty";
  }
  return "ready";
};

describe("detail view state mapping", () => {
  it("should expose access-error state branch", () => {
    expect(getDetailState({ isLoading: false, isError: true, hasData: false })).toBe("error");
  });
});

