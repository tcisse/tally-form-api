import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import swaggerUi from 'swagger-ui-express';
export const createApp = () => {
    const app = express();
    // Logging
    app.use(pinoHttp({ logger }));
    // Security & parsers
    app.use(helmet());
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));
    // CORS allowlist
    const origins = env.CORS_ORIGINS.split(',').map((o) => o.trim());
    app.use(cors({ origin: origins, credentials: false }));
    // Basic rate limiting per IP
    const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
    app.use(limiter);
    // Health
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    // Routes will be mounted here later
    app.use('/auth', (await import('./modules/auth/auth.routes.js')).default);
    app.use('/forms', (await import('./modules/forms/forms.routes.js')).default);
    app.use('/tally', (await import('./modules/tally/tally.routes.js')).default);
    app.use('/webhooks', (await import('./modules/webhooks/webhooks.routes.js')).default);
    // Minimal OpenAPI placeholder
    const openapiDoc = {
        openapi: '3.0.0',
        info: { title: 'AI Form API', version: '0.1.0' },
        servers: [{ url: '/' }],
        paths: {
            '/auth/login': { post: { summary: 'Login', responses: { '200': { description: 'OK' } } } },
            '/auth/signup': { post: { summary: 'Signup', responses: { '201': { description: 'Created' } } } },
            '/auth/me': { get: { summary: 'Me', security: [{ BearerAuth: [] }], responses: { '200': { description: 'OK' } } } }
        },
        components: { securitySchemes: { BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } }
    };
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));
    // 404 and error handling
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
};
