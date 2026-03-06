import { test, expect } from "@playwright/test";

test("Verify user can add/remove subject tag", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  const subjectsInput = page.locator("#subjectsInput");

  await subjectsInput.click();
  // พิมพ์แค่ ma แล้วกด Enter ก็เลือก Maths ได้
  await subjectsInput.fill("ma");
  await page.getByText("Maths", { exact: true }).click();
  
  //เลือกจาก dropdown ที่เป็น autocomplete
  await subjectsInput.fill("a");
  await page.getByText("Arts", { exact: true }).click();

  await subjectsInput.fill("English");
  await page.getByText("English", { exact: true }).click();

  // verify ว่ามี 3 subjects
  await expect(
    page.locator(".subjects-auto-complete__multi-value"),
  ).toHaveCount(3);

  // remove first subject (ตรงปุ่ม x)
  await page
    .locator(".subjects-auto-complete__multi-value__remove")
    .first()
    .click();

  // verify remaining subjects
  await expect(
    page.locator(".subjects-auto-complete__multi-value"),
  ).toHaveCount(2);

  await page.waitForTimeout(5000);
});
