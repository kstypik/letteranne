import { expect, test } from "@playwright/test";

test("discovery and open letters pages render", async ({ page }) => {
  await page.goto("/discovery");
  await expect(page.getByRole("heading", { name: "Discover people" })).toBeVisible();

  await page.goto("/open-letters");
  await expect(page.getByRole("heading", { name: "Open letters" })).toBeVisible();
});
