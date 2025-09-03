import { Schema, model, Types } from 'mongoose';

interface IGenerationRun {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  blueprintId?: Types.ObjectId;
  inputPrompt: string;
  outputBlueprint?: Record<string, unknown>;
  status: 'ok'|'failed';
  error?: string;
  createdAt: Date;
}

const GenerationRunSchema = new Schema<IGenerationRun>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  blueprintId: { type: Schema.Types.ObjectId, ref: 'FormBlueprint' },
  inputPrompt: { type: String, required: true },
  outputBlueprint: Object,
  status: { type: String, enum: ['ok','failed'], default: 'ok' },
  error: String
}, { timestamps: { createdAt: true, updatedAt: false } });

export const GenerationRun = model<IGenerationRun>('GenerationRun', GenerationRunSchema);
export type { IGenerationRun };

