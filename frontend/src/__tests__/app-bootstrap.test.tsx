import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthProvider } from "../auth/auth-context";
import { router } from "../router";

describe("app bootstrap", () => {
  it("should render root route when providers are configured", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    );

    expect(await screen.findByText("Letteranne")).toBeInTheDocument();
    expect(
      await screen.findByText("Welcome to Letteranne. Sign up or log in to continue.")
    ).toBeInTheDocument();
  });
});

