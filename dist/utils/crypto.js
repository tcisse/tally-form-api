import crypto from 'crypto';
import { env } from '../config/env.js';
function getKey() {
    if (!env.CRYPTO_KEY)
        return null;
    return crypto.createHash('sha256').update(env.CRYPTO_KEY).digest();
}
export function encryptIfPossible(plaintext) {
    const key = getKey();
    if (!key)
        return plaintext;
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([Buffer.from('enc:'), iv, tag, ciphertext]).toString('base64');
}
export function decryptIfPossible(payload) {
    if (!payload.startsWith('enc:'))
        return payload;
    const key = getKey();
    if (!key)
        return payload;
    const packed = Buffer.from(payload, 'base64');
    const iv = packed.subarray(4, 16);
    const tag = packed.subarray(16, 32);
    const ciphertext = packed.subarray(32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString('utf8');
}
