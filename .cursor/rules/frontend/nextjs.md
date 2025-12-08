# Next.js Development Rules

## Version
- Target Next.js 14+ (App Router by default)
- Use App Router unless Pages Router is explicitly required

## Project Structure (App Router)
```
app/
├── (auth)/              # Route group (doesn't affect URL)
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
├── api/                 # API routes
│   └── users/
│       └── route.ts
├── dashboard/
│   ├── page.tsx         # /dashboard
│   ├── loading.tsx      # Loading UI
│   ├── error.tsx        # Error UI
│   └── layout.tsx       # Layout for dashboard
├── layout.tsx           # Root layout
├── page.tsx             # Homepage (/)
└── not-found.tsx        # 404 page

components/              # Shared components
lib/                     # Utility functions, config
public/                  # Static assets
```

## Server Components vs Client Components

### Server Components (Default)
- Default in App Router
- Can directly access backend resources (DB, files)
- Cannot use hooks, event handlers, browser APIs
- Reduces bundle size
```tsx
// app/users/page.tsx (Server Component by default)
import { db } from '@/lib/db';

export default async function UsersPage() {
  const users = await db.user.findMany(); // Direct DB access

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Client Components
- Add "use client" directive
- Use for interactivity, hooks, browser APIs
- Keep client components small and at leaf level
```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Data Fetching

### Server Components (Recommended)
```tsx
// Fetch in Server Component
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // SSG
    // cache: 'no-store',  // SSR
    // next: { revalidate: 60 }, // ISR (60 seconds)
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### Client Components
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export function ClientData() {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
  return <div>{data?.title}</div>;
}
```

## Caching & Revalidation

### Static Generation (Default)
```tsx
// Automatically cached at build time
export default async function Page() {
  const data = await fetch(url, { cache: 'force-cache' });
  return <div>{data}</div>;
}
```

### Incremental Static Regeneration (ISR)
```tsx
// Revalidate every 60 seconds
export default async function Page() {
  const data = await fetch(url, { next: { revalidate: 60 } });
  return <div>{data}</div>;
}
```

### Dynamic Rendering
```tsx
// Opt into dynamic rendering
export const dynamic = 'force-dynamic';
// or
const data = await fetch(url, { cache: 'no-store' });
```

### On-Demand Revalidation
```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { path, tag } = await request.json();

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return Response.json({ revalidated: true });
}
```

## Metadata & SEO
```tsx
import type { Metadata } from 'next';

// Static metadata
export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'OG description',
    images: ['/og-image.jpg'],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default function Page() {
  return <div>Content</div>;
}
```

## API Routes
```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  const users = await db.user.findMany({
    where: { name: { contains: query } },
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}

// Dynamic routes: app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}
```

## Middleware
```tsx
// middleware.ts (at root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

## Loading & Error States
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <Spinner />;
}

// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Streaming & Suspense
```tsx
import { Suspense } from 'react';

async function SlowComponent() {
  const data = await fetchSlowData();
  return <div>{data}</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Fast content</h1>
      <Suspense fallback={<Spinner />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

## Image Optimization
```tsx
import Image from 'next/image';

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority // Load immediately (above fold)
      placeholder="blur" // Show blur while loading
      blurDataURL="data:..." // Blur data URL
    />
  );
}
```

## Font Optimization
```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="https://api.example.com"  # Exposed to browser
```

```tsx
// Server-side only
const dbUrl = process.env.DATABASE_URL;

// Browser & Server
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Route Handlers (Advanced)
```tsx
// Streaming response
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        controller.enqueue(`data: ${i}\n\n`);
        await sleep(1000);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
```

## Server Actions (Experimental)
```tsx
// app/actions.ts
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const user = await db.user.create({ data: { name } });
  revalidatePath('/users');
  return user;
}

// app/form.tsx
'use client';

import { createUser } from './actions';

export function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Performance Best Practices
- Use Server Components by default
- Add "use client" only when needed
- Lazy load heavy client components
- Use `next/image` for all images
- Implement proper caching strategies
- Use ISR for data that changes occasionally
- Stream slow data with Suspense

## TypeScript Config
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Deployment
- Vercel (recommended, zero-config)
- Docker (self-hosted)
- AWS/GCP with Node.js runtime
- Use `next build` for production builds
- Set NODE_ENV=production
- Configure proper caching headers
