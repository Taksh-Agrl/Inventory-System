import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env.js';
import { securityMiddleware } from './config/security.js';
import { prisma } from './database/prisma.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import { apiRoutes } from './routes/index.js';

export const app = express();

app.use(securityMiddleware);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve(env.uploadDir)));

app.get('/health', async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ success: true, status: 'ok' });
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);
