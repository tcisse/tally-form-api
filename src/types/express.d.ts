import type { AuthUser } from '../middleware/auth.js';

declare global {
  namespace Express {
    // Augment Express Request with authenticated user
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};

