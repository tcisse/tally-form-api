import { Request, Response, NextFunction } from 'express';

function sanitizeValue(value: any): any {
  if (value == null) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    // basic string sanitation (remove null bytes)
    return trimmed.replace(/\0/g, '');
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (typeof value === 'object') {
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      // prevent MongoDB operator injection and prototype pollution
      if (k.startsWith('$') || k.includes('.')) continue;
      if (k === '__proto__' || k === 'prototype' || k === 'constructor') continue;
      result[k] = sanitizeValue(v);
    }
    return result;
  }
  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  if (req.params) req.params = sanitizeValue(req.params);
  next();
}

