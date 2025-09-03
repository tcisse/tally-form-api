import { Router } from 'express';
import { tallyWebhookController } from './webhooks.controller.js';
const router = Router();
router.post('/tally', tallyWebhookController);
export default router;
