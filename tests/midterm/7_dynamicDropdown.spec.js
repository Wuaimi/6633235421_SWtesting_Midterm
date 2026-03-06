import { test, expect } from "@playwright/test";

test.describe("Dynamic Dropdown Validation", () => {
  test("7.1 City dropdown should be empty before State is selected", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await expect(page.locator("#city")).toContainText("Select City");
  });

  test("7.2 City dropdown shows correct cities after selecting State", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // select state
    await page.locator("#state").click();
    await page.getByText("Uttar Pradesh", { exact: true }).click();

    // open city dropdown
    await page.locator("#city").click();

    // verify cities of Uttar Pradesh
    await expect(page.getByText("Agra", { exact: true })).toBeVisible();
    await expect(page.getByText("Lucknow", { exact: true })).toBeVisible();
    await expect(page.getByText("Merrut", { exact: true })).toBeVisible();
  });

  test("7.3 City list changes when selecting different State", async ({
    page,
  }) => {
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
});
