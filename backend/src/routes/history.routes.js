import { Router } from 'express';
import { stockController } from '../controllers/stock.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { historyQueryValidator } from '../validators/stock.validator.js';

export const historyRoutes = Router();

historyRoutes.use(protect);
historyRoutes.get('/', historyQueryValidator, validate, stockController.history);
