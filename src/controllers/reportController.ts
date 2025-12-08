import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/reportService';
import { APIError } from '../middleware/errorHandler';

export class ReportController {
    private service = new ReportService();

    getDailyReport = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dateStr = req.query.date as string;
            const date = dateStr ? new Date(dateStr) : new Date();
            const report = await this.service.generateDailyReport(date);
            res.json({ success: true, data: report });
        } catch (error) {
            next(error);
        }
    };
}
