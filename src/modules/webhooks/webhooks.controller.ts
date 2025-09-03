import { Request, Response } from 'express';
import { WebhookEvent } from '../../models/WebhookEvent.model.js';

export async function tallyWebhookController(req: Request, res: Response) {
  // Signature verification can be added here when available
  const { eventType } = req.query as { eventType?: string };
  await WebhookEvent.create({ provider: 'tally', eventType: eventType || 'unknown', payload: req.body });
  res.status(202).json({ received: true });
}

