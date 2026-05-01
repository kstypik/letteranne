import { expect, test } from "@playwright/test";

test("home, login, and sign-up render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Welcome to Letteranne.")).toBeVisible();

  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();

  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();
});
