export type WorkerJobType = 'analyzeData' | 'generateImage';

export interface AnalyzeDataJob {
  type: 'analyzeData';
  payload: {
    sourceUrl?: string;
    dataset?: Record<string, unknown>;
    params?: Record<string, string | number | boolean>;
  };
}

export interface GenerateImageJob {
  type: 'generateImage';
  payload: {
    prompt: string;
    size?: '512x512' | '768x768' | '1024x1024';
    steps?: number;
    model?: string;
  };
}

export type WorkerJob = AnalyzeDataJob | GenerateImageJob;

export interface WorkerJobRequest {
  job: WorkerJob;
  requestId?: string;
}

export interface WorkerJobResult {
  requestId: string;
  jobType: WorkerJobType;
  status: 'queued' | 'processing' | 'completed';
  output: Record<string, unknown>;
  meta?: Record<string, unknown>;
}

export interface WorkerJobError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface WorkerEnvelope {
  success: boolean;
  data?: WorkerJobResult;
  error?: WorkerJobError;
}

