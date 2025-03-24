# Why Jest?

Jest is a powerful, developer-friendly testing framework widely used in the JavaScript ecosystem. It’s particularly popular in Node.js and React projects due to its simplicity, built-in features (like mocking and code coverage), and seamless integration with modern development workflows.

## Installation and Setup

### Install Jest

Run the following command to add Jest as a development dependency:

```bash
npm install --save-dev jest
```

### Update `package.json`

Add a test script to your `package.json`:

```json
"scripts": {
    "test": "jest"
}
```

### Configuration

Create a `jest.config.js` file to customize Jest settings:

```javascript
module.exports = {
  testEnvironment: 'node', // For Node.js applications
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Writing Basic Unit Tests

Unit tests focus on testing individual units of code (e.g., functions, methods) in isolation. Let’s explore this with a real-world example.

### Example Scenario

You’re building a utility module for a Node.js application that calculates discounts for an e-commerce platform.

#### Create a Function to Test

Write a `calculateDiscount` function in `discountUtils.js`:

```javascript
function calculateDiscount(price, discountPercentage) {
  if (price <= 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Invalid input');
  }
  return price - price * (discountPercentage / 100);
}

module.exports = calculateDiscount;
```

#### Write Unit Tests

Create a test file `discountUtils.test.js`:

```javascript
const calculateDiscount = require('./discountUtils');

describe('calculateDiscount', () => {
  test('applies 10% discount to $100', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });

  test('throws error for negative price', () => {
    expect(() => calculateDiscount(-100, 10)).toThrow('Invalid input');
  });

  test('throws error for invalid discount percentage', () => {
    expect(() => calculateDiscount(100, 110)).toThrow('Invalid input');
  });

  test('applies 0% discount correctly', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
});
```

#### Run Tests

Execute the following command to run the tests:

```bash
npm test
```

Jest will automatically detect and run all `*.test.js` files.

## Jest as a Standalone Testing Framework

### Built-in Features

- **Mocking**: Mock dependencies to test units in isolation.
  ```javascript
  jest.mock('./someDependency', () => ({
    fetchData: jest.fn(() => 'mocked data'),
  }));
  ```
- **Snapshot Testing**: Ensure outputs don’t change unexpectedly, useful for UI components.
- **Parallel Test Execution**: Improves performance by running tests in parallel.
- **Standalone Execution**: No additional libraries required for assertions or test runners.

## Generating Coverage Reports

### Enable Coverage

Add the `--coverage` flag to the test script:

```json
"scripts": {
    "test": "jest --coverage"
}
```

### View Coverage Report

After running tests, Jest generates a `coverage` folder with an HTML report. Open `index.html` to view detailed metrics (e.g., lines, functions, branches covered).

### CI Integration

Integrate coverage reports into CI/CD pipelines (e.g., GitHub Actions, Jenkins) to enforce coverage thresholds and ensure code quality.

## Real-World Context

### E-commerce Example

Unit tests for `calculateDiscount` ensure pricing logic is accurate and edge cases (e.g., negative prices, invalid discounts) are handled correctly. This prevents financial discrepancies and improves customer trust.

### API Development

Validate utility functions (e.g., input sanitization, data transformation) before integrating them into larger systems.

### Refactoring Confidence

Unit tests act as a safety net when refactoring code. For example, if you optimize the `calculateDiscount` function, running tests ensures the behavior remains consistent.

## Best Practices for Writing Unit Tests with Jest

- **Test One Thing at a Time**: Focus each test on a single behavior or edge case.
- **Use Descriptive Test Names**: Clearly describe what the test validates (e.g., `'throws error for negative price'`).
- **Mock External Dependencies**: Isolate the unit under test by mocking APIs, databases, or other external services.
- **Follow the AAA Pattern**:
  - **Arrange**: Set up the test environment.
  - **Act**: Execute the function or method being tested.
  - **Assert**: Validate the output or behavior.
- **Maintain High Coverage**: Aim for at least 80% coverage, prioritizing critical and complex logic.

## Example Workflow in a Team Setting

1. **Feature Development**: Write unit tests for a new feature (e.g., discount calculation) before implementing the logic.
2. **Code Review**: Verify that tests cover all edge cases and align with requirements.
3. **CI Integration**: Automatically run tests in the CI pipeline and share coverage reports with the team.
4. **Bug Fixing**: Write a failing test to reproduce the issue, then fix the code to pass the test.
