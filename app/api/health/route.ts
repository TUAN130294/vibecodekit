/**
 * Health Check API Route
 *
 * Equivalent to Express: src/routes/index.ts (GET /api/health)
 * Migration from: src/controllers/healthController.ts
 */

import { NextRequest, NextResponse } from 'next/server';

// Simple health check service (replaces src/services/healthService.ts)
function getHealth() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  };
}

export async function GET(_request: NextRequest) {
  try {
    const payload = getHealth();

    return NextResponse.json(
      {
        success: true,
        data: payload
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
