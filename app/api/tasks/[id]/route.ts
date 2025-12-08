/**
 * Individual Task API Route
 *
 * Handles operations on specific tasks by ID:
 * - GET /api/tasks/[id] - Get single task
 * - PUT /api/tasks/[id] - Update task
 * - DELETE /api/tasks/[id] - Delete task
 * - PATCH /api/tasks/[id] - Partial update (e.g., status change)
 *
 * Migration from Express: src/services/taskService.ts (updateStatus method)
 */

import { NextRequest, NextResponse } from 'next/server';

// Import types from parent route (in production, move to shared types file)
enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: 'low' | 'medium' | 'high';
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
}

// 🔒 PRODUCTION: Replace with database
// This is a workaround for demo - in production, use database
declare global {
  var tasksStore: Task[] | undefined;
}

if (!global.tasksStore) {
  global.tasksStore = [
    {
      id: '1',
      title: 'Setup development environment',
      description: 'Install Node.js, Docker, and configure IDE',
      status: TaskStatus.COMPLETED,
      priority: 'high',
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString()
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add JWT-based authentication system',
      status: TaskStatus.IN_PROGRESS,
      priority: 'high',
      createdAt: new Date('2024-01-02').toISOString(),
      updatedAt: new Date('2024-01-02').toISOString()
    }
  ];
}

// ============================================================
// GET /api/tasks/[id] - Get single task
// ============================================================

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find task by ID
    const task = global.tasksStore?.find(t => t.id === id);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // 🔒 PRODUCTION Example with Prisma:
    // const task = await prisma.task.findUnique({
    //   where: { id },
    //   include: { assignedTo: true }
    // });

    return NextResponse.json(
      {
        success: true,
        data: task
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(`GET /api/tasks/[id] error:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch task',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}

// ============================================================
// PUT /api/tasks/[id] - Full update
// ============================================================

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Find task
    const taskIndex = global.tasksStore?.findIndex(t => t.id === id);

    if (taskIndex === undefined || taskIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title is required',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // Validate status
    if (body.status && !Object.values(TaskStatus).includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status value',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // Update task (full replacement)
    const updatedTask: Task = {
      ...global.tasksStore![taskIndex],
      title: body.title.trim(),
      description: body.description?.trim(),
      status: body.status || global.tasksStore![taskIndex].status,
      priority: body.priority || global.tasksStore![taskIndex].priority,
      assignedToId: body.assignedToId,
      updatedAt: new Date().toISOString()
    };

    global.tasksStore![taskIndex] = updatedTask;

    // 🔒 PRODUCTION Example with Prisma:
    // const task = await prisma.task.update({
    //   where: { id },
    //   data: {
    //     title: body.title.trim(),
    //     description: body.description?.trim(),
    //     status: body.status,
    //     priority: body.priority,
    //     assignedToId: body.assignedToId
    //   }
    // });

    return NextResponse.json(
      {
        success: true,
        data: updatedTask
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(`PUT /api/tasks/[id] error:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update task',
        code: 'UPDATE_ERROR'
      },
      { status: 500 }
    );
  }
}

// ============================================================
// PATCH /api/tasks/[id] - Partial update (e.g., status only)
// ============================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Find task
    const taskIndex = global.tasksStore?.findIndex(t => t.id === id);

    if (taskIndex === undefined || taskIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (body.status && !Object.values(TaskStatus).includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status value',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // Partial update - only update provided fields
    const currentTask = global.tasksStore![taskIndex];
    const updatedTask: Task = {
      ...currentTask,
      ...(body.title && { title: body.title.trim() }),
      ...(body.description !== undefined && { description: body.description?.trim() }),
      ...(body.status && { status: body.status }),
      ...(body.priority && { priority: body.priority }),
      ...(body.assignedToId !== undefined && { assignedToId: body.assignedToId }),
      updatedAt: new Date().toISOString()
    };

    global.tasksStore![taskIndex] = updatedTask;

    // 🔒 PRODUCTION Example with Prisma:
    // const task = await prisma.task.update({
    //   where: { id },
    //   data: {
    //     ...(body.title && { title: body.title.trim() }),
    //     ...(body.status && { status: body.status }),
    //     ...(body.priority && { priority: body.priority })
    //   }
    // });

    return NextResponse.json(
      {
        success: true,
        data: updatedTask
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(`PATCH /api/tasks/[id] error:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update task',
        code: 'UPDATE_ERROR'
      },
      { status: 500 }
    );
  }
}

// ============================================================
// DELETE /api/tasks/[id] - Delete task
// ============================================================

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find task
    const taskIndex = global.tasksStore?.findIndex(t => t.id === id);

    if (taskIndex === undefined || taskIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Get task before deletion for response
    const deletedTask = global.tasksStore![taskIndex];

    // Remove task
    global.tasksStore!.splice(taskIndex, 1);

    // 🔒 PRODUCTION Example with Prisma:
    // await prisma.task.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Task deleted successfully',
          deletedTask
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(`DELETE /api/tasks/[id] error:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete task',
        code: 'DELETE_ERROR'
      },
      { status: 500 }
    );
  }
}
