# Unit and Integration Testing with TDD

## 1. Introduction to Testing in NodeJS

### Importance of Testing in Modern Web Development

In modern web development, testing plays a critical role in ensuring the reliability, stability, and maintainability of applications. As applications grow more complex and are expected to run flawlessly in production, developers rely on automated testing to catch bugs early in the development process.

**Benefits of Testing:**

- **Confidence in Code Changes:** Developers can refactor and add features without fear of breaking existing functionality.
- **Reduced Debugging Time:** Early detection of issues reduces costly debugging later.
- **Improved Code Quality:** Tests often lead to cleaner, more modular, and maintainable code.
- **Documentation:** Well-written tests act as a form of living documentation showing how the code is expected to behave.

### Overview of Testing Types

1. **Unit Testing:**
   - Tests individual functions or components in isolation.
   - **Example:** Testing a function that calculates discounts.
2. **Integration Testing:**
   - Tests how multiple components work together.
   - **Example:** Testing how a REST API endpoint interacts with the database.
3. **End-to-End (E2E) Testing:**
   - Tests the entire application flow as a user would interact with it.
   - **Example:** Simulating a user logging in and adding an item to their cart via a browser.

### Testing Frameworks Integrated into NodeJS Applications

- **Jest:** One of the most popular testing frameworks for NodeJS. It is easy to configure, supports unit and integration testing, and comes with built-in mocking and assertion libraries.
- **Other Popular Frameworks:** Mocha, Chai, Supertest (for HTTP APIs), Cypress (for E2E testing).

Today, we'll focus primarily on Jest for unit and integration testing.

## 2. Writing Unit Tests with Jest

### Installation and Setup of Jest

1. **Initialize your NodeJS project:**

   ```bash
   npm init -y
   ```

2. **Install Jest:**

   ```bash
   npm install --save-dev jest
   ```

3. **Add a test script to `package.json`:**
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

### Example: Writing Unit Tests

#### `discount.js`

```javascript
function calculateDiscount(price, percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Invalid discount percentage');
  }
  return price - price * (percentage / 100);
}

module.exports = calculateDiscount;
```

#### `discount.test.js`

```javascript
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

### Example: Testing an Express API

#### `app.js`

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

module.exports = app;
```

#### `app.test.js`

```javascript
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
- **Improves Software Design:** Encourages writing modular, loosely-coupled components.
- **Acts as Documentation:** Tests describe the expected behavior of the system.
- **Encourages Confidence:** Easier to refactor and extend code.

### TDD Workflow

1. Write a failing test first (**red**).
2. Write just enough code to pass the test (**green**).
3. Refactor code while keeping the test green.
4. Repeat.

### Example TDD Cycle

1. **Write a failing test for a new feature:**

   ```javascript
   test('should calculate tax of 5% on 100', () => {
     expect(calculateTax(100)).toBe(5);
   });
   ```

2. **Implement the function:**

   ```javascript
   function calculateTax(amount) {
     return amount * 0.05;
   }
   ```

3. **Refactor if needed.**
