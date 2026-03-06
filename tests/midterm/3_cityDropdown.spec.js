import { test, expect } from "@playwright/test";

test("Verify city dropdown changes based on selected state", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

    
  await page.locator("#state").click();
  await page.getByText("NCR").click();

  await page.locator("#city").click();

  await expect(page.getByText("Delhi")).toBeVisible();
  await expect(page.getByText("Gurgaon")).toBeVisible();
  await expect(page.getByText("Noida")).toBeVisible();
  
  //State2: Utter Pradesh
  await page.locator("#state").click();
  await page.getByText("Uttar Pradesh").click();

  await page.locator("#city").click();

  await expect(page.getByText("Agra")).toBeVisible();
  await expect(page.getByText("Lucknow")).toBeVisible();
  await expect(page.getByText("Merrut")).toBeVisible();

  //State3: Haryana
  await page.locator("#state").click();
  await page.getByText("Haryana").click();

  await page.locator("#city").click();

  await expect(page.getByText("Karnal")).toBeVisible();
  await expect(page.getByText("Panipat")).toBeVisible();

  // State4: Rajasthan
  await page.locator("#state").click();
  await page.getByText("Rajasthan").click();

  await page.locator("#city").click();

  await expect(page.getByText("Jaipur")).toBeVisible();
  await expect(page.getByText("Jaiselmer")).toBeVisible();
});