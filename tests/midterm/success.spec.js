import { test, expect } from "@playwright/test";

test("Verify user can submit form with valid data", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await page.locator("#firstName").fill("John");
  await page.locator("#lastName").fill("Doe");
  await page.locator("#userEmail").fill("john@gmail.com");

  await page.locator("label[for='gender-radio-1']").click();

  await page.locator("#userNumber").fill("0123456789");

  await page.locator("#submit").click();

  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();
});