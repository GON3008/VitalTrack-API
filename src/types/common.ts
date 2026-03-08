// ─── Shared API Types ─────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    errors?: unknown;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface PaginationQuery {
    page?: number;
    limit?: number;
}

// ─── Service Result Types ──────────────────────────────────────────────────────

export interface TokenPayload {
    userId: number;
    email: string;
    role: string;
}

export interface AuthTokens {
    access_token: string;
    token_type: 'bearer';
    expires_in: string;
}

export interface UserContext {
    id: number;
    email: string;
    role: string;
    name: string;
}
