import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { TokenPayload, AuthTokens } from '../types/common';

/**
 * Sign a JWT access token.
 */
export const signToken = (payload: TokenPayload): AuthTokens => {
    const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);

    return {
        access_token: token,
        token_type: 'bearer',
        expires_in: env.JWT_EXPIRES_IN,
    };
};

/**
 * Verify and decode a JWT token.
 * Throws if invalid or expired.
 */
export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};
