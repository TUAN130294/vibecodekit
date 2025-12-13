import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();
const controller = new TaskController();

router.post('/', controller.createTask);
router.get('/', controller.getTasks);

export default router;

