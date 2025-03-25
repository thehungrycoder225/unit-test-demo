# General Testing Best Practices

## 1. Write Tests Early (TDD Mindset)

- Write tests before or alongside your feature code.
- Encourages better design, reduces bugs, and improves maintainability.

## 2. Don’t Over-Mock in Integration Tests

- Use mocks only in unit tests.
- Allow components to interact naturally in integration tests (e.g., avoid mocking Express middlewares/services).

## 3. Test Edge Cases

- Go beyond the happy paths:
  - What happens with invalid input?
  - What if a required field is missing?
  - What if a user ID does not exist?

## 4. Refactor When Tests Fail

- Treat failing tests as opportunities to improve code quality.

## 5. Document Your Tests

- Provide a short doc or README for each test suite, explaining:
  - What is being tested.
  - How to run the tests.
  - Tools used (e.g., Jest, Supertest).

---

# FAQs: Questions to Ask During Testing

1. **What is the business rule this function should follow?**
2. **What are the expected inputs/outputs?**
3. **Are there edge cases or unexpected user behaviors?**
4. **Should this be tested at the unit level or as part of an integration?**
5. **How can this test help catch future regressions?**

---

# Common Testing Mistakes to Avoid

## 1. Testing Only the “Happy Path”

- Focusing only on successful operations and ignoring edge cases like invalid inputs or system failures.
- **Best Practice:** Include tests for both success and failure scenarios.

## 2. Mixing Unit Tests with Integration Tests

- Unit tests should isolate small functions without external systems like databases.
- **Best Practice:** Use mocks/stubs for external dependencies in unit tests, and reserve real DB/API calls for integration tests.

## 3. Poorly Named Test Cases

- Avoid vague names like `test('it works')` or `test('should pass')`.
- **Best Practice:** Use descriptive names like `test('should return 400 when email is missing')`.

## 4. Not Cleaning Up Test Data

- Leaving test data in the database between tests can cause unpredictable failures.
- **Best Practice:** Use `beforeEach/afterEach` or `beforeAll/afterAll` hooks to reset your database or mocks.

## 5. Over-Mocking

- Excessive mocking can lead to unrealistic tests that don’t reflect production.
- **Best Practice:** Mock external services (e.g., APIs, DB calls) but avoid mocking internal logic.

## 6. Not Automating Tests

- Running tests manually wastes time and risks skipping tests before deployment.
- **Best Practice:** Integrate tests into your CI/CD pipeline (e.g., GitHub Actions).

## 7. Ignoring Code Coverage

- Not reviewing coverage might mean missing critical business logic.
- **Best Practice:** Use `jest --coverage` and focus on meaningful coverage (not just aiming for 100%, but quality tests).

## 8. Not Testing Edge Cases

- Commonly overlooked scenarios include:
  - Empty inputs.
  - Large payloads.
  - Invalid data types.
  - Unauthorized access.
- **Best Practice:** Think like a hacker—try to break your own app in tests.
