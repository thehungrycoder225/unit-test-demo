# Writing Integration Testing for REST APIs with Jest

To test REST APIs, we commonly integrate Jest with Supertest.

## Example API

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

## Integration Test

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

## Best Practices for Integration Testing

1. **Test End-to-End Components Together**

   - Integration tests should verify that multiple components work together.
   - **Example**: Test API endpoints that hit your business logic and return HTTP responses.

2. **Use Realistic Scenarios**

   - Simulate real-world usage of your system (e.g., `POST /register`, `GET /users/:id`).

3. **Setup and Teardown Data**

   - Reset or seed databases/in-memory stores before each test to ensure tests do not depend on shared state.

   ```javascript
   beforeEach(() => {
     userService.clearUsers();
   });
   ```

4. **Use Supertest or Similar Tools**

   - In Node.js, use Supertest to make HTTP requests to your Express app without actually starting the server.

5. **Test Error Handling**

   - Ensure your integration tests check for both success and failure cases:
     - Valid data → `201 Created`
     - Missing fields → `400 Bad Request`
     - Non-existent resources → `404 Not Found`

6. **Run Integration Tests in CI/CD**
   - Automate these tests using GitHub Actions, GitLab CI/CD, or Jenkins.
