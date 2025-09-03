import { Schema, model } from 'mongoose';
const FormBlueprintSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: String,
    prompt: { type: String, required: true },
    blueprint: { type: Object, required: true },
    tallyFormId: String,
    status: { type: String, enum: ['draft', 'applied', 'error'], default: 'draft' },
    lastAppliedDiff: { type: Object }
}, { timestamps: true });
export const FormBlueprint = model('FormBlueprint', FormBlueprintSchema);
