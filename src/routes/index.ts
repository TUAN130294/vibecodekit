import { Router } from 'express';
import { healthCheck } from '../features/shared/controllers/healthController';
import authRouter from '../features/auth/routes/auth';
import reportRouter from '../features/reports/routes/reports';
import taskRouter from '../features/tasks/routes/tasks';

const router = Router();

router.get('/health', healthCheck);
router.use('/auth', authRouter);
router.use('/reports', reportRouter);
router.use('/tasks', taskRouter);

export default router;

