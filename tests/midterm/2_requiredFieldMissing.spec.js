import { test, expect } from "@playwright/test";

test("2.1 Verify form cannot submit when required fields are empty (all fields missing)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // เนื่องจาก ถ้าไม่มีการกรอกข้อมูลใดๆ แล้วตัว Textfield ไม่มีการเปลี่ยน state ให้ track ดังนั้นจึงต้องเช็คจากการที่กด Submit แล้วไม่เกิดอะไรขึ้น
  await page.locator("#submit").click();

  // การ Submit ต้องไม่เกิดอะไรขึ้น และไม่เห็น Modal Thanks for submitting the form
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("2.2 Verify form cannot submit when required fields are empty (first name missing)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await page.locator("#lastName").fill("Doe");
  await page.locator("#userNumber").fill("0123456789");
  await page.locator("label[for='gender-radio-1']").click();

  await page.locator("#submit").click();

  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("2.3 Verify form cannot submit when required fields are empty (last name missing)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await page.locator("#firstName").fill("John");
  await page.locator("#userNumber").fill("0123456789");
  await page.locator("label[for='gender-radio-1']").click();
  await page.locator("#submit").click();

  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("2.4 Verify form cannot submit when required fields are empty (Gender missing)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await page.locator("#firstName").fill("John");
  await page.locator("#lastName").fill("Doe");
  await page.locator("#userNumber").fill("0123456789");
  await page.locator("#submit").click();

  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("2.5 Verify form cannot submit when required fields are empty (Mobile missing)", async ({
    page,
    }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("label[for='gender-radio-1']").click();
    await page.locator("#submit").click();

    await expect(
      page.getByText("Thanks for submitting the form"),
    ).not.toBeVisible();
  });