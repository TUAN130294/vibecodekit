import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './User';

export enum TaskStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @Index()
    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
    status!: TaskStatus;

    @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
    priority!: TaskPriority;

    @Column({ name: 'assigned_to', nullable: true })
    assignedToId!: string | null;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'assigned_to' })
    assignedTo!: User | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
