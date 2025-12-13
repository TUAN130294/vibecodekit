import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { APIError } from '../../../middleware/errorHandler';

const router = Router();

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new APIError(400, 'INVALID_INPUT', 'Email and password required'));
  }
  // Stub: in real app, validate credentials and user role
  const token = jwt.sign({ sub: email, role: 'user' }, env.jwtSecret, { expiresIn: '1h' });
  return res.status(200).json({ success: true, data: { token } });
});

export default router;

