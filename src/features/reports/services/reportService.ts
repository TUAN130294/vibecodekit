import { AppDataSource } from '../../../config/dataSource';
import { Order, OrderStatus } from '../../shared/entities/Order';
import { Report, ReportType } from '../entities/Report';
import { Between } from 'typeorm';

export class ReportService {
    private orderRepo = AppDataSource.getRepository(Order);
    private reportRepo = AppDataSource.getRepository(Report);

    async generateDailyReport(date: Date): Promise<Report> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const orders = await this.orderRepo.find({
            where: {
                createdAt: Between(startOfDay, endOfDay),
                status: OrderStatus.PAID
            }
        });

        const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
        const orderCount = orders.length;

        const reportData = {
            date: startOfDay.toISOString().split('T')[0],
            totalRevenue,
            orderCount,
            orders: orders.map(o => o.id) // simple ref
        };

        const report = this.reportRepo.create({
            type: ReportType.DAILY,
            data: reportData,
            generatedAt: new Date()
        });

        return this.reportRepo.save(report);
    }

    async getLatestDailyReport(): Promise<Report | null> {
        return this.reportRepo.findOne({
            where: { type: ReportType.DAILY },
            order: { generatedAt: 'DESC' }
        });
    }
}

