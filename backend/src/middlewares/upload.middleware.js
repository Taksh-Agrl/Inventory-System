import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

if (!fs.existsSync(env.uploadDir)) fs.mkdirSync(env.uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, env.uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new AppError('Only JPEG, PNG, and WEBP images are allowed.', 400));
    }
    cb(null, true);
  }
});

export const publicUploadPath = (filename) => `/uploads/${path.basename(filename)}`;
