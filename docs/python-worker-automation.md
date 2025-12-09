# Xử lý tác vụ nặng với Python Worker

## Vấn đề
Next.js không phù hợp cho tác vụ AI nặng hoặc xử lý dữ liệu lâu (timeout, nghẽn UI).

## Giải pháp VibeCodeKit
- Bridge REST: `app/api/worker/route.ts` proxy tới Python worker (`PY_WORKER_URL`).
- Hook frontend: `usePythonWorker` giúp gửi job bằng 1-2 dòng code.
- Python stub: `services/python-worker/api_stub.py` nhận job, trả kết quả dạng envelope.

## Cách dùng (TypeScript)
```ts
import { usePythonWorker } from '@/app/hooks/usePythonWorker';

const { trigger, status, result, error } = usePythonWorker();
await trigger({
  job: {
    type: 'analyzeData',
    payload: { sourceUrl: 'https://example.com/data.csv' }
  }
});
```

## Envelope chuẩn
```json
{
  "success": true,
  "data": {
    "requestId": "...",
    "jobType": "analyzeData",
    "status": "completed",
    "output": { "...": "..." }
  }
}
```

## Lợi ích
- Tách frontend khỏi workload nặng, tránh đơ UI.
- Chuẩn hóa contract giữa Next.js và Python.
- Dễ mở rộng thêm job mới (thêm type trong `types/worker-events.ts`).

