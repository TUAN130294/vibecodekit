# Python (Automation & ML) Rules

## Style & Environment
- PEP 8; format with Black; type hints required (`mypy` optional).
- Virtual env: `python -m venv venv` then `source venv/bin/activate` or `venv\\Scripts\\activate`.
- Lint with `pylint`; keep max line length 100.

## Logging
- Use stdlib `logging`; set module-level logger; JSON handlers when possible.
- Include correlation/request ids if invoked from API; avoid logging secrets/PII.

## Error Handling
- Raise custom exceptions for domain errors; log with context.
- Wrap external IO with retries/backoff; fail fast on validation errors.

## Data Processing
- Use pandas/numpy for transforms; validate schemas with `pydantic` or `pandera`.
- Prefer vectorized operations; avoid loops over rows; chunk large datasets.
- Handle time zones explicitly (UTC internally).

## ML/Computer Vision
- Organize: `data/`, `models/`, `notebooks/`, `src/ml/`.
- Track experiments (e.g., MLflow); persist model metadata and versions.
- For YOLO/OpenCV pipelines, document model version, confidence thresholds, and IO formats.

## Structure Example
```
src/
  automation/
    sheets_sync.py
    workflow_runner.py
  ml/
    train.py
    inference.py
  utils/
    logger.py
```

## Testing
- pytest; fixtures for IO; use `pytest-cov`.
- Mock network/FS; keep deterministic seeds for ML tests.

## Performance
- Profile hotspots; cache expensive computations; stream large files.
- Use multiprocessing or asyncio for parallel IO-bound tasks; avoid GIL-heavy CPU loops.

## Interop with Node
- Expose via FastAPI endpoints or subprocess CLI.
- Standardize payloads and error envelope with Node services.

