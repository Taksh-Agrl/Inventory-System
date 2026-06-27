import { body, param } from 'express-validator';

export const orderIdParam = [param('id').isInt({ min: 1 }).toInt()];

export const orderValidator = [
  body('customer').trim().isLength({ min: 2 }),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').isInt({ min: 1 }).toInt(),
  body('items.*.quantity').isInt({ min: 1 }).toInt()
];

export const orderUpdateValidator = [
  body('customer').optional().trim().isLength({ min: 2 })
];
