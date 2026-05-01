import { describe, expect, it } from "vitest";

const getHistoryState = (input: {
  isLoading: boolean;
  isError: boolean;
  count: number;
}) => {
  if (input.isLoading) {
    return "loading";
  }
  if (input.isError) {
    return "error";
  }
  if (input.count === 0) {
    return "empty";
  }
  return "ready";
};

describe("history state mapping", () => {
  it("should map loading, error, empty, ready states", () => {
    expect(getHistoryState({ isLoading: true, isError: false, count: 0 })).toBe("loading");
    expect(getHistoryState({ isLoading: false, isError: true, count: 0 })).toBe("error");
    expect(getHistoryState({ isLoading: false, isError: false, count: 0 })).toBe("empty");
    expect(getHistoryState({ isLoading: false, isError: false, count: 1 })).toBe("ready");
  });
});

