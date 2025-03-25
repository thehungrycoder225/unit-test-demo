# Example 1: Registration Function with Validation

### `registrationService.js`

```javascript
// services/registrationService.js
function registerUser({ username, email, password }) {
  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  return {
    username,
    email,
    createdAt: new Date(),
  };
}

module.exports = registerUser;
```

### `registrationService.test.js`

```javascript
// tests/registrationService.test.js
const registerUser = require('../services/registrationService');

describe('registerUser()', () => {
  test('registers user successfully with valid data', () => {
    const user = registerUser({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'secret123',
    });

    expect(user).toHaveProperty('username', 'john_doe');
    expect(user).toHaveProperty('email', 'john@example.com');
    expect(user).toHaveProperty('createdAt');
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  test('throws error when required fields are missing', () => {
    expect(() => registerUser({ username: 'john_doe' })).toThrow(
      'All fields are required'
    );
  });

  test('throws error for invalid email format', () => {
    expect(() =>
      registerUser({
        username: 'john_doe',
        email: 'johnexample.com',
        password: 'secret123',
      })
    ).toThrow('Invalid email');
  });

  test('throws error if password is too short', () => {
    expect(() =>
      registerUser({
        username: 'john_doe',
        email: 'john@example.com',
        password: '123',
      })
    ).toThrow('Password must be at least 6 characters long');
  });
});
```

---

# Example 2: CRUD Service with Validation

