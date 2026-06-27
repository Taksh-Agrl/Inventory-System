import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters.'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password').isStrongPassword({ minLength: 8, minSymbols: 0 }).withMessage('Password must be at least 8 characters and include upper, lower, and number.'),
  body('role').optional().isIn(['ADMIN', 'EMPLOYEE'])
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];
