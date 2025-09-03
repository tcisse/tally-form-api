import { Schema, model } from 'mongoose';
const WebhookEventSchema = new Schema({
    provider: { type: String, enum: ['tally'], required: true },
    eventType: { type: String, required: true },
    payload: { type: Object, required: true },
    receivedAt: { type: Date, default: () => new Date() }
}, { timestamps: true });
export const WebhookEvent = model('WebhookEvent', WebhookEventSchema);
