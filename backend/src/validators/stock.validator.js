import { body, query } from 'express-validator';

export const movementValidator = [
  body('productId').isInt({ min: 1 }).toInt(),
  body('quantity').isInt({ min: 1 }).toInt(),
  body('movementType').isIn(['ADD', 'REMOVE']),
  body('note').optional({ nullable: true }).trim()
];

export const adjustValidator = [
  body('productId').isInt({ min: 1 }).toInt(),
  body('newQuantity').isInt({ min: 0 }).toInt(),
  body('note').optional({ nullable: true }).trim()
];

export const historyQueryValidator = [
  query('productId').optional().isInt({ min: 1 }).toInt(),
  query('movementType').optional().isIn(['ADD', 'REMOVE', 'ORDER', 'CANCEL', 'ADJUST'])
];
