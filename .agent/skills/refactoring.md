# Refactoring Skill

## Purpose
Intelligent code refactoring suggestions and automated improvements for better code quality, maintainability, and performance.

## Activation
- **Manual**: Type `/refactor` or use Vibecoder command
- **Context**: Analyzes selected code or entire file

## Refactoring Categories

### 1. Extract Function
**When**: Code block is repeated or complex logic needs clarity

```tsx
// Before
function processOrder(order: Order) {
  // Validation
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.userId) {
    throw new Error('Order must have userId');
  }

  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }

  // Apply discount
  if (order.discountCode) {
    const discount = getDiscount(order.discountCode);
    total = total * (1 - discount);
  }

  return total;
}

// After
function processOrder(order: Order) {
  validateOrder(order);
  const subtotal = calculateSubtotal(order.items);
  return applyDiscount(subtotal, order.discountCode);
}

function validateOrder(order: Order) {
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.userId) {
    throw new Error('Order must have userId');
  }
}

function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(total: number, code?: string): number {
  if (!code) return total;
  const discount = getDiscount(code);
  return total * (1 - discount);
}
```

### 2. Extract Component
**When**: JSX is large or reusable

```tsx
// Before
function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <div className="header">
        <img src={user.avatar} alt={user.name} />
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="stats">
        <div>
          <span>Posts</span>
          <span>{user.postsCount}</span>
        </div>
        <div>
          <span>Followers</span>
          <span>{user.followersCount}</span>
        </div>
        <div>
          <span>Following</span>
          <span>{user.followingCount}</span>
        </div>
      </div>
    </div>
  );
}

// After
function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <UserHeader user={user} />
      <UserStats stats={user} />
    </div>
  );
}

function UserHeader({ user }: { user: User }) {
  return (
    <div className="header">
      <Avatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} email={user.email} />
    </div>
  );
}

function UserStats({ stats }: { stats: User }) {
  return (
    <div className="stats">
      <StatItem label="Posts" value={stats.postsCount} />
      <StatItem label="Followers" value={stats.followersCount} />
      <StatItem label="Following" value={stats.followingCount} />
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
```

### 3. Extract Custom Hook
**When**: Stateful logic is reused across components

```tsx
// Before
function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;
  return <div>{user?.name}</div>;
}

// After
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}

function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;
  return <div>{user?.name}</div>;
}
```

### 4. Replace Magic Numbers/Strings
**When**: Hardcoded values appear multiple times

```tsx
// Before
function calculateDiscount(price: number, tier: string) {
  if (tier === 'bronze') {
    return price * 0.05;
  } else if (tier === 'silver') {
    return price * 0.10;
  } else if (tier === 'gold') {
    return price * 0.15;
  }
  return 0;
}

// After
const DISCOUNT_RATES = {
  bronze: 0.05,
  silver: 0.10,
  gold: 0.15,
} as const;

type Tier = keyof typeof DISCOUNT_RATES;

function calculateDiscount(price: number, tier: Tier) {
  return price * (DISCOUNT_RATES[tier] ?? 0);
}
```

### 5. Simplify Conditional Logic
**When**: Complex if-else chains or nested conditions

```tsx
// Before
function getShippingCost(weight: number, distance: number, premium: boolean) {
  if (premium) {
    if (weight < 5) {
      if (distance < 100) {
        return 0;
      } else {
        return 5;
      }
    } else {
      if (distance < 100) {
        return 10;
      } else {
        return 15;
      }
    }
  } else {
    if (weight < 5) {
      return distance < 100 ? 5 : 10;
    } else {
      return distance < 100 ? 15 : 20;
    }
  }
}

// After
interface ShippingParams {
  weight: number;
  distance: number;
  premium: boolean;
}

const SHIPPING_RATES = {
  premium: { light: { near: 0, far: 5 }, heavy: { near: 10, far: 15 } },
  standard: { light: { near: 5, far: 10 }, heavy: { near: 15, far: 20 } },
};

function getShippingCost({ weight, distance, premium }: ShippingParams) {
  const tier = premium ? 'premium' : 'standard';
  const weightClass = weight < 5 ? 'light' : 'heavy';
  const distanceClass = distance < 100 ? 'near' : 'far';

  return SHIPPING_RATES[tier][weightClass][distanceClass];
}
```

