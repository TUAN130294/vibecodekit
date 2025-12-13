import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../features/shared/entities/User';
import { Order } from '../features/shared/entities/Order';
import { Report } from '../features/reports/entities/Report';
import { Task } from '../features/tasks/entities/Task';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Order, Report, Task],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: env.nodeEnv !== 'production'
});

