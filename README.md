# Unit and Integration Testing with TDD

## Table of Contents

- [Unit and Integration Testing with TDD](#unit-and-integration-testing-with-tdd)

  - [Table of Contents](#table-of-contents)
  - [1. Introduction to Testing in NodeJS](#1-introduction-to-testing-in-nodejs)
    - [Importance of Testing in Modern Web Development](#importance-of-testing-in-modern-web-development)
    - [Overview of Testing Types](#overview-of-testing-types)
    - [Testing Frameworks for NodeJS](#testing-frameworks-for-nodejs)
  - [2. Writing Unit Tests with Jest](#2-writing-unit-tests-with-jest)
    - [Installation and Setup](#installation-and-setup)
    - [Writing Basic Unit Tests](#writing-basic-unit-tests)
  - [3. Writing Integration Tests with Jest and Supertest](#3-writing-integration-tests-with-jest-and-supertest)
    - [Example API](#example-api)
  - [4. Test-Driven Development (TDD) Principles and Best Practices](#4-test-driven-development-tdd-principles-and-best-practices)
    - [Benefits of TDD](#benefits-of-tdd)
    - [TDD Workflow](#tdd-workflow)
  - [5. Best Practices for Unit and Integration Testing](#5-best-practices-for-unit-and-integration-testing)
    - [Unit Testing Best Practices](#unit-testing-best-practices)
    - [Integration Testing Best Practices](#integration-testing-best-practices)
  - [6. Automating Tests with CI/CD (optional)](#6-automating-tests-with-cicd-optional)
    - [GitHub Actions Workflow Example](#github-actions-workflow-example)
  - [7. Checklist for Testing](#7-checklist-for-testing)
    - [Unit Testing](#unit-testing)
    - [Integration Testing](#integration-testing)
    - [Documentation](#documentation)
  - [8. Lab Activity](#8-lab-activity)
    - [Objective:](#objective)
    - [Scenario:](#scenario)
    - [Steps:](#steps)
  - [9. Advance Notes]('/')

## 1. Introduction to Testing in NodeJS

### Importance of Testing in Modern Web Development

Testing ensures the reliability, stability, and maintainability of applications. As applications grow more complex, automated testing helps catch bugs early in the development process.

**Benefits of Testing:**

- **Confidence in Code Changes:** Refactor and add features without fear of breaking functionality.
- **Reduced Debugging Time:** Detect issues early to save time later.
- **Improved Code Quality:** Leads to cleaner, modular, and maintainable code.
- **Documentation:** Tests act as living documentation for expected behavior.

### Overview of Testing Types

- **Unit Testing:** Tests individual functions or components in isolation (e.g., testing a discount calculation function).
- **Integration Testing:** Tests how multiple components work together (e.g., testing a REST API endpoint interacting with a database).
- **End-to-End (E2E) Testing:** Simulates user interactions with the entire application (e.g., logging in and adding an item to a cart).

### Testing Frameworks for NodeJS

- **Jest:** Popular for unit and integration testing, with built-in mocking and assertion libraries.
- **Other Frameworks:** Mocha, Chai, Supertest (for HTTP APIs), Cypress (for E2E testing).

## 2. Writing Unit Tests with Jest

### Installation and Setup

1. **Initialize Project:**

```bash
npm init -y
```

2. **Install Jest:**

```bash
npm install --save-dev jest
```

3. **Add Test Script to `package.json`:**

```json
"scripts": {
  "test": "jest"
}
```

### Writing Basic Unit Tests

**Example Function:**

```javascript
// discount.js
function calculateDiscount(price, percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Invalid discount percentage');
  }
  return price - price * (percentage / 100);
}

module.exports = calculateDiscount;
```

**Unit Test:**

```javascript
// discount.test.js
const calculateDiscount = require('./discount');

test('calculates 10% discount correctly', () => {
  expect(calculateDiscount(100, 10)).toBe(90);
});

test('throws error for invalid percentage', () => {
  expect(() => calculateDiscount(100, 110)).toThrow(
    'Invalid discount percentage'
  );
});
```

## 3. Writing Integration Tests with Jest and Supertest

### Example API

```javascript
// app.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

module.exports = app;
```

**Integration Test:**

```javascript
// app.test.js
const request = require('supertest');
const app = require('./app');

describe('POST /add', () => {
  it('should return the sum of two numbers', async () => {
    const response = await request(app).post('/add').send({ a: 5, b: 7 });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(12);
  });
});
```

## 4. Test-Driven Development (TDD) Principles and Best Practices

### Benefits of TDD

- **Reduces Bugs Early:** Detect issues before code is fully developed.
- **Improves Software Design:** Encourages modular, loosely-coupled components.
- **Acts as Documentation:** Tests describe expected system behavior.
- **Encourages Confidence:** Easier to refactor and extend code.

### TDD Workflow

1. Write a failing test first (red).
2. Write just enough code to pass the test (green).
3. Refactor code while keeping the test green.
4. Repeat.

**Example TDD Cycle:**

1. **Write a Failing Test:**

```javascript
test('should calculate tax of 5% on 100', () => {
  expect(calculateTax(100)).toBe(5);
});
```

2. **Implement the Function:**

```javascript
function calculateTax(amount) {
  return amount * 0.05;
}
```

3. **Refactor if Needed.**

## 5. Best Practices for Unit and Integration Testing

### Unit Testing Best Practices

- **Isolate Units of Work:** Test one function/class at a time.
- **Small and Focused Tests:** Follow the AAA pattern (Arrange, Act, Assert).
- **Descriptive Test Names:** Clearly explain what the test verifies.
- **Test Edge Cases:** Handle invalid inputs, missing fields, etc.
- **Keep Tests Fast:** Avoid slow operations like API calls or DB queries.

### Integration Testing Best Practices

- **Test End-to-End Components Together:** Verify multiple components work together.
- **Use Realistic Scenarios:** Simulate real-world API usage.
- **Setup and Teardown Data:** Reset or seed databases/in-memory stores before each test.
- **Test Error Handling:** Check for both success and failure cases.

## 6. Automating Tests with CI/CD (optional)

### GitHub Actions Workflow Example

```yaml
name: Node.js CI Pipeline

on:
  push:
   branches: [ "main", "dev" ]
  pull_request:
   branches: [ "main", "dev" ]

jobs:
  build-and-test:
   runs-on: ubuntu-latest

   strategy:
    matrix:
      node-version: [18.x, 20.x]

   steps:
   - name: Checkout code
    uses: actions/checkout@v3

   - name: Setup Node.js
    uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.node-version }}

   - name: Install dependencies
    run: npm install

   - name: Run Tests
    run: npm test -- --coverage

   - name: Upload Coverage Report
    uses: actions/upload-artifact@v3
    with:
      name: coverage-report
      path: coverage/
```

## 7. Checklist for Testing

### Unit Testing

- Tests isolate individual functions (no DB/API calls).
- Mocks/stubs used where needed.
- Tests cover both happy paths and edge cases.
- Descriptive test names and clear structure.

### Integration Testing

- Simulates real-world API behavior (e.g., POST, GET, PUT).
- Tests both success and error responses.
- Setup and teardown implemented properly.

### Documentation

- README or doc file explaining testing strategy and setup.
- Coverage report generated using `jest --coverage`.

## 8. Lab Activity

### Objective:

- Write unit tests for a NodeJS module simulating a real-world feature.
- Apply TDD principles to implement the feature.

### Scenario:

Develop a "Currency Converter" module with:

- A `convertCurrency(amount, rate)` function.
- Tests for edge cases (e.g., negative amounts, invalid rate).

### Steps:

1. Create the test file `converter.test.js`.
2. Write TDD cycle: Red → Green → Refactor.
3. Add proper assertions using `expect()`.
4. Submit working tests and implementation.
