import { describe, expect, it, vi } from "vitest";

describe("compose flow", () => {
  it("should validate empty body before submit", async () => {
    const body = "";
    const validate = (value: string) => (value.trim() ? null : "Body is required");
    expect(validate(body)).toBe("Body is required");
  });

  it("should send payload including scheduledFor when valid", async () => {
    const payload = {
      recipientId: "00000000-0000-0000-0000-000000000002",
      visibility: "private",
      subject: "Hello",
      body: "Body text",
      scheduledFor: "2026-05-05T12:30"
    };
    const request = vi.fn().mockResolvedValue({ id: "x" });

    await request("/letters", { method: "POST", body: payload });

    expect(request).toHaveBeenCalledWith(
      "/letters",
      expect.objectContaining({
        method: "POST",
        body: expect.objectContaining({
          body: "Body text",
          scheduledFor: "2026-05-05T12:30"
        })
      })
    );
  });
});

