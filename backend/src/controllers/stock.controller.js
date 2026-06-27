import { stockService } from '../services/stock.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const stockController = {
  movement: catchAsync(async (req, res) => res.status(201).json({ success: true, data: await stockService.adjust(req.body, req.user) })),
  adjust: catchAsync(async (req, res) => res.status(201).json({ success: true, data: await stockService.setAbsolute(req.body, req.user) })),
  history: catchAsync(async (req, res) => res.json({ success: true, data: await stockService.history(req.query) }))
};
