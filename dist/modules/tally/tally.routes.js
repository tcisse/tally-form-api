import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.js';
import { connectWithApiKey, statusController } from './tally.controller.js';
const router = Router();
router.use(authMiddleware);
router.post('/connect', connectWithApiKey);
router.get('/status', statusController);
export default router;
