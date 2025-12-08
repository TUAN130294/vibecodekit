import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';

export class TaskController {
    private service = new TaskService();

    createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = await this.service.createTask(req.body);
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    };

    getTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const result = await this.service.getTasks(page);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    };
}
