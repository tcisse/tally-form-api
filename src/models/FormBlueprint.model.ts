import { Schema, model, Types } from 'mongoose';

interface IField {
  key: string;
  label: string;
  type: 'text'|'email'|'phone'|'number'|'date'|'time'|'long_text'|'dropdown'|'checkbox'|'radio';
  required?: boolean;
  options?: string[];
  validation?: Record<string, unknown>;
  helpText?: string;
}

interface IBlueprint {
  title: string;
  description?: string;
  fields: IField[];
  logic?: any[];
  theme?: any;
  success?: { message?: string; redirectUrl?: string };
  settings?: { captcha?: boolean; collectEmail?: boolean };
}

interface IFormBlueprint {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name?: string;
  prompt: string;
  blueprint: IBlueprint;
  tallyFormId?: string;
  status: 'draft'|'applied'|'error';
  lastAppliedDiff?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const FormBlueprintSchema = new Schema<IFormBlueprint>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: String,
  prompt: { type: String, required: true },
  blueprint: { type: Object, required: true },
  tallyFormId: String,
  status: { type: String, enum: ['draft','applied','error'], default: 'draft' },
  lastAppliedDiff: { type: Object }
}, { timestamps: true });

export const FormBlueprint = model<IFormBlueprint>('FormBlueprint', FormBlueprintSchema);
export type { IFormBlueprint, IBlueprint, IField };

