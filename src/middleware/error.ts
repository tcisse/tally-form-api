import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: 'NotFound', message: 'Route not found' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const code = err.code || 'InternalServerError';
  const message = err.message || 'An unexpected error occurred';
  const payload = err.payload;

  logger.error({ err, code, status }, 'Request failed');

  res.status(status).json({ error: code, message, ...(payload ? { details: payload } : {}) });
}

