# OrangeHRM Test Automation

Playwright + TypeScript test suite for OrangeHRM demo application.

## Prerequisites

- Node.js v18+
- npm

## Setup

```bash
npm install
npx playwright install
```

## Run tests

```bash
# All tests
npx playwright test

# With browser visible
npx playwright test --headed

# Specific file
npx playwright test employee-management
npx playwright test pim-additional
```

## View report

```bash
npx playwright show-report
```

## Test scenarios

### Employee Management (employee-management.spec.ts)
- Create new employee
- Search for employee
- Open employee profile
- Edit employee first name

### PIM Additional Scenarios (pim-additional.spec.ts)
- Create employee and verify ID is auto-generated
- Verify employee appears in list after creation

## Project structure

```
tests/
  pages/          # Page Object Model classes
  data/           # Test data
  *.spec.ts       # Test files
playwright.config.ts
```

## Design decisions

- **Playwright + TypeScript** — native support for modern web apps, built-in waiting strategies, and strong TypeScript integration make it well-suited for maintainable UI automation.
- **Page Object Model** — each page is a separate class, keeping selectors and actions in one place. Adding new tests doesn't require touching existing page logic.
- **Separate test data file** — credentials and test values are isolated from test logic, making it easy to update or parameterize later.
- **Single worker, sequential execution** — chosen to avoid race conditions on the shared demo environment.