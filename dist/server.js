import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectToDatabase } from './db/mongoose.js';
async function main() {
    await connectToDatabase();
    const app = createApp();
    app.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, 'Server listening');
    });
}
main().catch((err) => {
    logger.error({ err }, 'Fatal startup error');
    process.exit(1);
});
