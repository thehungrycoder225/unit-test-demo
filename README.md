# Jest Architecture Overview

Jest is a comprehensive JavaScript testing framework that provides:

- Test runner
- Assertion library
- Mocking capabilities
- Coverage reporting
- Snapshot testing

## Red-Green-Refactor for Beginners in Node.js

Test-Driven Development (TDD) follows a simple cycle:

1.  **Red** → Write a failing test.
2.  **Green** → Write minimal code to pass the test.
3.  **Refactor** → Improve code without breaking tests.

### Example: TDD with a `sum` Function

#### Red Phase: Write a Failing Test

Define the desired behavior before implementing the code.

**Test File:** `sum.test.js`

```javascript
const { sum } = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3); // Test fails (sum doesn’t exist yet!)
});
```

Run the test:

```bash
npm test
```

**Expected Result:** FAIL – `sum` is not defined.

#### Green Phase: Write Minimal Code to Pass

Write the simplest implementation to make the test pass.

**Implementation File:** `sum.js`

```javascript
function sum(a, b) {
  return a + b; // Simplest possible implementation
}

module.exports = { sum };
```

Run the test:

```bash
npm test
```

**Expected Result:** PASS – `sum(1, 2)` returns `3`.

#### Refactor Phase: Improve the Code

Enhance the implementation to handle edge cases.

**Updated Test File:** `sum.test.js`

```javascript
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('throws error if non-numbers are passed', () => {
  expect(() => sum('1', 2)).toThrow('Inputs must be numbers!');
});
```

**Refactored Implementation File:** `sum.js`

```javascript
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Inputs must be numbers!');
  }
  return a + b;
}

module.exports = { sum };
```

Run the test:

```bash
npm test
```

**Expected Result:** All tests pass!

### Real-World Example: User Registration

#### Step 1: Write Failing Tests

**Test File:** `userService.test.js`

```javascript
const { registerUser } = require('./userService');

test('registers a user with valid email & password', () => {
  const user = registerUser('test@example.com', 'password123');
  expect(user.email).toBe('test@example.com');
  expect(user.id).toBeDefined();
});

test('throws error if email is invalid', () => {
  expect(() => registerUser('invalid-email', 'password123')).toThrow(
    'Invalid email!'
  );
});
```

**Expected Result:** FAIL – `registerUser` doesn’t exist.

#### Step 2: Write Minimal Implementation

**Implementation File:** `userService.js`

```javascript
function registerUser(email, password) {
  if (!email.includes('@')) {
    throw new Error('Invalid email!');
  }
  return { email, id: Date.now() };
}

module.exports = { registerUser };
```

**Expected Result:** PASS – Basic functionality works.

#### Step 3: Refactor & Extend

Add more validations to improve the implementation.

**Updated Test File:** `userService.test.js`

```javascript
test('throws error if password is too short', () => {
  expect(() => registerUser('test@example.com', '123')).toThrow(
    'Password must be at least 8 characters!'
  );
});
```

**Refactored Implementation File:** `userService.js`

```javascript
function registerUser(email, password) {
  if (!email.includes('@')) throw new Error('Invalid email!');
  if (password.length < 8)
    throw new Error('Password must be at least 8 characters!');

  return { email, id: Date.now() };
}

module.exports = { registerUser };
```

**Expected Result:** All tests pass!

## Key Takeaways

- **Start with a failing test ( Red):** Define behavior first.
- **Make it pass quickly ( Green):** Write the simplest code possible.
- **Improve safely ( Refactor):** Optimize without breaking tests.

### Why TDD?

- ✔ **Fewer bugs:** Tests catch errors early.
- ✔ **Better design:** Forces you to think before coding.
- ✔ **Confidence:** Refactor fearlessly with tests in place.
