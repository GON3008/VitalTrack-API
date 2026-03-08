/**
 * Augment Express Request to include authenticated user.
 * This file is auto-included via tsconfig paths.
 */
import 'express';

declare module 'express' {
    interface Request {
        user?: {
            id: number;
            email: string;
            role: string;
            name: string;
        };
    }
}
