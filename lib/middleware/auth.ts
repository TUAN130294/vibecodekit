/**
 * Authentication Middleware for Next.js API Routes
 *
 * Usage:
 *   import { verifyToken, requireAuth } from '@/lib/middleware/auth';
 *
 *   export async function GET(request: NextRequest) {
 *     const user = await requireAuth(request); // Throws if unauthorized
 *     // ... rest of handler
 *   }
 */

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// ============================================================
// Types
// ============================================================

export interface JWTPayload {
  sub: string; // User ID or email
  role: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface AuthError {
  success: false;
  error: string;
  code: string;
}

// ============================================================
// Token Verification
// ============================================================

/**
 * Verify JWT token from Authorization header
 * @throws Error if token is invalid or missing
 */
export function verifyToken(request: NextRequest): JWTPayload {
  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    throw new Error('Missing authorization header');
  }

  // Extract token (format: "Bearer <token>")
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    throw new Error('Missing token');
  }

  // Get JWT secret from environment
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET not configured');
  }

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: 'vibecode-kit',
      audience: 'vibecode-api'
    }) as JWTPayload;

    return decoded;

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
}

/**
 * Verify token and return user, or throw error
 * Use this in route handlers that require authentication
 */
export async function requireAuth(request: NextRequest): Promise<JWTPayload> {
  try {
    return verifyToken(request);
  } catch (error) {
    throw error; // Re-throw to be caught by route handler
  }
}

/**
 * Optional authentication - returns user or null
 * Use this in route handlers where auth is optional
 */
export function optionalAuth(request: NextRequest): JWTPayload | null {
  try {
    return verifyToken(request);
  } catch {
    return null;
  }
}

// ============================================================
// Role-based Authorization
// ============================================================

/**
 * Check if user has required role
 */
export function requireRole(user: JWTPayload, allowedRoles: string[]): boolean {
  return allowedRoles.includes(user.role);
}

/**
 * Verify token and check role
 * @throws Error if unauthorized or insufficient permissions
 */
export async function requireRoleAuth(
  request: NextRequest,
  allowedRoles: string[]
): Promise<JWTPayload> {
  const user = await requireAuth(request);

  if (!requireRole(user, allowedRoles)) {
    throw new Error('Insufficient permissions');
  }

  return user;
}

// ============================================================
// Error Response Helpers
// ============================================================

/**
 * Create a 401 Unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized'): NextResponse<AuthError> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'UNAUTHORIZED'
    },
    { status: 401 }
  );
}

/**
 * Create a 403 Forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden'): NextResponse<AuthError> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'FORBIDDEN'
    },
    { status: 403 }
  );
}

// ============================================================
// Wrapper Functions for Cleaner Route Handlers
// ============================================================

/**
 * Wrap a route handler with authentication
 *
 * Usage:
 *   export const GET = withAuth(async (request, user) => {
 *     // user is guaranteed to be authenticated
 *     return NextResponse.json({ data: user });
 *   });
 */
export function withAuth(
  handler: (request: NextRequest, user: JWTPayload, params?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: { params: any }) => {
    try {
      const user = await requireAuth(request);
      return handler(request, user, context?.params);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      return unauthorizedResponse(message);
    }
  };
}

/**
 * Wrap a route handler with role-based authentication
 *
 * Usage:
 *   export const GET = withRoleAuth(['admin', 'moderator'], async (request, user) => {
 *     // user is guaranteed to have admin or moderator role
 *     return NextResponse.json({ data: user });
 *   });
 */
export function withRoleAuth(
  allowedRoles: string[],
  handler: (request: NextRequest, user: JWTPayload, params?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: { params: any }) => {
    try {
      const user = await requireRoleAuth(request, allowedRoles);
      return handler(request, user, context?.params);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Insufficient permissions') {
          return forbiddenResponse('You do not have permission to access this resource');
        }
        return unauthorizedResponse(error.message);
      }
      return unauthorizedResponse('Authentication failed');
    }
  };
}
