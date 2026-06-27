import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productIdParam, productUpdateValidator, productValidator } from '../validators/product.validator.js';

export const productRoutes = Router();

productRoutes.use(protect);
productRoutes.route('/')
  .get(productController.list)
  .post(restrictTo('ADMIN'), upload.single('image'), productValidator, validate, productController.create);
productRoutes.route('/:id')
  .get(productIdParam, validate, productController.get)
  .put(restrictTo('ADMIN'), upload.single('image'), productIdParam, productUpdateValidator, validate, productController.update)
  .delete(restrictTo('ADMIN'), productIdParam, validate, productController.remove);
