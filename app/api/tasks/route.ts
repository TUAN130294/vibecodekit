/**
 * Tasks API Route
 *
 * Equivalent to Express: src/routes/tasks.ts (GET/POST /api/tasks)
 * Migration from: src/controllers/taskController.ts + src/services/taskService.ts
 *
 * 🔒 PRODUCTION TIP: Use Prisma or another ORM for database operations
 * npm install @prisma/client
 * npx prisma init
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// Types & Interfaces
// ============================================================

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: 'low' | 'medium' | 'high';
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignedToId?: string;
}

interface TasksResponse {
  success: boolean;
  data?: {
    tasks: Task[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
  code?: string;
}

// ============================================================
// In-Memory Storage (Replace with Database in Production)
// ============================================================

// 🔒 PRODUCTION: Replace this with Prisma/TypeORM/Supabase
let tasksStore: Task[] = [
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

// ============================================================
// GET /api/tasks - Get all tasks with pagination
// ============================================================

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status') as TaskStatus | null;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid pagination parameters',
          code: 'INVALID_PARAMS'
        },
        { status: 400 }
      );
    }

    // Filter by status if provided
    let filteredTasks = tasksStore;
    if (status && Object.values(TaskStatus).includes(status)) {
      filteredTasks = tasksStore.filter(task => task.status === status);
    }

    // Sort by creation date (newest first)
    const sortedTasks = [...filteredTasks].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = sortedTasks.slice(startIndex, endIndex);

    // 🔒 PRODUCTION Example with Prisma:
    // const tasks = await prisma.task.findMany({
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   where: status ? { status } : undefined,
    //   orderBy: { createdAt: 'desc' },
    //   include: { assignedTo: true }
    // });
    // const total = await prisma.task.count({ where: status ? { status } : undefined });

    return NextResponse.json<TasksResponse>(
      {
        success: true,
        data: {
          tasks: paginatedTasks,
          total: filteredTasks.length,
          page,
          limit
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('GET /api/tasks error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tasks',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/tasks - Create a new task
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CreateTaskRequest = await request.json();
    const { title, description, priority, assignedToId } = body;

    // Validate required fields
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title is required',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title must be less than 200 characters',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // Validate priority if provided
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid priority value',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    // 🔒 PRODUCTION: Validate assignedToId against database
    // if (assignedToId) {
    //   const user = await prisma.user.findUnique({ where: { id: assignedToId } });
    //   if (!user) {
    //     return NextResponse.json(
    //       { success: false, error: 'Assigned user not found', code: 'USER_NOT_FOUND' },
    //       { status: 404 }
    //     );
    //   }
    // }

    // Create new task
    const newTask: Task = {
      id: (tasksStore.length + 1).toString(),
      title: title.trim(),
      description: description?.trim(),
      status: TaskStatus.OPEN,
      priority: priority || 'medium',
      assignedToId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasksStore.push(newTask);

    // 🔒 PRODUCTION Example with Prisma:
    // const task = await prisma.task.create({
    //   data: {
    //     title: title.trim(),
    //     description: description?.trim(),
    //     status: TaskStatus.OPEN,
    //     priority: priority || 'medium',
    //     assignedToId
    //   },
    //   include: { assignedTo: true }
    // });

    return NextResponse.json(
      {
        success: true,
        data: newTask
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST /api/tasks error:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create task',
        code: 'CREATE_ERROR'
      },
      { status: 500 }
    );
  }
}