### 6. Use Early Returns
**When**: Nested if statements reduce readability

```tsx
// Before
function processPayment(payment: Payment) {
  if (payment) {
    if (payment.amount > 0) {
      if (payment.method) {
        if (payment.status === 'pending') {
          // Process payment
          return processCharge(payment);
        } else {
          throw new Error('Payment already processed');
        }
      } else {
        throw new Error('Payment method required');
      }
    } else {
      throw new Error('Invalid amount');
    }
  } else {
    throw new Error('Payment required');
  }
}

// After
function processPayment(payment: Payment) {
  if (!payment) {
    throw new Error('Payment required');
  }

  if (payment.amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (!payment.method) {
    throw new Error('Payment method required');
  }

  if (payment.status !== 'pending') {
    throw new Error('Payment already processed');
  }

  return processCharge(payment);
}
```

### 7. Replace Loop with Array Methods
**When**: Imperative loops can be declarative

```tsx
// Before
function getActiveUserEmails(users: User[]): string[] {
  const emails: string[] = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive && users[i].email) {
      emails.push(users[i].email);
    }
  }
  return emails;
}

// After
function getActiveUserEmails(users: User[]): string[] {
  return users
    .filter(user => user.isActive && user.email)
    .map(user => user.email);
}
```

### 8. Remove Code Duplication
**When**: Similar code appears in multiple places

```tsx
// Before
function createUser(data: CreateUserData) {
  const user = new User();
  user.name = data.name;
  user.email = data.email;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
}

function updateUser(id: string, data: UpdateUserData) {
  const user = findUser(id);
  user.name = data.name;
  user.email = data.email;
  user.updatedAt = new Date();
  return user;
}

// After
function setUserData(user: User, data: Partial<UserData>) {
  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  user.updatedAt = new Date();
  return user;
}

function createUser(data: CreateUserData) {
  const user = new User();
  user.createdAt = new Date();
  return setUserData(user, data);
}

function updateUser(id: string, data: UpdateUserData) {
  const user = findUser(id);
  return setUserData(user, data);
}
```

### 9. Convert to TypeScript Generics
**When**: Code works with multiple types

```tsx
// Before
function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

// After
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Usage
const firstString = getFirst(['a', 'b', 'c']); // string | undefined
const firstNumber = getFirst([1, 2, 3]); // number | undefined
```

### 10. Introduce Design Pattern
**When**: Code structure can benefit from pattern

```tsx
// Before: No pattern
function handlePayment(type: string, amount: number) {
  if (type === 'credit') {
    // Credit card logic
  } else if (type === 'paypal') {
    // PayPal logic
  } else if (type === 'crypto') {
    // Crypto logic
  }
}

// After: Strategy Pattern
interface PaymentStrategy {
  process(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment implements PaymentStrategy {
  async process(amount: number) {
    // Credit card logic
  }
}

class PayPalPayment implements PaymentStrategy {
  async process(amount: number) {
    // PayPal logic
  }
}

class CryptoPayment implements PaymentStrategy {
  async process(amount: number) {
    // Crypto logic
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  async processPayment(amount: number) {
    return this.strategy.process(amount);
  }
}
```

## Refactoring Checklist

- [ ] **Readability**: Is the code easier to understand?
- [ ] **Maintainability**: Will changes be easier in the future?
- [ ] **Testability**: Is the code easier to test?
- [ ] **Performance**: Does it improve or maintain performance?
- [ ] **Type Safety**: Are types more precise?
- [ ] **DRY**: Is duplication removed?
- [ ] **SOLID**: Does it follow SOLID principles?
- [ ] **Tests**: Do all tests still pass?

## Configuration

```json
{
  "refactoring": {
    "autoApply": false,
    "suggestions": {
      "complexity": true,
      "duplication": true,
      "naming": true,
      "structure": true
    },
    "metrics": {
      "maxFunctionLength": 50,
      "maxComplexity": 10,
      "minDuplication": 3
    }
  }
}
```

## Usage

```bash
# Suggest refactoring for current file
/refactor

# Apply specific refactoring
/refactor --extract-function

# Auto-apply safe refactorings
/refactor --auto

# Analyze entire project
/refactor --project

# Focus on performance
/refactor --performance
```
