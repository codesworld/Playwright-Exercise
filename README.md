# Playwright Technical Test

This repository contains a Playwright + TypeScript automation framework created as part of the Automation QA Engineer technical assessment.

The framework was designed to be clean, maintainable, and easy to extend while still keeping the implementation lightweight for the scope of the exercise.

Target Website: https://automationexercise.com

---

# Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

# Project Structure

```text
├── fixtures/              # Shared Playwright fixtures
├── pages/                 # Page Object classes
├── auth/                  # Storage state structure
├── test-data/             # JSON-based test data support
├── tests/                 
   ├── setup/              # Authentication setup project & Cookie Handling
   └── ui/ auth.setup.ts   # UI Test
├── playwright.config.ts
├── eslint.config.mjs
├── tsconfig.json
├── package.json
```

---

# Framework Design

## Page Object Model (POM)

The framework follows a Page Object Model structure in order to:

- improve readability
- reduce duplicated logic
- isolate selectors from tests
- improve long-term maintainability

Tests use reusable page methods instead of raw selectors directly inside the test files.

---

## BasePage Structure

A reusable `BasePage` class was implemented to centralise shared functionality such as:

- navigation handling
- shared helper methods
- common helper methods

All page objects extend from `BasePage`.

---

## Playwright Fixtures

Custom Playwright fixtures were used to initialise and share page objects across tests.

This helps keep tests:

- cleaner
- easier to read
- easier to maintain
- more reusable

Example:

```ts
test('Add product to cart', async ({ productsPage, cartPage }) => {
  await productsPage.goto();
});
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in UI mode:

```bash
npm run test:ui
```

Run Chromium only:

```bash
npm run test:chromium
```

Open the Playwright HTML report:

```bash
npm run report
```

The report includes:

- execution results
- screenshots (on failure)
- traces (on retry)
- videos (on retry)

---

# Environment Variables

The `.env` file was intentionally included to simplify local execution and review for this exercise.

In a production-level framework, environment files would typically be excluded from version control and managed more securely.

---

# AI Usage

AI assistance was used during the exercise for:

- getting help investigating the cookie consent handling issue
- reviewing maintainability approaches
- speeding up README/documentation preparation

---

# Possible Future Improvements

Given more time, the following improvements could be added:

- API testing integration
- Enhanced logging
- Allure reporting
- Shared utility layer for reusable actions and helpers

# Additional Notes

The framework was intentionally kept relatively lightweight to align with the expected scope and duration of the technical assessment while still demonstrating a maintainable and scalable automation structure.
