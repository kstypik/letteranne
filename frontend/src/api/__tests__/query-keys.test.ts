import { describe, expect, it } from "vitest";

import { queryKeys } from "../query-keys";

describe("query key conventions", () => {
  it("should expose stable domain-first key namespaces", () => {
    expect(queryKeys.auth.session).toEqual(["auth", "session"]);
    expect(queryKeys.profile.me).toEqual(["profile", "me"]);
    expect(queryKeys.discovery.random).toEqual(["discovery", "random"]);
  });

  it("should include params in letters list key", () => {
    expect(queryKeys.letters.list({ page: 1, limit: 20, visibility: "private" })).toEqual([
      "letters",
      "list",
      { page: 1, limit: 20, visibility: "private" }
    ]);
  });
});

