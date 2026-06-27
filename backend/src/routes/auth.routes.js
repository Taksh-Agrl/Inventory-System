import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';

export const authRoutes = Router();

authRoutes.post('/register', registerValidator, validate, authController.register);
authRoutes.post('/login', loginValidator, validate, authController.login);
authRoutes.post('/logout', authController.logout);
authRoutes.get('/me', protect, authController.me);
