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