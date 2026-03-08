import { Response } from 'express';
import { ApiResponse, Pagination, PaginatedResponse } from '../types/common';

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200
): Response => {
    return res.status(statusCode).json({ success: true, message, data } as ApiResponse<T>);
};

export const sendCreated = <T>(res: Response, data: T, message = 'Created successfully'): Response => {
    return sendSuccess(res, data, message, 201);
};

export const sendError = (
    res: Response,
    message = 'Internal server error',
    statusCode = 500,
    errors?: unknown
): Response => {
    return res.status(statusCode).json({ success: false, message, errors } as ApiResponse);
};

export const sendUnauthorized = (res: Response, message = 'Unauthorized'): Response =>
    sendError(res, message, 401);

export const sendForbidden = (res: Response, message = 'Forbidden'): Response =>
    sendError(res, message, 403);

export const sendNotFound = (res: Response, message = 'Not found'): Response =>
    sendError(res, message, 404);

export const sendValidationError = (res: Response, errors: unknown): Response =>
    sendError(res, 'Validation failed', 422, errors);

/**
 * Wrap paginated results in a standard envelope.
 */
export const paginate = <T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Success'
): Response => {
    const totalPages = Math.ceil(total / limit);
    const pagination: Pagination = {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
    return res.status(200).json({
        success: true,
        message,
        data,
        pagination,
    });
};
