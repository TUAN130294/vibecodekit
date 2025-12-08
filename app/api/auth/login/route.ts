/**
 * Login API Route
 *
 * Equivalent to Express: src/routes/auth.ts (POST /api/auth/login)
 * Migration from: src/routes/auth.ts
 *
 * 🔒 PRODUCTION TIP: Install and use Zod for validation:
 * npm install zod
 * import { z } from 'zod';
 */

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Request body type
interface LoginRequest {
  email: string;
  password: string;
}

// Response type
interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
  };
  error?: string;
  code?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: 'Email and password required',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    // 🔒 STUB: In production, validate credentials against database
    // Example with Prisma:
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    //   return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    // }

    // Get JWT secret from environment
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: email,
        role: 'user',
        // Add more claims as needed: userId, permissions, etc.
      },
      jwtSecret,
      {
        expiresIn: '1h',
        issuer: 'vibecode-kit',
        audience: 'vibecode-api'
      }
    );

    return NextResponse.json<LoginResponse>(
      {
        success: true,
        data: { token }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json<LoginResponse>(
      {
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Optional: GET method for checking auth status
export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No token provided',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, jwtSecret);

    return NextResponse.json(
      {
        success: true,
        data: { user: decoded }
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      },
      { status: 401 }
    );
  }
}
