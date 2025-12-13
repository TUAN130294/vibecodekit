import { Request, Response, NextFunction } from 'express';
import { getHealth } from '../services/healthService';

export const healthCheck = (_req: Request, res: Response, _next: NextFunction) => {
  const payload = getHealth();
  res.status(200).json({ success: true, data: payload });
};

