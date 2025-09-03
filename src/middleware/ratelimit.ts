import rateLimit from 'express-rate-limit';

export function makeUserRateLimiter(options?: { windowMs?: number; max?: number }) {
  const windowMs = options?.windowMs ?? 60_000; // 1 minute
  const max = options?.max ?? 30; // 30 requests per minute
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => (req.user?.id ?? req.ip ?? 'anon')
  });
}

