# React Development Rules

## Core Principles
- Use functional components with hooks (no class components unless legacy)
- Prefer composition over inheritance
- Keep components small and focused (single responsibility)
- Extract custom hooks for reusable logic
- Use TypeScript for all React code

## Component Structure
```tsx
// 1. Imports (React, types, components, hooks, utils)
import { useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

// 2. Types/Interfaces
interface Props {
  title: string;
  children: ReactNode;
  onAction?: () => void;
}

// 3. Component
export const MyComponent: FC<Props> = ({ title, children, onAction }) => {
  // a. State
  const [isOpen, setIsOpen] = useState(false);

  // b. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // c. Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
    onAction?.();
  };

  // d. Render
  return (
    <div>
      <h2>{title}</h2>
      {isOpen && children}
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
};
```

## Hooks Best Practices

### useState
- Initialize with appropriate default values
- Use functional updates for state that depends on previous state
```tsx
const [count, setCount] = useState(0);
setCount(prev => prev + 1); // Good
setCount(count + 1); // Avoid if used in callbacks
```

### useEffect
- Always specify dependency array
- Return cleanup function when needed
- Split into multiple effects for different concerns
```tsx
useEffect(() => {
  const subscription = api.subscribe();
  return () => subscription.unsubscribe();
}, [api]);
```

### useCallback & useMemo
- Only optimize when needed (profiling shows benefit)
- Avoid premature optimization
```tsx
const expensiveValue = useMemo(() => computeExpensive(data), [data]);
const handleSubmit = useCallback(() => { /* ... */ }, [deps]);
```

### Custom Hooks
- Prefix with "use"
- Extract reusable stateful logic
- Return consistent API (array or object)
```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle] as const;
}
```

## State Management

### Local State (useState)
- Use for component-specific UI state
- Forms, toggles, temporary data

### Context (useContext)
- Use for cross-component shared state
- Theme, auth, language
- Avoid for frequently changing data (causes re-renders)
```tsx
const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### External State (Zustand/Redux/Jotai)
- Use for complex global state
- Server cache (or use React Query/SWR)

## Data Fetching
- Use React Query or SWR for server state
- Separate server state from client state
```tsx
import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <UserList users={data} />;
}
```

## Performance

### Avoid Unnecessary Re-renders
- Use React.memo for expensive pure components
- Split large components into smaller ones
- Lift state down (keep state as local as possible)

### Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Error Handling
```tsx
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## Forms
- Use controlled components
- Consider react-hook-form for complex forms
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## TypeScript Tips
- Define Props interface for all components
- Use `FC<Props>` or explicit return type
- Leverage discriminated unions for variants
- Use generics for reusable components
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'md',
  children
}) => {
  return <button className={`btn-${variant} btn-${size}`}>{children}</button>;
};
```

## Testing
- Test user behavior, not implementation
- Use React Testing Library
```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('toggle button works', () => {
  render(<Toggle />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText('Open')).toBeInTheDocument();
});
```

## File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `useAuth.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- One component per file (except small related components)

## Folder Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── features/        # Feature-specific components
│   └── layouts/         # Layout components
├── hooks/               # Custom hooks
├── contexts/            # React contexts
├── utils/               # Utility functions
├── types/               # TypeScript types
└── pages/               # Page components (if not Next.js)
```

## Anti-Patterns to Avoid
- ❌ Prop drilling (use Context or composition)
- ❌ Huge components (split into smaller ones)
- ❌ Inline object/array literals in JSX (causes re-renders)
- ❌ Direct DOM manipulation (use refs sparingly)
- ❌ Mutating state directly
- ❌ Missing dependency arrays in useEffect
- ❌ Using index as key in dynamic lists

## Accessibility
- Always use semantic HTML
- Add ARIA labels when needed
- Ensure keyboard navigation works
- Test with screen readers
```tsx
<button
  aria-label="Close modal"
  onClick={onClose}
>
  <CloseIcon aria-hidden="true" />
</button>
```
