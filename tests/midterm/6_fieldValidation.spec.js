import { test, expect } from "@playwright/test";

test.describe("Field Validation", () => {
  test("6.1.1 Mobile should not allow submission with less than 10 digits", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("label[for='gender-radio-1']").click();
    await page.locator("#userNumber").fill("012345678");

    await page.locator("#submit").click();

    await expect(
      page.getByText("Thanks for submitting the form"),
    ).not.toBeVisible();
  });

  test("6.1.2 Mobile should not allow submission with alphabet characters", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("label[for='gender-radio-1']").click();
    await page.locator("#userNumber").fill("abcdef");

    await page.locator("#submit").click();

    await expect(
      page.getByText("Thanks for submitting the form"),
    ).not.toBeVisible();
  });

  test("6.1.3 Mobile should not allow submission with special symbols", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("label[for='gender-radio-1']").click();
    await page.locator("#userNumber").fill("@#$%");

    await page.locator("#submit").click();

    await expect(
      page.getByText("Thanks for submitting the form"),
    ).not.toBeVisible();
  });

  test("6.1.4 Mobile should allow submission with exactly 10 digits", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("#userEmail").fill("john@gmail.com");
    await page.locator("label[for='gender-radio-1']").click();
    await page.locator("#userNumber").fill("0123456789");

    await page.locator("#submit").click();

    await expect(
      page.getByText("Thanks for submitting the form"),
    ).toBeVisible();
  });

  test("6.2 Email must contain @ and valid domain extension", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    const email = page.locator("#userEmail");

    //tobeTruthy คือผ่าน validation และ toBeFalsy คือไม่ผ่าน validation ของ HTML5 form validation
    // Valid email
    await email.fill("john@gmail.com");
    let valid = await email.evaluate((el) => el.checkValidity());
    expect(valid).toBeTruthy();

    // Invalid emails - missing @
    await email.fill("johngmail.com");
    valid = await email.evaluate((el) => el.checkValidity());
    expect(valid).toBeFalsy();

    // Invalid emails - missing .com
    await email.fill("john@gmail");
    valid = await email.evaluate((el) => el.checkValidity());
    expect(valid).toBeFalsy();
  });

  test("6.3 Date of Birth default value and calendar selection", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    const dob = page.locator("#dateOfBirthInput");

    const defaultDate = await dob.inputValue();
    expect(defaultDate).not.toBe("");

    await dob.click();
    await page.locator(".react-datepicker__year-select").selectOption("2012");
    await page.locator(".react-datepicker__month-select").selectOption("March");
    await page
      .locator(
        ".react-datepicker__day--006:not(.react-datepicker__day--outside-month)",
      )
      .click();

    await expect(dob).toHaveValue("06 Mar 2012");
  });
});