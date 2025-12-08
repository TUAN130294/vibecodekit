# Code Generation Prompts

## Component Generation

### Prompt Template
```
Generate a React component named {{ComponentName}} with the following requirements:
- Props: {{propsList}}
- Functionality: {{functionality}}
- Styling: Tailwind CSS
- Accessibility: WCAG AA compliant
- Tests: Include unit tests

Include:
1. Component file with TypeScript
2. Test file with React Testing Library
3. Proper prop types and JSDoc
4. Loading and error states if needed
```

### Example
```
Generate a React component named UserCard with the following requirements:
- Props: user (object with id, name, email, avatar), onEdit (callback)
- Functionality: Display user information with edit button
- Styling: Tailwind CSS (card style with shadow)
- Accessibility: WCAG AA compliant
- Tests: Include unit tests for rendering and button click
```

---

## API Endpoint Generation

### Prompt Template
```
Generate a REST API endpoint for {{resource}} with:
- Method: {{method}} (GET/POST/PUT/DELETE)
- Path: /api/{{resource}}
- Input validation: {{validationSchema}}
- Response format: JSON with success/error
- Database: {{database}}
- Authentication: {{authRequired}}

Include:
1. Route handler with TypeScript
2. Input validation with Zod
3. Error handling
4. Integration tests
```

### Example
```
Generate a REST API endpoint for products with:
- Method: POST
- Path: /api/products
- Input validation: name (required, min 3 chars), price (required, positive number), stock (optional, non-negative)
- Response format: JSON with success/error
- Database: Prisma with PostgreSQL
- Authentication: Required (JWT)
```

---

## Custom Hook Generation

### Prompt Template
```
Generate a React custom hook named {{hookName}} that:
- Purpose: {{purpose}}
- Parameters: {{parameters}}
- Returns: {{returnValues}}
- Side effects: {{sideEffects}}
- Dependencies: {{dependencies}}

Include:
1. Hook implementation with TypeScript
2. Tests with @testing-library/react-hooks
3. JSDoc documentation
4. Usage example
```

### Example
```
Generate a React custom hook named useDebounce that:
- Purpose: Debounce a value to delay state updates
- Parameters: value (any), delay (number in ms)
- Returns: debouncedValue
- Side effects: Sets up timer with useEffect
- Dependencies: useState, useEffect

Include proper TypeScript typing and cleanup.
```

---

## Database Model Generation

### Prompt Template
```
Generate a database model for {{modelName}} with:
- ORM: {{orm}} (Prisma/TypeORM/Mongoose)
- Fields: {{fieldsList}}
- Relations: {{relationsList}}
- Indexes: {{indexesList}}
- Validation: {{validationRules}}

Include:
1. Schema/Entity definition
2. Migration file
3. Type definitions
4. CRUD service methods
```

### Example
```
Generate a database model for Product with:
- ORM: Prisma
- Fields: id (UUID), name (string), description (text), price (decimal), stock (int), imageUrl (string optional), createdAt (datetime), updatedAt (datetime)
- Relations: belongs to Category, has many Reviews
- Indexes: name, price
- Validation: price must be positive, stock non-negative
```

---

## Full Feature Generation

### Prompt Template
```
Generate a complete CRUD feature for {{featureName}} including:
- Frontend: List, create, edit, delete pages
- Backend: REST API endpoints
- Database: Schema and migrations
- Tests: Unit, integration, E2E
- Validation: Frontend and backend
- Authentication: {{authLevel}}

Stack:
- Frontend: {{frontend}}
- Backend: {{backend}}
- Database: {{database}}
```

### Example
```
Generate a complete CRUD feature for Blog Posts including:
- Frontend: Posts list with pagination, create post form, edit post page, delete confirmation
- Backend: GET /api/posts (list), POST /api/posts (create), PUT /api/posts/:id (update), DELETE /api/posts/:id (delete)
- Database: Prisma with PostgreSQL
- Tests: Jest for backend, React Testing Library for frontend, Playwright for E2E
- Validation: Title required (min 5 chars), content required (min 100 chars)
- Authentication: Required for create/edit/delete, public read

Stack:
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: Next.js API Routes
- Database: Prisma + PostgreSQL
```

---

## Test Generation

### Prompt Template
```
Generate tests for {{target}} covering:
- Test type: {{testType}} (unit/integration/e2e)
- Framework: {{framework}}
- Coverage areas: {{coverageAreas}}
- Edge cases: {{edgeCases}}
- Mocking: {{mockingNeeds}}

Include:
1. Complete test suite
2. Setup/teardown if needed
3. Descriptive test names
4. Assertions for expected behavior
```

### Example
```
Generate tests for UserService class covering:
- Test type: Unit tests
- Framework: Jest
- Coverage areas: createUser, updateUser, deleteUser, findUserById
- Edge cases: Duplicate email, invalid input, user not found
- Mocking: Mock Prisma client

Include tests for successful operations and error handling.
```

---

## Refactoring Prompts

### Extract Function
```
Refactor this code by extracting {{description}} into a separate function:
- Function name: {{functionName}}
- Parameters: {{parameters}}
- Return type: {{returnType}}
- Preserve existing behavior
- Add TypeScript types
- Add JSDoc
```

### Extract Component
```
Refactor this component by extracting {{part}} into a separate component:
- Component name: {{componentName}}
- Props needed: {{props}}
- Keep styling consistent
- Maintain accessibility
- Update tests if needed
```

---

## Documentation Generation

### API Documentation
```
Generate API documentation for {{endpoint}}:
- Method: {{method}}
- Path: {{path}}
- Request format
- Response format
- Status codes
- Example requests/responses
- Error cases
```

### Component Documentation
```
Generate component documentation for {{componentName}}:
- Purpose and use cases
- Props table with types and descriptions
- Usage examples
- Styling customization
- Accessibility notes
- Related components
```

---

## Tips for Effective Prompts

1. **Be Specific**: Include exact requirements and constraints
2. **Provide Context**: Mention existing tech stack and patterns
3. **List Requirements**: Break down what you need clearly
4. **Include Examples**: Show desired output format
5. **Mention Standards**: Specify coding standards, accessibility, etc.
6. **State Assumptions**: Make implicit requirements explicit
7. **Request Tests**: Always ask for tests with generated code
8. **Ask for Types**: Ensure TypeScript types are included
9. **Specify Framework Versions**: Mention if using specific versions
10. **Include Error Handling**: Request proper error handling
