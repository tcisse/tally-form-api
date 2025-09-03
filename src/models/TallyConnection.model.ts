import { Schema, model, Types } from 'mongoose';

interface ITallyConnection {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  providerUserId?: string;
  accessToken: string;
  refreshToken?: string;
  scopes?: string[];
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TallyConnectionSchema = new Schema<ITallyConnection>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  providerUserId: String,
  accessToken: { type: String, required: true },
  refreshToken: String,
  scopes: [String],
  expiresAt: Date
}, { timestamps: true });

export const TallyConnection = model<ITallyConnection>('TallyConnection', TallyConnectionSchema);
export type { ITallyConnection };

