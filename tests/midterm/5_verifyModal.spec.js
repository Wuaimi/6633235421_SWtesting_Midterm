import { test, expect } from "@playwright/test";

test("Verify Submit Modal data", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // Fill First Name and Last Name
  await page.locator("#firstName").fill("John");
  await page.locator("#lastName").fill("Doe");

  // Fill Email
  await page.locator("#userEmail").fill("john@gmail.com");

  // Select Gender
  await page.locator("label[for='gender-radio-1']").click();

  // Fill Mobile Number
  await page.locator("#userNumber").fill("0123456789");

  // Select Date of Birth
  await page.locator("#dateOfBirthInput").click();
  await page.locator(".react-datepicker__year-select").selectOption("2000");
  await page.locator(".react-datepicker__month-select").selectOption("March");
  await page
    .locator(
      ".react-datepicker__day--015:not(.react-datepicker__day--outside-month)",
    )
    .click();

  // Fill Subject
  const subjectsInput = page.locator("#subjectsInput");

  await subjectsInput.click();
  // พิมพ์แค่ ma แล้วกด Enter ก็เลือก Maths ได้
  await subjectsInput.fill("ma");
  await page.getByText("Maths", { exact: true }).click();

  // Select Hobby
  await page.locator("label[for='hobbies-checkbox-1']").click();

  // Upload Picture
  await page.locator("#uploadPicture").setInputFiles("tests/image.jpg");

  // Fill Current Address
  await page.locator("#currentAddress").fill("Some Address");

  // Select State
  await page.locator("#state").click();
  await page.getByText("Uttar Pradesh", { exact: true }).click();

  // Select City
  await page.locator("#city").click();
  await page.getByText("Lucknow", { exact: true }).click();

  // Submit Form
  await page.locator("#submit").click();

  // Verify modal title
  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();

  // Verify all modal values
  await expect(
    page.locator("tbody tr").filter({ hasText: "Student Name" }),
  ).toContainText("John Doe");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Student Email" }),
  ).toContainText("john@gmail.com");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Gender" }),
  ).toContainText("Male");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Mobile" }),
  ).toContainText("0123456789");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Date of Birth" }),
  ).toContainText("15 March,2000");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Subjects" }),
  ).toContainText("Maths");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Hobbies" }),
  ).toContainText("Sports");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Picture" }),
  ).toContainText("image.jpg");

  await expect(
    page.locator("tbody tr").filter({ hasText: "Address" }),
  ).toContainText("Some Address");

  await expect(
    page.locator("tbody tr").filter({ hasText: "State and City" }),
  ).toContainText("Uttar Pradesh Lucknow");

  // Delay 5 seconds before closing
  await page.waitForTimeout(500);
});
