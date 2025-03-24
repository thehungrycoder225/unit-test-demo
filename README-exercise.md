# TDD Coding Exercise: Building a Task Manager in Node.js

Practice Test-Driven Development (TDD) by building a simple Task Manager with the following features:

- Add a task
- List all tasks
- Mark a task as complete
- Delete a task

Follow the **Red → Green → Refactor** cycle for each feature.

---

## Step 1: Project Setup

1. Initialize a Node.js project:

   ```bash
   mkdir task-manager
   cd task-manager
   npm init -y
   npm install --save-dev jest
   ```

2. Update `package.json`:
   ```json
   "scripts": {
     "test": "jest --watchAll"
   }
   ```

---

## Step 2: TDD Walkthrough

### Feature 1: Add a Task

#### Red: Write a Failing Test

**File:** `taskManager.test.js`

```javascript
const { TaskManager } = require('./taskManager');

describe('TaskManager', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  test('adds a new task', () => {
    taskManager.addTask('Buy groceries');
    expect(taskManager.tasks.length).toBe(1);
    expect(taskManager.tasks[0].description).toBe('Buy groceries');
    expect(taskManager.tasks[0].completed).toBe(false);
  });
});
```

Run: `npm test`  
**FAIL** – `TaskManager` is not defined.

#### Green: Implement Just Enough to Pass

**File:** `taskManager.js`

```javascript
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    this.tasks.push({ description, completed: false });
  }
}

module.exports = { TaskManager };
```

**PASS** – Test now succeeds!

#### Refactor: Improve Code (If Needed)

No refactoring needed yet.

---

### Feature 2: List All Tasks

#### Red: Write a Failing Test

**File:** `taskManager.test.js`

```javascript
test('lists all tasks', () => {
  taskManager.addTask('Buy groceries');
  taskManager.addTask('Walk the dog');
  const tasks = taskManager.getAllTasks();

  expect(tasks.length).toBe(2);
  expect(tasks).toEqual([
    { description: 'Buy groceries', completed: false },
    { description: 'Walk the dog', completed: false },
  ]);
});
```

**FAIL** – `getAllTasks` is not a function.

#### Green: Implement `getAllTasks`

**File:** `taskManager.js`

```javascript
class TaskManager {
  // ... (previous code)

  getAllTasks() {
    return this.tasks;
  }
}
```

**PASS** – Test now succeeds!

#### Refactor: No Changes Needed Yet

---

### Feature 3: Mark a Task as Complete

#### Red: Write a Failing Test

**File:** `taskManager.test.js`

```javascript
test('marks a task as complete', () => {
  taskManager.addTask('Buy groceries');
  taskManager.completeTask(0); // Mark first task as complete

  expect(taskManager.tasks[0].completed).toBe(true);
});
```

**FAIL** – `completeTask` is not a function.

#### Green: Implement `completeTask`

**File:** `taskManager.js`

```javascript
class TaskManager {
  // ... (previous code)

  completeTask(index) {
    if (this.tasks[index]) {
      this.tasks[index].completed = true;
    }
  }
}
```

**PASS** – Test succeeds!

#### Refactor: Add Error Handling

**File:** `taskManager.test.js`

```javascript
test('throws error if task index is invalid', () => {
  expect(() => taskManager.completeTask(999)).toThrow('Task not found');
});
```

**File:** `taskManager.js`

```javascript
completeTask(index) {
  if (!this.tasks[index]) {
     throw new Error('Task not found');
  }
  this.tasks[index].completed = true;
}
```

**PASS** – Now handles errors!

---

### Feature 4: Delete a Task

#### Red: Write a Failing Test

**File:** `taskManager.test.js`

```javascript
test('deletes a task', () => {
  taskManager.addTask('Buy groceries');
  taskManager.deleteTask(0);
  expect(taskManager.tasks.length).toBe(0);
});

test('throws error if deleting invalid task', () => {
  expect(() => taskManager.deleteTask(999)).toThrow('Task not found');
});
```

**FAIL** – `deleteTask` is not a function.

#### Green: Implement `deleteTask`

**File:** `taskManager.js`

```javascript
class TaskManager {
  // ... (previous code)

  deleteTask(index) {
    if (!this.tasks[index]) {
      throw new Error('Task not found');
    }
    this.tasks.splice(index, 1);
  }
}
```

**PASS** – All tests succeed!

#### Refactor: No Changes Needed

---

## Final TaskManager Code

**File:** `taskManager.js`

```javascript
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    this.tasks.push({ description, completed: false });
  }

  getAllTasks() {
    return this.tasks;
  }

  completeTask(index) {
    if (!this.tasks[index]) {
      throw new Error('Task not found');
    }
    this.tasks[index].completed = true;
  }

  deleteTask(index) {
    if (!this.tasks[index]) {
      throw new Error('Task not found');
    }
    this.tasks.splice(index, 1);
  }
}

module.exports = { TaskManager };
```

---

## Key Lessons Learned

- ✔ **TDD encourages better design** by forcing you to think before coding.
- ✔ **Tests act as documentation** to show how the code should work.
- ✔ **Refactoring is safe** because passing tests ensure nothing is broken.

---

## Challenge for You!

Add a new feature: `getCompletedTasks()` → Returns only completed tasks.  
Follow the TDD cycle: Write the test first (** Red**), then implement (** Green**), then refactor (**Refactor**).
