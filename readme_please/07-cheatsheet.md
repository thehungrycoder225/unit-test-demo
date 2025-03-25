# Jest + Supertest Cheat Sheet

## 1. Basic Jest Syntax

```javascript
describe('FunctionName', () => {
    test('should do something', () => {
        // Arrange
        const input = ...;
        // Act
        const result = functionName(input);
        // Assert
        expect(result).toBe(expectedOutput);
    });
});
```

## 2. Common Assertions

| Syntax                              | Description                              |
| ----------------------------------- | ---------------------------------------- |
| `expect(value).toBe(value)`         | Checks if values are strictly equal.     |
| `expect(value).toEqual(object)`     | Checks deep equality for objects/arrays. |
| `expect(value).toBeTruthy()`        | Checks if value is truthy.               |
| `expect(value).toBeFalsy()`         | Checks if value is falsy.                |
| `expect(value).toContain(item)`     | Checks if array/string contains item.    |
| `expect(fn).toThrow(error)`         | Checks if function throws an error.      |
| `expect(asyncFn).rejects.toThrow()` | For async functions throwing errors.     |

## 3. Mocking Functions

```javascript
const myService = {
  getUser: jest.fn(),
};

myService.getUser.mockReturnValue({ id: 1, name: 'Test' });
expect(myService.getUser).toHaveBeenCalled();
expect(myService.getUser).toHaveBeenCalledWith(1);
```

## 4. Mocking External Modules

```javascript
jest.mock('axios');
const axios = require('axios');

axios.get.mockResolvedValue({ data: { id: 1 } });
```

---

# Supertest Patterns

## 1. Basic HTTP Requests

```javascript
const request = require('supertest');
const app = require('../app'); // Your Express app

test('GET /api/users should return all users', async () => {
  const res = await request(app).get('/api/users');
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
```

## 2. POST Request with Payload

```javascript
test('POST /api/users should create a user', async () => {
  const payload = { name: 'Alice', email: 'alice@mail.com' };
  const res = await request(app).post('/api/users').send(payload);
  expect(res.statusCode).toBe(201);
  expect(res.body).toMatchObject(payload);
});
```

## 3. Sending Auth Headers

```javascript
test('GET /api/protected requires auth', async () => {
  const res = await request(app)
    .get('/api/protected')
    .set('Authorization', 'Bearer token123');

  expect(res.statusCode).toBe(200);
});
```

## 4. Checking Error Responses

```javascript
test('POST /api/users returns 400 for invalid data', async () => {
  const res = await request(app).post('/api/users').send({ email: '' });
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('Name is required');
});
```

---

# Jest Hooks

```javascript
beforeAll(() => {
  // Setup before all tests (e.g., DB connection)
});

afterAll(() => {
  // Cleanup after all tests (e.g., close DB)
});

beforeEach(() => {
  // Runs before each test (e.g., reset mocks, clear DB)
});

afterEach(() => {
  // Runs after each test
});
```

---

# Quick Reminders

- Always test both success and error cases.
- Keep unit tests fast (no external API or DB calls).
- Keep integration tests realistic (simulate user behavior).
- Use `jest --coverage` to check your test coverage report.
- Automate your tests in your CI/CD pipeline.
