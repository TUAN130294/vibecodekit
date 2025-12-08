import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import authRouter from './auth';
import reportRouter from './reports';
import taskRouter from './tasks';

const router = Router();

router.get('/health', healthCheck);
router.use('/auth', authRouter);
router.use('/reports', reportRouter);
router.use('/tasks', taskRouter);

export default router;

