import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
import { signToken } from '../utils/jwt.js';

const safeUser = (user) => ({ id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt });

export const authService = {
  async register(data) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new AppError('Email is already registered.', 409);
    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role || 'EMPLOYEE'
    });
    return { user: safeUser(user), token: signToken(user) };
  },
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError('Invalid email or password.', 401);
    }
    return { user: safeUser(user), token: signToken(user) };
  },
  me(user) {
    return safeUser(user);
  }
};
