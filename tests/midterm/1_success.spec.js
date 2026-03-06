import { test, expect } from "@playwright/test";

test("Verify user can submit form with all valid data", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // ใช้ชื่อจริง และนามสกุลจริง
  await page.locator("#firstName").fill("John");
  await page.locator("#lastName").fill("Doe");

  // Email
  await page.locator("#userEmail").fill("john@gmail.com");

  // กดเพศชาย ที่เป็นช้อยส์แรก
  await page.locator("label[for='gender-radio-1']").click();

  // เลขโทรศัพท์
  await page.locator("#userNumber").fill("0123456789");

  // กด Date of birth 3 parts -> year, month, day
  await page.locator("#dateOfBirthInput").click();
  await page.locator(".react-datepicker__year-select").selectOption("2000");
  await page.locator(".react-datepicker__month-select").selectOption("March");
  await page.locator(".react-datepicker__day--015").click();

  // Subjects เป็น Autocomplete ถึงแม้จะพิมพ์ไม่ครบ แต่ก็ควรจะต้องเลือกได้เอง
  await page.locator("#subjectsInput").fill("ma");
  await page.getByText("Maths", { exact: true }).click();

  // Hobbies เลือกช้อยส์แรก
  await page.locator("label[for='hobbies-checkbox-1']").click();

  // Upload Picture
  await page.locator("#uploadPicture").setInputFiles("tests/image.jpg");

  // Address
  await page.locator("#currentAddress").fill("Some Address");

  // State
  await page.locator("#state").click();
  await page.getByText("Uttar Pradesh").click();

  // City
  await page.locator("#city").click();
  await page.getByText("Lucknow").click();

  // Press Submit button
  await page.locator("#submit").click();

  // Verify modal
  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();

  await page.waitForTimeout(5000);
});
