# Test-Driven Development (TDD) Principles and Best Practices

## Benefits of TDD

- **Reduces Bugs Early**: Detect issues before code is fully developed.
- **Improves Software Design**: Encourages writing modular, loosely-coupled components.
- **Acts as Documentation**: Tests describe the expected behavior of the system.
- **Encourages Confidence**: Easier to refactor and extend code.

## TDD Workflow

1. Write a failing test first (**red**).
2. Write just enough code to pass the test (**green**).
3. Refactor code while keeping the test green.
4. Repeat.

### Example TDD Cycle

1. Write a failing test for a new feature:
   ```javascript
   test('should calculate tax of 5% on 100', () => {
     expect(calculateTax(100)).toBe(5);
   });
   ```
2. Implement the function:
   ```javascript
   function calculateTax(amount) {
     return amount * 0.05;
   }
   ```
3. Refactor if needed.

## Best Practices for TDD

- Start simple and build complexity incrementally.
- Keep tests isolated from external dependencies (e.g., use mocks).
- Avoid testing implementation details.
- Ensure tests are fast and deterministic.

---

## Lab Activity

### Objective

- Write Unit Tests for a NodeJS module simulating a real-world feature.
- Apply TDD principles to implement this feature.

### Scenario

Develop a simple "Currency Converter" module where you:

1. Write tests first (following TDD).
2. Implement a `convertCurrency(amount, rate)` function.
3. Handle edge cases (e.g., negative amounts, invalid rate).

### Steps

1. Create the test file `converter.test.js`.
2. Write TDD cycle: **Red → Green → Refactor**.
3. Add proper assertions using `expect()`.
4. Submit working tests and implementation.

---

## Research Task

### Objective

Investigate real-world TDD adoption in large-scale NodeJS projects or open-source libraries.

### Instructions

- Find 1-2 well-known NodeJS projects (e.g., ExpressJS, Fastify, Jest itself).
- Analyze how these projects incorporate TDD or testing-driven workflows.
- Write a 1-2 page report including:
  - **Description of the project**.
  - **How TDD is applied** (e.g., test-first development, CI pipelines).
  - **Benefits observed** (e.g., faster releases, fewer bugs).
  - **Challenges** (e.g., initial learning curve, speed).

### Deliverables

- Submit your report in PDF format.
- Prepare to briefly share key findings in next week’s class.
