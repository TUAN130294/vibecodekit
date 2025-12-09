import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Request validation schema
const {{ResourceName}}Schema = z.object({
  // Define your schema here
  name: z.string().min(1),
});

/**
 * GET /api/{{resource}}
 * Retrieve all {{resource}} items
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');

    // TODO: Fetch data from database
    const data = [];
    const total = 0;

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/{{resource}} error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/{{resource}}
 * Create a new {{resource}} item
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = {{ResourceName}}Schema.parse(body);

    // TODO: Create item in database
    const created = { id: '1', ...validatedData };

    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('POST /api/{{resource}} error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/{{resource}}
 * Update an existing {{resource}} item
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    // Validate update data
    const validatedData = {{ResourceName}}Schema.partial().parse(updateData);

    // TODO: Update item in database
    const updated = { id, ...validatedData };

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('PUT /api/{{resource}} error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/{{resource}}
 * Delete a {{resource}} item
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    // TODO: Delete item from database

    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    console.error('DELETE /api/{{resource}} error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
