import { body, param } from 'express-validator';

export const productIdParam = [param('id').isInt({ min: 1 }).toInt()];

export const productValidator = [
  body('name').trim().isLength({ min: 2 }),
  body('sku').trim().isLength({ min: 2 }),
  body('description').optional({ nullable: true }).trim(),
  body('category').trim().isLength({ min: 2 }),
  body('price').isFloat({ min: 0 }).toFloat(),
  body('currentStock').optional().isInt({ min: 0 }).toInt(),
  body('imageUrl').optional({ nullable: true }).isString()
];

export const productUpdateValidator = [
  body('name').optional().trim().isLength({ min: 2 }),
  body('sku').optional().trim().isLength({ min: 2 }),
  body('description').optional({ nullable: true }).trim(),
  body('category').optional().trim().isLength({ min: 2 }),
  body('price').optional().isFloat({ min: 0 }).toFloat(),
  body('currentStock').optional().isInt({ min: 0 }).toInt(),
  body('imageUrl').optional({ nullable: true }).isString()
];
