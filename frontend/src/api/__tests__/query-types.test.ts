import { describe, expect, it } from "vitest";

import { toApiError } from "../query-types";

describe("query types", () => {
  it("should normalize unknown errors into ApiError shape", () => {
    expect(toApiError(new Error("boom"))).toEqual({ message: "boom" });
    expect(toApiError("bad")).toEqual({ message: "Unexpected API error" });
  });
});

