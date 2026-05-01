import { describe, expect, it } from "vitest";

import { validateEmail, validatePassword } from "../validation";

describe("auth form validation", () => {
  it("should require an email and valid format", () => {
    expect(validateEmail("")).toBe("Email is required");
    expect(validateEmail("invalid")).toBe("Email must be valid");
    expect(validateEmail("user@example.com")).toBeNull();
  });

  it("should enforce minimum password length", () => {
    expect(validatePassword("")).toBe("Password is required");
    expect(validatePassword("1234567")).toBe("Password must be at least 8 characters");
    expect(validatePassword("12345678")).toBeNull();
  });
});

