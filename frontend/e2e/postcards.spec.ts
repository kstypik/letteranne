import { expect, test } from "@playwright/test";

test("compose page renders (postcard picker lives here)", async ({ page }) => {
  await page.goto("/compose");
  await expect(page.getByRole("heading", { name: "Compose letter" })).toBeVisible();
});
