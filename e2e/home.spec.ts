import { test, expect } from "@playwright/test";

test.describe("Home page (anonymous)", () => {
  test("loads the React Component Generator UI", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("React Component Generator")).toBeVisible();
  });

  test("shows Preview and Code tabs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("tab", { name: "Preview" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Code" })).toBeVisible();
  });

  test("can switch to Code view", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Code" }).click();
    await expect(page.getByRole("tab", { name: "Code" })).toHaveAttribute(
      "data-state",
      "active"
    );
  });
});
