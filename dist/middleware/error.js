import { logger } from '../config/logger.js';
export function notFoundHandler(req, res) {
    res.status(404).json({ error: 'NotFound', message: 'Route not found' });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const code = err.code || 'InternalServerError';
    const message = err.message || 'An unexpected error occurred';
    const payload = err.payload;
    logger.error({ err, code, status }, 'Request failed');
    res.status(status).json({ error: code, message, ...(payload ? { details: payload } : {}) });
}
