import { z } from 'zod';

export const FieldSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['text','email','phone','number','date','time','long_text','dropdown','checkbox','radio']),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  validation: z.record(z.any()).optional(),
  helpText: z.string().optional()
});

export const BlueprintSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  fields: z.array(FieldSchema).min(1),
  logic: z.array(z.record(z.any())).optional(),
  theme: z.record(z.any()).optional(),
  success: z.object({ message: z.string().optional(), redirectUrl: z.string().url().optional() }).optional(),
  settings: z.object({ captcha: z.boolean().optional(), collectEmail: z.boolean().optional() }).optional()
});

export const generateSchema = z.object({
  prompt: z.string().min(4)
});

export const patchSchema = z.object({
  name: z.string().optional(),
  blueprint: BlueprintSchema.optional()
});

export type Blueprint = z.infer<typeof BlueprintSchema>;
export type GenerateInput = z.infer<typeof generateSchema>;
export type PatchInput = z.infer<typeof patchSchema>;

