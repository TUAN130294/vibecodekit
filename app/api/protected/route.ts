/**
 * Protected API Route Example
 *
 * Demonstrates how to use authentication middleware
 *
 * Test with:
 * 1. Get token: curl -X POST http://localhost:3000/api/auth/login \
 *    -H "Content-Type: application/json" \
 *    -d '{"email":"user@example.com","password":"password123"}'
 *
 * 2. Access protected route:
 *    curl http://localhost:3000/api/protected \
 *    -H "Authorization: Bearer <token>"
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth, withRoleAuth } from '@/lib/middleware/auth';

// ============================================================
// Example 1: Simple Protected Route
// ============================================================

/**
 * GET /api/protected
 * Requires valid JWT token
 */
export const GET = withAuth(async (request, user) => {
  return NextResponse.json(
    {
      success: true,
      data: {
        message: 'You are authenticated!',
        user: {
          id: user.sub,
          role: user.role
        },
        serverTime: new Date().toISOString()
      }
    },
    { status: 200 }
  );
});

// ============================================================
// Example 2: Role-based Protected Route
// ============================================================

/**
 * DELETE /api/protected
 * Requires valid JWT token + admin role
 */
export const DELETE = withRoleAuth(['admin'], async (request, user) => {
  return NextResponse.json(
    {
      success: true,
      data: {
        message: 'Admin action performed successfully!',
        user: {
          id: user.sub,
          role: user.role
        }
      }
    },
    { status: 200 }
  );
});

// ============================================================
// Example 3: Manual Authentication (more control)
// ============================================================

/**
 * POST /api/protected
 * Manual authentication with custom error handling
 */
export async function POST(request: NextRequest) {
  try {
    // Import inside handler for conditional usage
    const { requireAuth } = await import('@/lib/middleware/auth');

    // Verify authentication
    const user = await requireAuth(request);

    // Your business logic here
    const body = await request.json();

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Data processed successfully',
          processedBy: user.sub,
          receivedData: body
        }
      },
      { status: 200 }
    );

  } catch (error) {
    // Custom error handling
    const message = error instanceof Error ? error.message : 'Authentication failed';

    if (message.includes('expired')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Your session has expired. Please login again.',
          code: 'TOKEN_EXPIRED'
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        code: 'UNAUTHORIZED'
      },
      { status: 401 }
    );
  }
}
