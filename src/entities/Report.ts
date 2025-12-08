import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum ReportType {
    DAILY = 'daily',
    MONTHLY = 'monthly',
}

@Entity({ name: 'reports' })
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index()
    @Column({ type: 'enum', enum: ReportType })
    type!: ReportType;

    @Column({ type: 'jsonb' })
    data!: any;

    @CreateDateColumn()
    generatedAt!: Date;
}
