# REST API Endpoint Template

## Usage

Generate a complete CRUD REST API endpoint with validation and error handling.

```bash
# Using Vibecoder
/generate api-endpoint users

# Or copy template manually
```

## What Gets Generated

```
app/api/users/
├── route.ts              # GET, POST, PUT, DELETE handlers
└── [id]/
    └── route.ts          # GET, PUT, DELETE by ID
```

## Template Variables

- `{{resource}}` - Resource name in lowercase plural (e.g., "users")
- `{{ResourceName}}` - Resource name in PascalCase singular (e.g., "User")

## API Endpoints

### GET /api/{{resource}}
Retrieve all items with pagination

**Query Params**:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### POST /api/{{resource}}
Create new item

**Body**:
```json
{
  "name": "Item name",
  ...
}
```

**Response**:
```json
{
  "success": true,
  "data": { "id": "1", "name": "Item name", ... }
}
```

### PUT /api/{{resource}}
Update existing item

**Body**:
```json
{
  "id": "1",
  "name": "Updated name",
  ...
}
```

### DELETE /api/{{resource}}?id=1
Delete item

**Response**:
```json
{
  "success": true,
  "data": { "id": "1" }
}
```

## Error Handling

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": "Error message",
  "details": [...] // For validation errors
}
```

### Status Codes
- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Validation

Uses Zod for schema validation:

```ts
const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});
```

## Testing

```ts
import request from 'supertest';

describe('GET /api/users', () => {
  it('returns users list', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
```

## Authentication

Add auth middleware:

```ts
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = await auth(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  // ...
}
```
