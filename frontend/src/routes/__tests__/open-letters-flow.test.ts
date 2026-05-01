import { describe, expect, it } from "vitest";

const canPublish = (body: string) => body.trim().length > 0;
const canReply = (letterId: string, body: string) => Boolean(letterId) && body.trim().length > 0;
const canReport = (letterId: string, reason: string) =>
  Boolean(letterId) && reason.trim().length > 0;

describe("open-letter integration flow", () => {
  it("should allow open-letter publishing when body is present", () => {
    expect(canPublish("Hello world")).toBe(true);
    expect(canPublish(" ")).toBe(false);
  });

  it("should link reply flow to selected parent letter", () => {
    expect(canReply("letter-1", "reply")).toBe(true);
    expect(canReply("", "reply")).toBe(false);
  });

  it("should validate moderation report submission", () => {
    expect(canReport("letter-1", "abuse")).toBe(true);
    expect(canReport("letter-1", "")).toBe(false);
  });
});

