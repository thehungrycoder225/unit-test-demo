# Best Practice Examples

## 1. Unit Test Best Practice

### Bad Example:

```javascript
test('create user should add user', () => {
  const user = createUser({ id: 1, name: 'Alice' });
  expect(user).toBeDefined();
});
```

**Why it's bad:**

- Not descriptive.
- Doesn't validate important fields.
- Ignores edge cases (e.g., missing fields or duplicate users).

### Good Example:

```javascript
describe('createUser()', () => {
  test('should successfully create a user with valid input', () => {
    const user = createUser({ id: 1, name: 'Alice' });
    expect(user).toEqual({ id: 1, name: 'Alice' });
  });

  test('should throw an error if user already exists', () => {
    createUser({ id: 1, name: 'Alice' });
    expect(() => createUser({ id: 1, name: 'Alice' })).toThrow(
      'User already exists'
    );
  });

  test('should throw an error for missing user id', () => {
    expect(() => createUser({ name: 'Bob' })).toThrow('Invalid user data');
  });
});
```

---

## 2. Integration Test Best Practice

### Bad Example:

```javascript
test('POST /users should return 201', async () => {
  const res = await request(app).post('/users').send({ id: 1, name: 'Alice' });
  expect(res.statusCode).toBe(201);
});
```

**Why it’s bad:**

- Only checks HTTP status.
- Does not validate response body.
- No test for errors (e.g., missing fields, duplicate users).

### Good Example:

```javascript
describe('POST /users', () => {
  test('should create a user and return 201 with user data', async () => {
    const res = await request(app)
      .post('/users')
      .send({ id: 1, name: 'Alice' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1, name: 'Alice' });
  });

  test('should return 400 if user already exists', async () => {
    await request(app).post('/users').send({ id: 1, name: 'Alice' });
    const res = await request(app)
      .post('/users')
      .send({ id: 1, name: 'Alice' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('User already exists');
  });

  test('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/users').send({ name: 'Alice' }); // Missing ID
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid user data');
  });
});
```

---

## 3. CI/CD Automation Best Practice

### Bad Example:

- No automation, tests only run locally.

### Good Example:

- Automated testing pipeline (e.g., GitHub Actions workflow as discussed earlier).
- Generates test coverage artifacts automatically.

---

### Pro Tip:

> “Well-tested code isn't just about avoiding bugs—it's about writing code that is maintainable.”
