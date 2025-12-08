# MongoDB Development Rules

## Setup

### Installation
```bash
npm install mongodb mongoose
npm install -D @types/mongodb
```

### Connection
```ts
// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use global variable to preserve connection across hot reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, create new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

## Schema Design

### Use Mongoose for Schema Validation

```ts
// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age seems unrealistic'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ name: 'text' }); // Text search

// Virtual fields
UserSchema.virtual('isAdult').get(function () {
  return this.age && this.age >= 18;
});

// Methods
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

### Embedded Documents vs References

#### Embedded (One-to-Few)
Use when data is tightly coupled and always accessed together

```ts
// Good for address (1-3 addresses per user)
const UserSchema = new Schema({
  name: String,
  addresses: [{
    street: String,
    city: String,
    country: String,
  }],
});
```

#### References (One-to-Many)
Use when data is large or independently accessed

```ts
// Good for posts (potentially hundreds per user)
const PostSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Query with populate
const posts = await Post.find().populate('author');
```

## CRUD Operations

### Create
```ts
// Single document
const user = await User.create({
  email: 'john@example.com',
  name: 'John Doe',
  age: 30,
});

// Multiple documents
const users = await User.insertMany([
  { email: 'user1@example.com', name: 'User 1' },
  { email: 'user2@example.com', name: 'User 2' },
]);
```

### Read
```ts
// Find all
const users = await User.find();

// Find with filter
const adults = await User.find({ age: { $gte: 18 } });

// Find one
const user = await User.findOne({ email: 'john@example.com' });
const userById = await User.findById(userId);

// With projection (select specific fields)
const users = await User.find({}, 'name email'); // Only return name and email

// With sorting and pagination
const users = await User.find()
  .sort({ createdAt: -1 }) // Newest first
  .skip(20) // Skip first 20
  .limit(10); // Return 10 results

// Count
const count = await User.countDocuments({ age: { $gte: 18 } });
```

### Update
```ts
// Update one
const result = await User.updateOne(
  { email: 'john@example.com' },
  { $set: { age: 31 } }
);

// Update and return document
const user = await User.findByIdAndUpdate(
  userId,
  { $set: { age: 31 } },
  { new: true } // Return updated document
);

// Update many
await User.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: 'minor' } }
);

// Increment
await User.updateOne(
  { _id: userId },
  { $inc: { loginCount: 1 } }
);

// Add to array
await User.updateOne(
  { _id: userId },
  { $push: { addresses: newAddress } }
);
```

### Delete
```ts
// Delete one
await User.deleteOne({ email: 'john@example.com' });

// Find and delete (returns deleted document)
const user = await User.findByIdAndDelete(userId);

// Delete many
await User.deleteMany({ status: 'inactive' });
```

## Advanced Queries

### Comparison Operators
```ts
// Greater than, less than
const users = await User.find({
  age: { $gt: 18, $lt: 65 }, // Between 18 and 65
});

// In array
const users = await User.find({
  status: { $in: ['active', 'pending'] },
});

// Not equal
const users = await User.find({
  status: { $ne: 'deleted' },
});
```

### Logical Operators
```ts
// AND (implicit)
const users = await User.find({
  age: { $gte: 18 },
  status: 'active',
});

// OR
const users = await User.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 65 } },
  ],
});

// NOT
const users = await User.find({
  age: { $not: { $gte: 18 } },
});
```

### Text Search
```ts
// Requires text index on field
const users = await User.find({
  $text: { $search: 'John Doe' },
});
```

### Aggregation Pipeline
```ts
// Complex data processing
const result = await User.aggregate([
  // Stage 1: Match
  { $match: { status: 'active' } },

  // Stage 2: Group
  {
    $group: {
      _id: '$country',
      count: { $sum: 1 },
      avgAge: { $avg: '$age' },
    },
  },

  // Stage 3: Sort
  { $sort: { count: -1 } },

  // Stage 4: Limit
  { $limit: 10 },
]);

// Example: User posts count
const usersWithPostCount = await User.aggregate([
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'author',
      as: 'posts',
    },
  },
  {
    $addFields: {
      postCount: { $size: '$posts' },
    },
  },
  {
    $project: {
      name: 1,
      email: 1,
      postCount: 1,
    },
  },
]);
```

## Indexes

### Create Indexes
```ts
// Single field
UserSchema.index({ email: 1 }); // Ascending

// Compound index
UserSchema.index({ lastName: 1, firstName: 1 });

// Unique index
UserSchema.index({ email: 1 }, { unique: true });

// Text index for search
UserSchema.index({ name: 'text', bio: 'text' });

// TTL index (auto-delete after time)
UserSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 * 24 * 30 } // 30 days
);
```

### Best Practices
- Index fields used in queries
- Index fields used for sorting
- Compound indexes for multi-field queries
- Don't over-index (slows writes)
- Monitor index usage

```ts
// Check index usage
const stats = await User.collection.stats();
```

## Transactions

```ts
import mongoose from 'mongoose';

// For operations that must succeed or fail together
const session = await mongoose.startSession();
session.startTransaction();

try {
  const user = await User.create([{ name: 'John', email: 'john@example.com' }], { session });
  await Post.create([{ title: 'First Post', author: user[0]._id }], { session });

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

## Validation

### Schema-Level Validation
```ts
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: (v: number) => v >= 0,
      message: 'Price must be positive',
    },
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'food'],
    required: true,
  },
});
```

### Custom Validators
```ts
const UserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: async function(email: string) {
        const user = await User.findOne({ email });
        return !user || user._id.equals(this._id);
      },
      message: 'Email already exists',
    },
  },
});
```

## Middleware (Hooks)

```ts
// Before save
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// After save
UserSchema.post('save', function(doc) {
  console.log('User saved:', doc._id);
});

// Before delete
UserSchema.pre('deleteOne', async function(next) {
  const userId = this.getQuery()['_id'];
  await Post.deleteMany({ author: userId });
  next();
});
```

## Performance Best Practices

1. **Use Lean Queries** (for read-only)
```ts
const users = await User.find().lean(); // Returns plain JS objects
```

2. **Select Only Needed Fields**
```ts
const users = await User.find({}, 'name email'); // Projection
```

3. **Use Indexes**
```ts
await User.find({ email: 'x@example.com' }); // Fast with index
```

4. **Limit Results**
```ts
const users = await User.find().limit(100);
```

5. **Use Aggregation for Complex Queries**
```ts
// More efficient than multiple queries
await User.aggregate([...]);
```

6. **Batch Operations**
```ts
await User.bulkWrite([
  { insertOne: { document: { name: 'User 1' } } },
  { updateOne: { filter: { _id: id }, update: { $set: { name: 'Updated' } } } },
]);
```

## Error Handling

```ts
try {
  await user.save();
} catch (error) {
  if (error.code === 11000) {
    // Duplicate key error
    console.error('Email already exists');
  } else if (error.name === 'ValidationError') {
    // Validation error
    console.error('Validation failed:', error.message);
  } else {
    console.error('Database error:', error);
  }
}
```

## Testing

```ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

test('create user', async () => {
  const user = await User.create({
    email: 'test@example.com',
    name: 'Test User',
  });
  expect(user.email).toBe('test@example.com');
});
```

## Connection Management

```ts
// Connect
await mongoose.connect(process.env.MONGODB_URI!);

// Check connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Disconnect
await mongoose.disconnect();
```
