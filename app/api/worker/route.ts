import type { WorkerEnvelope, WorkerJob, WorkerJobRequest } from '@/types/worker-events';
import { NextResponse } from 'next/server';

const workerBaseUrl = process.env.PY_WORKER_URL || 'http://localhost:5001';

function isValidJob(job: WorkerJob | undefined): job is WorkerJob {
  if (!job || !job.type) return false;
  if (job.type === 'analyzeData') return true;
  if (job.type === 'generateImage') return Boolean((job as any).payload?.prompt);
  return false;
}

async function forwardToWorker(request: WorkerJobRequest): Promise<WorkerEnvelope> {
  const requestId = request.requestId || crypto.randomUUID();
  const response = await fetch(`${workerBaseUrl}/api/job`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...request, requestId })
  });

  if (!response.ok) {
    return {
      success: false,
      error: {
        code: 'worker_unavailable',
        message: `Worker responded with ${response.status}`
      }
    };
  }

  return (await response.json()) as WorkerEnvelope;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WorkerJobRequest;
    if (!isValidJob(body?.job)) {
      return NextResponse.json<WorkerEnvelope>(
        {
          success: false,
          error: { code: 'invalid_job', message: 'Job payload invalid or missing.' }
        },
        { status: 400 }
      );
    }

    const forwarded = await forwardToWorker(body);
    const status = forwarded.success ? 200 : 502;
    return NextResponse.json<WorkerEnvelope>(forwarded, { status });
  } catch (err) {
    return NextResponse.json<WorkerEnvelope>(
      {
        success: false,
        error: {
          code: 'worker_route_error',
          message: 'Unhandled error while proxying to Python worker.'
        }
      },
      { status: 500 }
    );
  }
}

