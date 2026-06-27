import { authService } from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { cookieOptions } from '../utils/jwt.js';

const sendAuth = (res, status, payload) => {
  res.cookie('token', payload.token, cookieOptions());
  res.status(status).json({ success: true, data: { user: payload.user } });
};

export const authController = {
  register: catchAsync(async (req, res) => sendAuth(res, 201, await authService.register(req.body))),
  login: catchAsync(async (req, res) => sendAuth(res, 200, await authService.login(req.body))),
  logout: (_req, res) => res.clearCookie('token', cookieOptions()).json({ success: true, message: 'Logged out.' }),
  me: (req, res) => res.json({ success: true, data: { user: authService.me(req.user) } })
};
