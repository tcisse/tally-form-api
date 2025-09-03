import { Schema, model } from 'mongoose';
const TallyConnectionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    providerUserId: String,
    accessToken: { type: String, required: true },
    refreshToken: String,
    scopes: [String],
    expiresAt: Date
}, { timestamps: true });
export const TallyConnection = model('TallyConnection', TallyConnectionSchema);
