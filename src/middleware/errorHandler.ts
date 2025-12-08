import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class APIError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

// Centralized error middleware
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof APIError ? err.statusCode : 500;
  const code = err instanceof APIError ? err.code : 'INTERNAL_ERROR';
  const message =
    err instanceof APIError ? err.message : 'Something went wrong. Please try again later.';

  logger.error(err.message, { code, statusCode, stack: err.stack });

  res.status(statusCode).json({
    success: false,
    code,
    message
  });
};

