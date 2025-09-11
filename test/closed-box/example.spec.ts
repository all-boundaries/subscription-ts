import { test, expect } from "@playwright/test";

test("subscribes to a plan only once", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("article")
    .filter({ hasText: "What's good Start your" })
    .getByRole("button")
    .click();

  await expect(page.locator("h2")).toContainText(
    "Congratulations, you're subscribed",
  );

  await page.getByRole("heading").filter({ hasText: "Subscription" }).click();

  await page
    .getByRole("article")
    .filter({ hasText: "What's good Start your" })
    .getByRole("button")
    .click();

  await expect(page.locator("h2")).toContainText("Something went wrong");
});
