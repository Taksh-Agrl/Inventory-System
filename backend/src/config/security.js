import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { env } from './env.js';

export const securityMiddleware = [
  helmet(),
  cors({ origin: env.clientUrl, credentials: true }),
  mongoSanitize(),
  rateLimit({ windowMs: 15 * 60 * 1000, max: 500, standardHeaders: true, legacyHeaders: false })
];
