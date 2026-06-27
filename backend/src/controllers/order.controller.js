import { orderService } from '../services/order.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const orderController = {
  create: catchAsync(async (req, res) => res.status(201).json({ success: true, data: await orderService.create(req.body, req.user) })),
  update: catchAsync(async (req, res) => res.json({ success: true, data: await orderService.update(Number(req.params.id), req.body) })),
  cancel: catchAsync(async (req, res) => res.json({ success: true, data: await orderService.cancel(Number(req.params.id), req.user) })),
  list: catchAsync(async (req, res) => res.json({ success: true, data: await orderService.list(req.query) })),
  get: catchAsync(async (req, res) => res.json({ success: true, data: await orderService.get(Number(req.params.id)) }))
};
