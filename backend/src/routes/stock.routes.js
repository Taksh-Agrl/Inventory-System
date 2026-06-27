import { Router } from 'express';
import { stockController } from '../controllers/stock.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { adjustValidator, movementValidator } from '../validators/stock.validator.js';

export const stockRoutes = Router();

stockRoutes.use(protect);
stockRoutes.post('/movement', movementValidator, validate, stockController.movement);
stockRoutes.post('/adjust', adjustValidator, validate, stockController.adjust);
