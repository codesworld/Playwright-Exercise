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
├── tests/                 # Test files
├── global-setup.ts        # Cookie consent handling 
├── playwright.config.ts
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

## Cookie Consent Handling

During headed execution, the website displays a cookie consent popup which may interfere with test execution.

To avoid test interruptions, a `global-setup.ts` file together with Playwright `storageState` was implemented.

This allows cookie/session state to be generated before tests begin.
Generated storage state files are intentionally excluded from version control.

---

## Test Data Handling

The framework structure supports externalised JSON-based test data for future scalability and data-driven testing.

A lightweight JSON example was added for the contact form test.

For Test 2 (Add to Cart), dedicated product datasets could also have been externalised into JSON test data files. However, due to the relatively small scope of the exercise and because this was not explicitly required in the task, the implementation was intentionally kept simpler and more lightweight.

---

# Implemented Tests

## Test 1 — Product Search

- Navigate to the Products page
- Search for `"Dress"`
- Verify that search results are displayed

### Search Behaviour Observation

The task requested validation that all visible product names contain the searched keyword.

During implementation, it was observed that the website occasionally returns broader category-based matches rather than strict product-name-only matches.

For example, searching for `"Dress"` may also return products whose visible names do not explicitly contain the word `"Dress"`.

The assertion reflects the original requirement and documents the observed application behaviour as a known finding.

---

## Test 2 — Add to Cart

- Add two products to the cart
- Navigate to the Cart page
- Verify that the cart contains two items

---

## Test 3 — Contact Form Submission

- Navigate to the Contact Us page
- Fill in all required fields
- Submit the form
- Verify that the success message is displayed

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

- CI/CD integration using GitHub Actions
- Environment-based configuration management
- Cross-browser execution strategy improvements
- Expanded data-driven testing
- API testing integration
- Enhanced reporting and logging
- Retry and flaky test handling improvements
- Authentication/login workflows
- Shared utility layer for reusable actions and helpers


# Additional Notes

The framework was intentionally kept relatively lightweight to align with the expected scope and duration of the technical assessment while still demonstrating a maintainable and scalable automation structure.