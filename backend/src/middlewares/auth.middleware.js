import { prisma } from '../database/prisma.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = catchAsync(async (req, _res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new AppError('Authentication required.', 401);

  const payload = verifyToken(token);
  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) throw new AppError('User no longer exists.', 401);
  req.user = user;
  next();
});

export const restrictTo = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) throw new AppError('You do not have permission for this action.', 403);
  next();
};
