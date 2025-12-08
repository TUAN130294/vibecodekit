import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { APIError } from './errorHandler';

export type AuthUser = { sub: string; role?: string };

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new APIError(401, 'UNAUTHORIZED', 'Missing token'));
  }

  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as AuthUser;
    (req as Request & { user?: AuthUser }).user = decoded;
    return next();
  } catch (err) {
    return next(new APIError(401, 'INVALID_TOKEN', 'Invalid token'));
  }
};

