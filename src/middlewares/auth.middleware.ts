import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../prisma/client';
import { sendUnauthorized } from '../utils/response';

/**
 * JWT authentication middleware.
 * Reads Bearer token from Authorization header, verifies it,
 * then attaches user info to req.user (typed via src/types/express.d.ts).
 */
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        sendUnauthorized(res, 'No token provided');
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);

        const user = await prisma.user.findFirst({
            where: { id: decoded.userId, deletedAt: null },
            select: { id: true, email: true, role: true, name: true },
        });

        if (!user) {
            sendUnauthorized(res, 'User not found or deleted');
            return;
        }

        req.user = user;
        next();
    } catch {
        sendUnauthorized(res, 'Invalid or expired token');
    }
};
