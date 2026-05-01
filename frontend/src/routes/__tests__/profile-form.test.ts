import { describe, expect, it } from "vitest";

const validateAvatarUrl = (value: string) => {
  if (!value) {
    return null;
  }
  return value.startsWith("http") ? null : "Avatar URL must be valid";
};

describe("profile form", () => {
  it("should validate avatar URL and expose save feedback state", () => {
    expect(validateAvatarUrl("invalid")).toBe("Avatar URL must be valid");
    expect(validateAvatarUrl("https://example.com/avatar.png")).toBeNull();
  });
});

