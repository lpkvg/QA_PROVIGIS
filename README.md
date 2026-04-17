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
You can see results for each test and each browser.

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

## Notes


I would have created a BasePage to reuse some methods (goto methods for instance, where I repeat the waitUntil in each PageClass) and some shared locators. 

Edit : I later on created it using AI to override goto method and adding a cookie banner handling to reduce flakiness. Decided not to commit it to stay transparent with how I conducted this task, but worked well. You can find the prompt at the end of this readme

I would have created some helpers for the reporting, to maybe use a different reporter than the native one, according to what I and the stakeholders are looking for as metrics to follow (execution time, flaky rate, grouped by features)

I would have created helpers to generate data on execution using fakerJS or native randomization methods to simulate real world behavior.

I would separate test data per each test or another abstraction level but not put all of them in the same testData.ts file.

BMI test is a good candidate for data-driven testing and use a set of generated value to iterate on the test to improve coverage

## Prompts used

### To create Register test

You are a senior QA Automation Engineer specialized in end-to-end testing using Playwright and Typescript.  
Based on the login test, page and testdata files, create a test that tries the register functionality.  
Test : Automate the following scenario:  
successful registration.  
URL: https://practice.expandtesting.com/register. 
HTML :  
```<form name="register" id="register" data-testid="register" action="/register" method="post">
                            <div>
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" name="username" id="username" autocomplete="OFF" value="">
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="password" autocomplete="new-password" value="">
                                </div>

                                <div class="mb-3">
                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" autocomplete="new-password" value="">
                                </div>

                            </div>
                            <button type="submit" class="btn btn-bg btn-primary d-block w-100">Register</button>
                        </form>
```
### To generate the readme file
Write a readme with Github standards sections to make any person able to clone this repo run my tests, and understand the structure of the test automation framework.

### To create the basepage class to handle cookie banner on every page
In order to reduce flakiness, it is necessary to wait to see the cookie banner and either accept the cookies, either wait for it to automatically disappear.
Here is the accept button you can rely on
getByRole('button', { name: 'Consent' })

It automatically created the BasePage and extended all the other Page from this BasePage class to override the goto method.