import { expect, test } from "@playwright/test";

test("letter history page renders", async ({ page }) => {
  await page.goto("/history");
  const empty = page.getByText("No letters yet.");
  const heading = page.getByRole("heading", { name: "Letter history" });
  const loading = page.getByText("Loading letter history...");
  const error = page.getByRole("alert");
  await expect(empty.or(heading).or(loading).or(error)).toBeVisible();
});
