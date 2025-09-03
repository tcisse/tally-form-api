import { Schema, model } from 'mongoose';
const GenerationRunSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    blueprintId: { type: Schema.Types.ObjectId, ref: 'FormBlueprint' },
    inputPrompt: { type: String, required: true },
    outputBlueprint: Object,
    status: { type: String, enum: ['ok', 'failed'], default: 'ok' },
    error: String
}, { timestamps: { createdAt: true, updatedAt: false } });
export const GenerationRun = model('GenerationRun', GenerationRunSchema);
