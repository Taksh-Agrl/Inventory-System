import { productService } from '../services/product.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const productController = {
  list: catchAsync(async (req, res) => res.json({ success: true, data: await productService.list(req.query) })),
  create: catchAsync(async (req, res) => res.status(201).json({ success: true, data: await productService.create(req.body, req.user, req.file) })),
  get: catchAsync(async (req, res) => res.json({ success: true, data: await productService.get(Number(req.params.id)) })),
  update: catchAsync(async (req, res) => res.json({ success: true, data: await productService.update(Number(req.params.id), req.body, req.file) })),
  remove: catchAsync(async (req, res) => {
    await productService.remove(Number(req.params.id));
    res.status(204).send();
  })
};
