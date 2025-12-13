import { AppDataSource } from '../../../config/dataSource';
import { Task, TaskStatus } from '../entities/Task';
import { User } from '../../shared/entities/User';

export interface CreateTaskDto {
    title: string;
    description?: string;
    priority?: any;
    assignedToId?: string;
}

export class TaskService {
    private taskRepo = AppDataSource.getRepository(Task);
    private userRepo = AppDataSource.getRepository(User);

    async createTask(data: CreateTaskDto): Promise<Task> {
        let assignedTo: User | null = null;
        if (data.assignedToId) {
            assignedTo = await this.userRepo.findOneBy({ id: data.assignedToId });
            if (!assignedTo) {
                throw new Error('Assigned user not found');
            }
        }

        const task = this.taskRepo.create({
            ...data,
            assignedTo: assignedTo || undefined, // TypeORM handles null
            status: TaskStatus.OPEN
        });

        return this.taskRepo.save(task);
    }

    async getTasks(page: number = 1, limit: number = 20): Promise<{ tasks: Task[]; total: number }> {
        const [tasks, total] = await this.taskRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            relations: ['assignedTo']
        });

        return { tasks, total };
    }

    async updateStatus(id: string, status: TaskStatus): Promise<Task | null> {
        const task = await this.taskRepo.findOneBy({ id });
        if (!task) return null;

        task.status = status;
        return this.taskRepo.save(task);
    }
}

