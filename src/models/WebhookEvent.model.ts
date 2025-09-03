import { Schema, model, Types } from 'mongoose';

interface IWebhookEvent {
  _id: Types.ObjectId;
  provider: 'tally';
  eventType: string;
  payload: Record<string, unknown>;
  receivedAt: Date;
}

const WebhookEventSchema = new Schema<IWebhookEvent>({
  provider: { type: String, enum: ['tally'], required: true },
  eventType: { type: String, required: true },
  payload: { type: Object, required: true },
  receivedAt: { type: Date, default: () => new Date() }
}, { timestamps: true });

export const WebhookEvent = model<IWebhookEvent>('WebhookEvent', WebhookEventSchema);
export type { IWebhookEvent };

