import { Router } from 'express';
import { authRoutes } from './auth.routes.js';
import { dashboardRoutes } from './dashboard.routes.js';
import { historyRoutes } from './history.routes.js';
import { orderRoutes } from './order.routes.js';
import { productRoutes } from './product.routes.js';
import { stockRoutes } from './stock.routes.js';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/orders', orderRoutes);
apiRoutes.use('/stocks', stockRoutes);
apiRoutes.use('/dashboard', dashboardRoutes);
apiRoutes.use('/history', historyRoutes);
