# React Component Template

## Usage

This template creates a fully-typed React component with tests.

### Generate Component

```bash
# Using Vibecoder
/generate component UserCard

# Or manually copy and rename files
```

### What Gets Generated

```
components/UserCard/
├── UserCard.tsx          # Component implementation
├── UserCard.test.tsx     # Unit tests
└── index.ts              # Export barrel
```

### Template Variables

- `{{ComponentName}}` - Name of your component (PascalCase)
- Replace all instances in the template files

### Example Output

```tsx
// UserCard.tsx
import { FC } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export const UserCard: FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      {avatar && <img src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
```

## Customization

### Add State

```tsx
const [isExpanded, setIsExpanded] = useState(false);
```

### Add Event Handlers

```tsx
interface UserCardProps {
  onCardClick?: () => void;
}

const handleClick = () => {
  onCardClick?.();
};
```

### Add Styling

With Tailwind:
```tsx
<div className="bg-white p-4 rounded-lg shadow-md">
```

With CSS Modules:
```tsx
import styles from './UserCard.module.css';

<div className={styles.container}>
```

## Best Practices

1. Keep components focused and single-purpose
2. Use TypeScript for all props
3. Add JSDoc comments for complex components
4. Include accessibility attributes
5. Write tests for all user interactions
6. Extract large components into smaller ones
