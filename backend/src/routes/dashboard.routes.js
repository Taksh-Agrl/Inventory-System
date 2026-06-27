import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

export const dashboardRoutes = Router();

dashboardRoutes.use(protect);
dashboardRoutes.get('/', dashboardController.summary);
