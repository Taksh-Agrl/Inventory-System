import { dashboardService } from '../services/dashboard.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const dashboardController = {
  summary: catchAsync(async (_req, res) => res.json({ success: true, data: await dashboardService.summary() }))
};
