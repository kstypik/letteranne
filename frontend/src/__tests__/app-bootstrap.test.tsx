import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { router } from "../router";

describe("app bootstrap", () => {
  it("should render root route when providers are configured", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Letteranne")).toBeInTheDocument();
    expect(await screen.findByText("Welcome to Letteranne.")).toBeInTheDocument();
  });
});

