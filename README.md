# QA PROVIGIS

End-to-end test suite for PROVIGIS, built with [Playwright](https://playwright.dev/). Tests run across Chromium, Firefox, and WebKit.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd QA_PROVIGIS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests on a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run tests in headed mode (visible browser)

```bash
npx playwright test --headed
```

## Viewing Reports

After a test run, an HTML report is generated automatically. Open it with:

```bash
npx playwright show-report
```

Reports are saved in the `playwright-report/` directory.
You can see results for each tests and each browser.

You can also view the trace of any test. Open it with 

```bash
npx playwright show-trace path/to/trace.zip
```
## Project Structure

```
QA_PROVIGIS/
├── pages/                        # Page Object Model classes
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── DynamicTablePage.ts
│   └── BmiPage.ts
├── tests/                        # Test specification files
│   ├── login.spec.ts
│   ├── register.spec.ts
│   ├── dynamic-table.spec.ts
│   └── bmi.spec.ts
├── utils/
│   └── testData.ts               # Types and test data constants
├── playwright.config.ts          # Playwright configuration
├── playwright-report/            # Generated HTML report (git-ignored)
├── test-results/                 # Test artifacts and traces (git-ignored)
├── package.json
└── README.md
```

## Configuration

Test behavior is controlled by [`playwright.config.ts`](playwright.config.ts):

| Setting | Local | CI |
|---|---|---|
| Retries | 0 | 2 |
| Workers | auto | 1 |
| Trace | on first retry | on first retry |

The test directory is `./tests`. Playwright looks for files matching `*.spec.ts` and `*.test.ts`.

## CI
For the purpose of this exercise, CI mode is not necessary, but here is the basic configuration : 
In CI environments (when `CI=true` is set), the suite:
- Runs with 1 worker
- Retries failing tests up to 2 times
- Fails immediately if any `test.only()` is left in the code

## If I had more time


I would have created a BasePage to reuse some methods (goto methods for instance, where I repeat the waitUntil in each PageClass) and some shared locators

I would have created some helpers for the reporting, to maybe use a different reporter than the native one, according to what me, and the stakeholders are looking for as metrics to follow (execution time, flaky rate, grouped by features)

I would have created helpers to generate data on execution using fakerJS or native randomization methods to simulate real world behavior.

I would separate test data per each test or another abstraction level but not put all of them in the same testData.ts file.

BMI test is a good candidate for data-driven testing and use a set of generated value to iterate on the test to improve coverage