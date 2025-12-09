# Full-Stack CRUD Feature Template

## Overview

Complete CRUD (Create, Read, Update, Delete) feature including:
- Database schema & migrations
- Backend API endpoints
- Frontend UI components
- Form validation
- Tests
- Documentation

## Generate Feature

```bash
# Using Vibecoder
/generate crud products

# This creates a complete feature for managing products
```

## What Gets Generated

```
# Backend
src/entities/Product.ts           # TypeORM entity
src/migrations/create-products.ts # Database migration
src/services/productService.ts    # Business logic
src/controllers/productController.ts # Route handlers

# Frontend
app/products/
├── page.tsx                      # Product list page
├── [id]/
│   ├── page.tsx                  # Product detail page
│   └── edit/
│       └── page.tsx              # Product edit page
├── new/
│   └── page.tsx                  # Product create page
└── components/
    ├── ProductList.tsx           # List component
    ├── ProductCard.tsx           # Card component
    ├── ProductForm.tsx           # Form component
    └── ProductForm.test.tsx      # Tests

# API Routes
app/api/products/
├── route.ts                      # GET (list), POST (create)
└── [id]/
    └── route.ts                  # GET, PUT, DELETE (by ID)

# Tests
tests/
├── products.service.test.ts      # Service tests
├── products.controller.test.ts   # Controller tests
└── e2e/
    └── products.spec.ts          # E2E tests
```

## Template Variables

- `{{EntityName}}` - Singular PascalCase (e.g., "Product")
- `{{entityName}}` - Singular camelCase (e.g., "product")
- `{{EntityNamePlural}}` - Plural PascalCase (e.g., "Products")
- `{{entityNamePlural}}` - Plural camelCase (e.g., "products")

## Example: Product CRUD

### 1. Entity (Database Model)

```ts
// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### 2. Service (Business Logic)

```ts
// src/services/productService.ts
import { AppDataSource } from '@/config/dataSource';
import { Product } from '@/entities/Product';

export class ProductService {
  private repo = AppDataSource.getRepository(Product);

  async findAll() {
    return this.repo.find();
  }

  async findById(id: string) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');
    return product;
  }

  async create(data: Partial<Product>) {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: string, data: Partial<Product>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new Error('Product not found');
    return true;
  }
}

export const productService = new ProductService();
```

### 3. API Routes

```ts
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/productService';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().min(0),
  imageUrl: z.string().url().optional(),
});

export async function GET() {
  const products = await productService.findAll();
  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = ProductSchema.parse(body);
  const product = await productService.create(data);
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
```

### 4. Frontend List Page

```tsx
// app/products/page.tsx
import { ProductList } from './components/ProductList';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });
  const json = await res.json();
  return json.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <a href="/products/new" className="btn-primary">
          Add Product
        </a>
      </div>

      <ProductList products={products} />
    </div>
  );
}
```

### 5. Frontend Form

```tsx
// app/products/components/ProductForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

export function ProductForm({ product, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input {...register('name')} className="input" />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="input"
        />
        {errors.price && <span className="error">{errors.price.message}</span>}
      </div>

      {/* More fields... */}

      <button type="submit" className="btn-primary">
        Save Product
      </button>
    </form>
  );
}
```

## Features Included

✅ Full CRUD operations
✅ Form validation (frontend & backend)
✅ Error handling
✅ Loading states
✅ Pagination (optional)
✅ Search/filter (optional)
✅ Optimistic updates
✅ Toast notifications
✅ Responsive design
✅ Accessibility
✅ Unit & integration tests
✅ E2E tests

## Customization

### Add Authentication

```ts
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const user = await auth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // ...
}
```

### Add File Upload

```ts
const FormSchema = schema.extend({
  image: z.instanceof(File).optional(),
});
```

### Add Real-time Updates

```ts
import { useSubscription } from '@/hooks/useSubscription';

function ProductList() {
  const { data } = useSubscription('/api/products/subscribe');
  // ...
}
```

## Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test products

# E2E tests
npm run test:e2e
```

## Migration

```bash
# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert
```