Let’s simulate a basic User CRUD service for a database-less environment (we'll use an in-memory array).

### `userService.js`

```javascript
// services/userService.js
const users = [];

function createUser({ id, name }) {
  if (!id || !name) throw new Error('ID and Name are required');
  if (users.find((u) => u.id === id)) throw new Error('User already exists');

  const user = { id, name };
  users.push(user);
  return user;
}

function getUser(id) {
  return users.find((u) => u.id === id) || null;
}

function updateUser(id, newName) {
  const user = users.find((u) => u.id === id);
  if (!user) throw new Error('User not found');
  user.name = newName;
  return user;
}

function deleteUser(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error('User not found');
  return users.splice(index, 1)[0];
}

function clearUsers() {
  users.length = 0;
}

module.exports = { createUser, getUser, updateUser, deleteUser, clearUsers };
```

### `userService.test.js`

```javascript
// tests/userService.test.js
const userService = require('../services/userService');

beforeEach(() => {
  userService.clearUsers(); // Reset in-memory DB before each test
});

describe('User CRUD Service', () => {
  test('should create a user successfully', () => {
    const user = userService.createUser({ id: 1, name: 'Alice' });
    expect(user).toEqual({ id: 1, name: 'Alice' });
  });

  test('should not allow creating a user with missing fields', () => {
    expect(() => userService.createUser({ id: 1 })).toThrow(
      'ID and Name are required'
    );
  });

  test('should prevent creating duplicate users', () => {
    userService.createUser({ id: 1, name: 'Alice' });
    expect(() => userService.createUser({ id: 1, name: 'Alice' })).toThrow(
      'User already exists'
    );
  });

  test('should fetch a user by ID', () => {
    userService.createUser({ id: 1, name: 'Alice' });
    const user = userService.getUser(1);
    expect(user).toEqual({ id: 1, name: 'Alice' });
  });

  test('should return null if user not found', () => {
    const user = userService.getUser(99);
    expect(user).toBeNull();
  });

  test("should update a user's name", () => {
    userService.createUser({ id: 1, name: 'Alice' });
    const updatedUser = userService.updateUser(1, 'Alicia');
    expect(updatedUser.name).toBe('Alicia');
  });

  test('should throw error when updating non-existent user', () => {
    expect(() => userService.updateUser(99, 'Bob')).toThrow('User not found');
  });

  test('should delete a user', () => {
    userService.createUser({ id: 1, name: 'Alice' });
    const deletedUser = userService.deleteUser(1);
    expect(deletedUser).toEqual({ id: 1, name: 'Alice' });
    expect(userService.getUser(1)).toBeNull();
  });

  test('should throw error when deleting non-existent user', () => {
    expect(() => userService.deleteUser(99)).toThrow('User not found');
  });
});
```

---

## Workflows

- **Registration service** is often part of authentication flows.
- **CRUD service with validations** models what you would build in APIs to manage resources like Users, Orders, Products, etc.

---

## Step-by-Step Documentation for This CRUD Example

### 1. Project Name:

**User Management Service**

### 2. Module Name:

`services/userService.js`

### 3. Test Objective:

To verify CRUD operations (`createUser`, `getUser`, `updateUser`, `deleteUser`) handle both valid and invalid inputs properly.

### 4. Test Cases Table Example

| Test Case ID | Test Description         | Input Data                     | Expected Output            | Actual Output              | Pass/Fail |
| ------------ | ------------------------ | ------------------------------ | -------------------------- | -------------------------- | --------- |
| TC-101       | Create valid user        | `{ id:1, name:'Alice' }`       | `{ id:1, name:'Alice' }`   | `{ id:1, name:'Alice' }`   | Pass      |
| TC-102       | Duplicate user ID        | `{ id:1, name:'Alice' } twice` | Error: User already exists | Error: User already exists | Pass      |
| TC-103       | Fetch non-existent user  | `id:99`                        | `null`                     | `null`                     | Pass      |
| TC-104       | Update non-existent user | `id:99, newName:'Bob'`         | Error: User not found      | Error: User not found      | Pass      |
| TC-105       | Delete valid user        | `id:1`                         | `{ id:1, name:'Alice' }`   | `{ id:1, name:'Alice' }`   | Pass      |

---

## ExpressJS API Layer for Full-Stack Testing (with Supertest)

### Step 1: Build an Express API Layer

#### `server.js`

```javascript
// server.js
const express = require('express');
const userService = require('./services/userService');

const app = express();
app.use(express.json());

// CREATE
app.post('/users', (req, res) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
app.get('/users/:id', (req, res) => {
  const user = userService.getUser(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// UPDATE
app.put('/users/:id', (req, res) => {
  try {
    const user = userService.updateUser(parseInt(req.params.id), req.body.name);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// DELETE
app.delete('/users/:id', (req, res) => {
  try {
    const user = userService.deleteUser(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = app;
```

#### `index.js`

```javascript
// index.js
const app = require('./server');

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

---

### Step 2: Integration Testing with Supertest + Jest

#### `tests/api.test.js`

```javascript
// tests/api.test.js
const request = require('supertest');
const app = require('../server');
const userService = require('../services/userService');

beforeEach(() => {
  userService.clearUsers(); // reset in-memory DB before every test
});

describe('User API Endpoints', () => {
  test('POST /users - should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ id: 1, name: 'Alice' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1, name: 'Alice' });
  });

  test('POST /users - should not allow duplicate users', async () => {
    await request(app).post('/users').send({ id: 1, name: 'Alice' });

    const res = await request(app)
      .post('/users')
      .send({ id: 1, name: 'Alice' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('User already exists');
  });

  test('GET /users/:id - should return user if exists', async () => {
    await request(app).post('/users').send({ id: 1, name: 'Alice' });

    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'Alice' });
  });

  test('GET /users/:id - should return 404 if user not found', async () => {
    const res = await request(app).get('/users/99');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  test('PUT /users/:id - should update a user', async () => {
    await request(app).post('/users').send({ id: 1, name: 'Alice' });

    const res = await request(app).put('/users/1').send({ name: 'Alicia' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alicia');
  });

  test('DELETE /users/:id - should delete a user', async () => {
    await request(app).post('/users').send({ id: 1, name: 'Alice' });

    const res = await request(app).delete('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'Alice' });
  });
});
```

---

### Step 3: Running the Tests

```bash
npm install --save-dev jest supertest express
npx jest --coverage
```

#### Terminal Output:

```plaintext
 PASS  tests/api.test.js
    User API Endpoints
        ✓ POST /users - should create a user (45 ms)
        ✓ POST /users - should not allow duplicate users (10 ms)
        ✓ GET /users/:id - should return user if exists (8 ms)
        ✓ GET /users/:id - should return 404 if user not found (5 ms)
        ✓ PUT /users/:id - should update a user (9 ms)
        ✓ DELETE /users/:id - should delete a user (8 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

---

### Step 4: How to Document Integration Testing

#### Integration Test Objective:

To verify API endpoints for creating, reading, updating, and deleting users via HTTP requests with ExpressJS and Supertest.

#### Test Environment Setup (for Integration Testing):

- **ExpressJS v4.x**
- **Supertest v6.x**
- **Jest v29.x**
- **NodeJS v18.x**

#### Sample Test Case Table:

| Test Case ID | API Endpoint | Method | Input                              | Expected Output                     | Status |
| ------------ | ------------ | ------ | ---------------------------------- | ----------------------------------- | ------ |
| API-TC-01    | `/users`     | POST   | `{ id:1, name:'Alice' }`           | HTTP 201, `{ id:1, name:'Alice' }`  | Pass   |
| API-TC-02    | `/users`     | POST   | Duplicate `{ id:1, name:'Alice' }` | HTTP 400, User already exists       | Pass   |
| API-TC-03    | `/users/1`   | GET    | N/A                                | HTTP 200, `{ id:1, name:'Alice' }`  | Pass   |
| API-TC-04    | `/users/99`  | GET    | N/A                                | HTTP 404, User not found            | Pass   |
| API-TC-05    | `/users/1`   | PUT    | `{ name:'Alicia' }`                | HTTP 200, `{ id:1, name:'Alicia' }` | Pass   |
| API-TC-06    | `/users/1`   | DELETE | N/A                                | HTTP 200, `{ id:1, name:'Alice' }`  | Pass   |

---

### Step 5: Automate Testing in GitHub Actions (Optional)

#### `.github/workflows/ci.yml`

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
                node-version: [18.x, 20.x] # test against multiple Node versions

        steps:
        - name: Checkout code
            uses: actions/checkout@v3

        - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
                node-version: ${{ matrix.node-version }}

        - name: Install dependencies
            run: npm install

        - name: Run Unit & Integration Tests
            run: npm test -- --coverage

        - name: Upload coverage reports
            if: always()
            uses: actions/upload-artifact@v3
            with:
                name: coverage-report
                path: coverage/
```

---

### Step 6: Update `package.json` Scripts

```json
"scripts": {
    "test": "jest"
}
```

---

### Optional Add-ons:

- **Codecov/coveralls integration** (to visualize code coverage).
- **Docker build & push steps** if you are containerizing the API.
- **Notifications** to Slack/MS Teams for test results.

#### Codecov Integration (Optional):

1. Sign up on [Codecov](https://codecov.io) and link your GitHub repository.
2. Add this to the workflow:

```yaml
- name: Upload coverage to Codecov
    uses: codecov/codecov-action@v3
    with:
        token: ${{ secrets.CODECOV_TOKEN }}
```
