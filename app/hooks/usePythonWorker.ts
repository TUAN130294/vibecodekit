import type { WorkerEnvelope, WorkerJobRequest, WorkerJobResult } from '@/types/worker-events';
import { useCallback, useMemo, useState } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function usePythonWorker() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WorkerJobResult | null>(null);

  const trigger = useCallback(async (request: WorkerJobRequest) => {
    setStatus('loading');
    setError(null);

    const response = await fetch('/api/worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    const payload = (await response.json()) as WorkerEnvelope;

    if (!payload.success || !payload.data) {
      const message =
        payload.error?.message || 'Worker request failed. See server logs for details.';
      setStatus('error');
      setError(message);
      throw new Error(message);
    }

    setResult(payload.data);
    setStatus('success');
    return payload.data;
  }, []);

  return useMemo(
    () => ({
      status,
      error,
      result,
      trigger
    }),
    [error, result, status, trigger]
  );
}

