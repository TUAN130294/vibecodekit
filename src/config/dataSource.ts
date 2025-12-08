import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../entities/User';
import { Order } from '../entities/Order';
import { Report } from '../entities/Report';
import { Task } from '../entities/Task';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Order, Report, Task],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: env.nodeEnv !== 'production'
});

