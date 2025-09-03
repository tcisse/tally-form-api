import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.model.js';
import { env } from '../../config/env.js';
export async function signup(email, password) {
    const existing = await User.findOne({ email }).lean();
    if (existing) {
        const err = new Error('Email already in use');
        err.status = 409;
        err.code = 'EmailExists';
        throw err;
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash });
    return { id: user._id.toString(), email: user.email };
}
export async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.code = 'InvalidCredentials';
        throw err;
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.code = 'InvalidCredentials';
        throw err;
    }
    const nowSeconds = Math.floor(Date.now() / 1000);
    const payload = {
        sub: user._id.toString(),
        email: user.email,
        role: 'user',
        iat: nowSeconds,
        exp: nowSeconds + env.JWT_TTL
    };
    const token = jwt.sign(payload, env.JWT_SECRET, { algorithm: 'HS256' });
    return { token };
}
export async function getProfile(userId) {
    const user = await User.findById(userId).lean();
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        err.code = 'UserNotFound';
        throw err;
    }
    return { id: user._id.toString(), email: user.email, createdAt: user.createdAt };
}
