import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './User';

export enum OrderStatus {
    PENDING = 'pending',
    PAID = 'paid',
    SHIPPED = 'shipped',
    CANCELLED = 'cancelled',
}

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total!: number;

    @Index()
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status!: OrderStatus;

    @Column({ name: 'user_id' })
    userId!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

