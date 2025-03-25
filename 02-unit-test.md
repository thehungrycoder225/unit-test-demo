# Unit Testing Examples

## Example 1: Utility Function (String Formatter)

### Code

```javascript
// utils/formatter.js
function capitalize(str) {
  if (typeof str !== 'string') throw new Error('Input must be a string');
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = capitalize;
```

### Unit Tests

```javascript
// tests/formatter.test.js
const capitalize = require('../utils/formatter');

describe('capitalize()', () => {
  test('capitalizes the first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('capitalizes the first letter of a sentence', () => {
    expect(capitalize('world of testing')).toBe('World of testing');
  });

  test('throws an error if input is not a string', () => {
    expect(() => capitalize(123)).toThrow('Input must be a string');
  });
});
```

---

## Example 2: Math Utility

### Code

```javascript
// utils/math.js
function isEven(num) {
  if (typeof num !== 'number') throw new Error('Input must be a number');
  return num % 2 === 0;
}

module.exports = isEven;
```

### Unit Tests

```javascript
// tests/math.test.js
const isEven = require('../utils/math');

describe('isEven()', () => {
  test('returns true for even numbers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(0)).toBe(true);
  });

  test('returns false for odd numbers', () => {
    expect(isEven(5)).toBe(false);
  });

  test('throws an error for non-numeric inputs', () => {
    expect(() => isEven('4')).toThrow('Input must be a number');
  });
});
```

---

# Step-by-Step Guide: Documenting Unit Testing Procedure and Results

## Purpose

To formally document how unit testing was conducted, what tools were used, and the results obtained.

---

## UNIT TESTING DOCUMENTATION TEMPLATE

### 1. Project Name:

e.g., Currency Converter API

### 2. Module Name:

e.g., `utils/formatter.js`

### 3. Test Objective:

Describe the purpose of the unit tests.  
**Example:**  
"The objective is to verify that the `capitalize` function correctly transforms input strings by capitalizing the first character and handling error cases."

### 4. Test Environment Setup:

- **OS:** Windows 11 / macOS / Linux
- **NodeJS Version:** v18.x
- **Testing Framework:** Jest v29.x
- **Additional Tools:** Supertest (for API testing), ESLint (optional)
- **CI Tool (if applicable):** GitHub Actions

### 5. Test Cases Documented:

| Test Case ID | Test Description                 | Input Data           | Expected Output               | Actual Output                 | Pass/Fail |
| ------------ | -------------------------------- | -------------------- | ----------------------------- | ----------------------------- | --------- |
| TC-001       | Capitalize single lowercase word | `'hello'`            | `'Hello'`                     | `'Hello'`                     | Pass      |
| TC-002       | Capitalize sentence              | `'world of testing'` | `'World of testing'`          | `'World of testing'`          | Pass      |
| TC-003       | Input is non-string              | `123`                | Error: Input must be a string | Error: Input must be a string | Pass      |

---

### 6. Testing Procedure:

1. **Initialize NodeJS Project**

   ```bash
   npm init -y
   npm install --save-dev jest
   ```

2. **Write Unit Tests** in the `/tests` directory.

3. **Run Jest Test Suite**

   ```bash
   npx jest --coverage
   ```

4. **Capture Test Logs & Coverage Report**

---

### 7. Coverage Summary (Optional)

Paste Jest's generated report:

```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             | 100     | 100      | 100     | 100     |
 formatter.js         | 100     | 100      | 100     | 100     |
----------------------|---------|----------|---------|---------|-------------------
```

---

### 8. Observations and Notes:

- All tests passed successfully.
- Edge cases (non-string input) were handled correctly.
- **Coverage:** 100%
- No defects identified.

---

### 9. Recommendations:

- Maintain unit tests as new features are added.
- Integrate Jest into CI/CD pipeline for automatic testing on push.

---

### 10. Prepared By:

- **Name:** [Student/Developer Name]
- **Date:** [DD/MM/YYYY]
- **Reviewer (optional):** [Instructor or Team Lead Name]

---

## Step 2: Store Documentation

- Save as `unit_test_report_formatter.pdf`
- **Version control suggestion:** Keep a `/docs/testing/` folder in your repository.

---

## Step 3: Optional - Screenshots

For student-level or formal audits, you might also include:

- Screenshots of your terminal running the tests.
- Code snippets from your `*.test.js` files.

---

### Pro Tip:

For professional projects, tools like Allure or Jest reporters can automate test result reporting in HTML format for easier sharing with non-developers.

## Best Practices for Unit Testing

1. **Isolate Units of Work**

- Unit tests should test one function/class at a time, without relying on other modules (no DB calls, no HTTP requests).
- Use mocks or stubs to simulate external dependencies.

2. **Small and Focused Tests**

- Each test should check one thing only.
- Follow the AAA pattern (Arrange, Act, Assert):
  - **Arrange:** Setup necessary data/mocks.
  - **Act:** Call the function being tested.
  - **Assert:** Verify the expected outcome.

3. **Descriptive Test Names**

- Write clear, descriptive test names to explain what the test verifies:
  ```javascript
  test('should throw error if password is too short', () => { ... });
  ```

4. **Use Coverage Tools**

- Ensure high code coverage but prioritize meaningful coverage (test edge cases, not just happy paths).
- Use Jest’s built-in `--coverage` flag to track this.

5. **Keep Tests Fast**

- Avoid slow operations in unit tests (e.g., API calls, DB queries).
- Aim for tests to run in milliseconds.

6. **Keep Business Logic Separate from Framework Code**

- Example: Do not mix business logic with Express routes. Instead, have services or controllers that can be tested independently.

7. **Run Tests Frequently**

- Run unit tests during development, before commits, and in CI/CD pipelines.

## Assertion Techniques for Jest

### Using `expect()`

Jest provides a variety of matchers for different types of assertions:

```javascript
// Exact match
expect(5 + 3).toBe(8);

// Object deep equality
expect(user).toEqual({ name: 'John', age: 30 });

// Numeric comparisons
expect(response.statusCode).toBeGreaterThan(199);

// Instance checks
expect(error).toBeInstanceOf(Error);

// Regex match
expect('hello').toMatch(/ell/);

// Array contains value
expect(array).toContain(5);
```
