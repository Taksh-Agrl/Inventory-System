import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { orderIdParam, orderUpdateValidator, orderValidator } from '../validators/order.validator.js';

export const orderRoutes = Router();

orderRoutes.use(protect);
orderRoutes.route('/').get(orderController.list).post(orderValidator, validate, orderController.create);
orderRoutes.route('/:id').get(orderIdParam, validate, orderController.get).put(orderIdParam, orderUpdateValidator, validate, orderController.update);
orderRoutes.post('/:id/cancel', orderIdParam, validate, orderController.cancel);
