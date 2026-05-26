import { test, expect } from "@playwright/test";

test.describe("Auth dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens sign-in dialog", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(
      page.getByText("Sign in to your account to continue")
    ).toBeVisible();
  });

  test("shows email and password fields in sign-in mode", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("can switch from sign-in to sign-up", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.getByRole("button", { name: /sign up/i }).click();
    await expect(page.getByText("Create an account")).toBeVisible();
    await expect(
      page.getByText("Sign up to start creating AI-powered React components")
    ).toBeVisible();
  });

  test("can switch back from sign-up to sign-in", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.getByRole("button", { name: /sign up/i }).click();
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("closes dialog on dismiss", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText("Welcome back")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByText("Welcome back")).not.toBeVisible();
  });
});
