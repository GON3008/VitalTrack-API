import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password.
 */
export const hashPassword = (plain: string): Promise<string> => {
    return bcrypt.hash(plain, SALT_ROUNDS);
};

/**
 * Compare a plain-text password against a hash.
 */
export const comparePassword = (plain: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(plain, hash);
};
