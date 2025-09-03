import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
export async function connectToDatabase() {
    mongoose.set('strictQuery', true);
    try {
        const conn = await mongoose.connect(env.MONGO_URI);
        logger.info({ uri: env.MONGO_URI }, 'Connected to MongoDB');
        return conn;
    }
    catch (error) {
        logger.error({ err: error }, 'Failed to connect to MongoDB');
        throw error;
    }
}
