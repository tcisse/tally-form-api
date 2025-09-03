import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export function authMiddleware(req, res, next) {
    const header = req.get('authorization') || req.get('Authorization');
    if (!header || !header.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Missing bearer token' });
    }
    const token = header.slice(7).trim();
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = { id: decoded.sub, email: decoded.email, role: decoded.role };
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
}
