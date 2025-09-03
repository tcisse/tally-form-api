import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(8080),
    MONGO_URI: z.string().min(1),
    JWT_SECRET: z.string().min(10),
    JWT_TTL: z.coerce.number().int().positive().default(3600),
    CORS_ORIGINS: z.string().default('http://localhost:3000'),
    TALLY_OAUTH_CLIENT_ID: z.string().optional(),
    TALLY_OAUTH_CLIENT_SECRET: z.string().optional(),
    TALLY_REDIRECT_URI: z.string().url().optional(),
    TALLY_API_BASE: z.string().url().default('https://api.tally.so'),
    CRYPTO_KEY: z.string().optional()
});
const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const env = parsed.data;
