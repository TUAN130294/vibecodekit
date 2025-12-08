# Test Generator Skill

## Purpose
Automatically generate unit tests, integration tests, and E2E tests based on your code.

## Activation
- **Manual**: Type `/generate-tests` or use Vibecoder command
- **Context**: Analyzes the selected code or file

## Supported Test Types

### 1. Unit Tests
- Individual functions
- React components
- Utility functions
- Classes and methods

### 2. Integration Tests
- API endpoints
- Database operations
- Service layer
- Multiple components working together

### 3. E2E Tests
- User flows
- Critical paths
- Full application scenarios

## Test Generation Rules

### React Component Tests
```tsx
// Source: Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button
      className={`btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Generated: Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button variant="primary" onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    render(<Button variant="secondary" onClick={() => {}}>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles all variant types', () => {
    const variants = ['primary', 'secondary'] as const;
    variants.forEach(variant => {
      const { unmount } = render(
        <Button variant={variant} onClick={() => {}}>Test</Button>
      );
      expect(screen.getByRole('button')).toHaveClass(`btn-${variant}`);
      unmount();
    });
  });
});
```

### Custom Hook Tests
```tsx
// Source: useToggle.ts
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}

// Generated: useToggle.test.ts
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('initializes with default value false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current.toggle());
    expect(result.current.value).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.value).toBe(false);
  });

  it('sets to true', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current.setTrue());
    expect(result.current.value).toBe(true);
  });

  it('sets to false', () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => result.current.setFalse());
    expect(result.current.value).toBe(false);
  });

  it('maintains referential stability', () => {
    const { result, rerender } = renderHook(() => useToggle());
    const firstToggle = result.current.toggle;
    rerender();
    expect(result.current.toggle).toBe(firstToggle);
  });
});
```

### API Endpoint Tests
```ts
// Source: userController.ts
export class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await userService.findAll();
    res.json({ success: true, data: users });
  }

  async createUser(req: Request, res: Response) {
    const user = await userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  }
}

// Generated: userController.test.ts
import request from 'supertest';
import { app } from '../app';
import { userService } from '../services/userService';

jest.mock('../services/userService');

describe('UserController', () => {
  describe('GET /api/users', () => {
    it('returns list of users', async () => {
      const mockUsers = [
        { id: '1', name: 'John' },
        { id: '2', name: 'Jane' },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockUsers,
      });
    });

    it('handles service errors', async () => {
      jest.spyOn(userService, 'findAll').mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/users', () => {
    it('creates new user', async () => {
      const newUser = { name: 'John', email: 'john@example.com' };
      const createdUser = { id: '1', ...newUser };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const response = await request(app)
        .post('/api/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(createdUser);
    });

    it('validates required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });
});
```

### Utility Function Tests
```ts
// Source: formatDate.ts
export function formatDate(date: Date, format: 'short' | 'long'): string {
  if (format === 'short') {
    return date.toLocaleDateString();
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generated: formatDate.test.ts
import { formatDate } from './formatDate';

describe('formatDate', () => {
  const testDate = new Date('2024-01-15');

  it('formats date in short format', () => {
    const result = formatDate(testDate, 'short');
    expect(result).toBe('1/15/2024');
  });

  it('formats date in long format', () => {
    const result = formatDate(testDate, 'long');
    expect(result).toBe('Monday, January 15, 2024');
  });

  it('handles different dates', () => {
    const dates = [
      new Date('2024-01-01'),
      new Date('2024-12-31'),
      new Date('2024-06-15'),
    ];

    dates.forEach(date => {
      expect(() => formatDate(date, 'short')).not.toThrow();
      expect(() => formatDate(date, 'long')).not.toThrow();
    });
  });
});
```

## E2E Test Generation

```ts
// Generated: e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test('complete signup and login flow', async ({ page }) => {
    // Navigate to signup
    await page.goto('/signup');

    // Fill signup form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePassword123');
    await page.fill('[name="confirmPassword"]', 'SecurePassword123');

    // Submit
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');

    // Logout
    await page.click('[data-testid="logout-button"]');

    // Login again
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePassword123');
    await page.click('button[type="submit"]');

    // Verify successful login
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Configuration

```json
{
  "testGenerator": {
    "framework": "jest",
    "testingLibrary": "@testing-library/react",
    "coverage": {
      "minimum": 80,
      "exclude": ["*.test.ts", "*.spec.ts"]
    },
    "naming": {
      "pattern": "{name}.test.{ext}",
      "location": "colocated"
    },
    "e2e": {
      "framework": "playwright",
      "browsers": ["chromium", "firefox"]
    }
  }
}
```

## Usage

```bash
# Generate tests for current file
/generate-tests

# Generate tests for specific file
/generate-tests src/components/Button.tsx

# Generate only unit tests
/generate-tests --unit

# Generate E2E tests for user flow
/generate-tests --e2e user-authentication

# Update existing tests
/generate-tests --update
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the code does, not how it does it
   - Test user-facing behavior

2. **AAA Pattern**
   - Arrange: Set up test data
   - Act: Execute the code
   - Assert: Verify the result

3. **Test Coverage**
   - Aim for 80%+ coverage
   - Prioritize critical paths
   - Don't chase 100% coverage

4. **Test Independence**
   - Each test should run independently
   - No shared state between tests
   - Clean up after each test

5. **Descriptive Names**
   - Use clear, descriptive test names
   - Describe what is being tested and expected result
