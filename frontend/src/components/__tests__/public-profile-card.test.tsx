import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PublicProfileCard } from "../public-profile-card";

describe("PublicProfileCard", () => {
  it("should render profile info and fallback bio", () => {
    render(<PublicProfileCard displayId="alice" bio={null} avatarUrl={null} />);

    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.getByText("No bio yet.")).toBeInTheDocument();
  });
});

