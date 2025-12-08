# GraphQL Development Rules

## Setup

### Installation
```bash
# Apollo Server with Next.js
npm install @apollo/server @apollo/client graphql graphql-tag
npm install -D @graphql-codegen/cli @graphql-codegen/typescript
```

### Basic Server Setup (Next.js API Route)

```ts
// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
```

## Schema Definition

### Type Definitions

```ts
// app/api/graphql/schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    age: Int
    posts: [Post!]!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
    createdAt: String!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
    createdAt: String!
  }

  input CreateUserInput {
    email: String!
    name: String!
    age: Int
  }

  input UpdateUserInput {
    email: String
    name: String
    age: Int
  }

  type Query {
    user(id: ID!): User
    users(limit: Int, offset: Int): [User!]!
    post(id: ID!): Post
    posts(published: Boolean): [Post!]!
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    createPost(title: String!, content: String!): Post!
    publishPost(id: ID!): Post!
  }

  type Subscription {
    postAdded: Post!
    commentAdded(postId: ID!): Comment!
  }
`;
```

## Resolvers

### Query Resolvers

```ts
// app/api/graphql/resolvers/index.ts
import { prisma } from '@/lib/prisma';

export const resolvers = {
  Query: {
    // Get single user
    user: async (_parent, { id }, _context) => {
      return prisma.user.findUnique({ where: { id } });
    },

    // Get all users with pagination
    users: async (_parent, { limit = 10, offset = 0 }, _context) => {
      return prisma.user.findMany({
        take: limit,
        skip: offset,
      });
    },

    // Get single post
    post: async (_parent, { id }, _context) => {
      return prisma.post.findUnique({ where: { id } });
    },

    // Get filtered posts
    posts: async (_parent, { published }, _context) => {
      return prisma.post.findMany({
        where: published !== undefined ? { published } : undefined,
      });
    },

    // Get current user from context
    me: async (_parent, _args, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },
  },

  Mutation: {
    createUser: async (_parent, { input }, _context) => {
      return prisma.user.create({
        data: input,
      });
    },

    updateUser: async (_parent, { id, input }, _context) => {
      return prisma.user.update({
        where: { id },
        data: input,
      });
    },

    deleteUser: async (_parent, { id }, _context) => {
      await prisma.user.delete({ where: { id } });
      return true;
    },

    createPost: async (_parent, { title, content }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return prisma.post.create({
        data: {
          title,
          content,
          authorId: context.user.id,
        },
      });
    },

    publishPost: async (_parent, { id }, context) => {
      return prisma.post.update({
        where: { id },
        data: { published: true },
      });
    },
  },

  // Field resolvers
  User: {
    posts: async (parent, _args, _context) => {
      return prisma.post.findMany({
        where: { authorId: parent.id },
      });
    },
  },

  Post: {
    author: async (parent, _args, _context) => {
      return prisma.user.findUnique({
        where: { id: parent.authorId },
      });
    },

    comments: async (parent, _args, _context) => {
      return prisma.comment.findMany({
        where: { postId: parent.id },
      });
    },
  },
};
```

### Context (Authentication)

```ts
// app/api/graphql/context.ts
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export interface Context {
  user?: {
    id: string;
    email: string;
  };
}

export async function createContext(req: NextRequest): Promise<Context> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return {};
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET!) as any;
    return {
      user: {
        id: payload.userId,
        email: payload.email,
      },
    };
  } catch (error) {
    return {};
  }
}
```

## Client Setup

### Apollo Client Configuration

```ts
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

### Provider Setup

```tsx
// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
```

## Client Usage

### Query

```tsx
'use client';

import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      email
      name
      posts {
        id
        title
      }
    }
  }
`;

export function UserList() {
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { limit: 10, offset: 0 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### Mutation

```tsx
'use client';

import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
    }
  }
`;

export function CreateUserForm() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: ['GetUsers'], // Refetch users list after creating
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createUser({
      variables: {
        input: {
          email: formData.get('email'),
          name: formData.get('name'),
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="name" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
```

### Optimistic Updates

```tsx
const [updatePost] = useMutation(UPDATE_POST, {
  optimisticResponse: {
    updatePost: {
      id: postId,
      title: newTitle,
      __typename: 'Post',
    },
  },
  update: (cache, { data }) => {
    cache.modify({
      id: cache.identify({ __typename: 'Post', id: postId }),
      fields: {
        title: () => data.updatePost.title,
      },
    });
  },
});
```

## Advanced Patterns

### DataLoader (N+1 Problem Solution)

```ts
import DataLoader from 'dataloader';

const userLoader = new DataLoader(async (userIds: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: { id: { in: [...userIds] } },
  });

  const userMap = new Map(users.map((user) => [user.id, user]));
  return userIds.map((id) => userMap.get(id) ?? null);
});

// In resolver
Post: {
  author: (parent, _args, context) => {
    return context.loaders.user.load(parent.authorId);
  },
}
```

### Pagination

```ts
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type UserEdge {
  node: User!
  cursor: String!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

extend type Query {
  users(first: Int, after: String, last: Int, before: String): UserConnection!
}
```

### Error Handling

```ts
import { GraphQLError } from 'graphql';

// Custom error
throw new GraphQLError('User not found', {
  extensions: {
    code: 'USER_NOT_FOUND',
    http: { status: 404 },
  },
});

// Client-side handling
const { data, error } = useQuery(GET_USER);

if (error) {
  error.graphQLErrors.forEach(({ message, extensions }) => {
    console.error(`Error ${extensions.code}: ${message}`);
  });
}
```

### Subscriptions

```ts
// Server (requires WebSocket)
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/api/graphql',
});

useServer({ schema }, wsServer);

// Resolver
Subscription: {
  postAdded: {
    subscribe: () => pubsub.asyncIterator(['POST_ADDED']),
  },
}

// Publish event
pubsub.publish('POST_ADDED', { postAdded: newPost });

// Client
import { split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/api/graphql',
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Use subscription
const { data } = useSubscription(POST_ADDED_SUBSCRIPTION);
```

## Code Generation

### Setup
```bash
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

### Configuration

```yaml
# codegen.yml
schema: 'http://localhost:3000/api/graphql'
documents: 'app/**/*.graphql'
generates:
  ./generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withComponent: false
```

### Generate Types

```bash
npx graphql-codegen
```

### Usage with Generated Types

```tsx
import { useGetUsersQuery, useCreateUserMutation } from '@/generated/graphql';

export function UserList() {
  const { data, loading } = useGetUsersQuery({
    variables: { limit: 10 },
  });

  const [createUser] = useCreateUserMutation();

  // Fully typed!
  return <div>...</div>;
}
```

## Best Practices

1. **Keep resolvers thin** - Move business logic to services
2. **Use DataLoader** - Prevent N+1 queries
3. **Add pagination** - For lists that can grow
4. **Type everything** - Use TypeScript + codegen
5. **Handle errors properly** - Use custom error codes
6. **Add authentication** - Check permissions in resolvers
7. **Validate input** - Use input types and validation
8. **Cache strategically** - Configure Apollo cache
9. **Monitor performance** - Add tracing/logging
10. **Document schema** - Add descriptions to types/fields

## Testing

```ts
import { createTestClient } from 'apollo-server-testing';

const { query, mutate } = createTestClient(server);

test('get users', async () => {
  const res = await query({
    query: gql`
      query {
        users {
          id
          email
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.users).toHaveLength(2);
});
```
