"""
Example FastAPI bridge for Vibe Coder Kit Python worker (REST).
Exposes /api/job to receive jobs forwarded from Next.js API route.
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any


class WorkerJob(BaseModel):
    type: str
    payload: Dict[str, Any]


class WorkerJobRequest(BaseModel):
    requestId: str
    job: WorkerJob


app = FastAPI()


@app.post("/api/job")
async def handle_job(request: WorkerJobRequest):
    job_type = request.job.type

    if job_type == "analyzeData":
        # TODO: implement analysis logic here
        output = {"summary": "analysis stub", "source": request.job.payload}
    elif job_type == "generateImage":
        prompt = request.job.payload.get("prompt")
        if not prompt:
            raise HTTPException(status_code=400, detail="prompt is required")
        # TODO: replace with real model call
        output = {"imageUrl": "https://example.com/generated.png", "prompt": prompt}
    else:
        raise HTTPException(status_code=400, detail="unsupported job type")

    return {
        "success": True,
        "data": {
          "requestId": request.requestId,
          "jobType": job_type,
          "status": "completed",
          "output": output,
          "meta": {"handler": "python-worker/api_stub.py"}
        }
    }

