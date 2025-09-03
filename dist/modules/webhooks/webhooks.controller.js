import { WebhookEvent } from '../../models/WebhookEvent.model.js';
export async function tallyWebhookController(req, res) {
    // Signature verification can be added here when available
    const { eventType } = req.query;
    await WebhookEvent.create({ provider: 'tally', eventType: eventType || 'unknown', payload: req.body });
    res.status(202).json({ received: true });
}
