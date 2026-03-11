import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { env } from './env';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), env.UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `scan-${uniqueSuffix}${path.extname(file.originalname).toLowerCase()}`);
    },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only jpg, jpeg, png, pdf files are allowed'));
    }
};

export const uploadSingle = multer({
    storage,
    limits: { fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024 },
    fileFilter,
}).single('scan_image');

export const uploadMiddleware = multer({
    storage,
    limits: { fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024 },
    fileFilter,
});
