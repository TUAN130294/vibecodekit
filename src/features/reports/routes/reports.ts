import { Router } from 'express';
import { ReportController } from '../controllers/reportController';

const router = Router();
const controller = new ReportController();

router.get('/daily', controller.getDailyReport);

export default router;

