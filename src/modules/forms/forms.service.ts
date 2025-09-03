import { Types } from 'mongoose';
import { FormBlueprint } from '../../models/FormBlueprint.model.js';
import { GenerationRun } from '../../models/GenerationRun.model.js';
import { generateBlueprintFromPrompt } from '../ai/ai.service.js';
import type { Blueprint } from './forms.schemas.js';
import { getClientForUser } from '../tally/tally.service.js';
import { mapFieldType } from '../../utils/tallyMap.js';
import { diffObjects } from '../../utils/diff.js';
import type { PatchInput } from './forms.schemas.js';

export async function generate(userId: string, inputPrompt: string) {
  let blueprint: Blueprint | undefined;
  try {
    blueprint = await generateBlueprintFromPrompt(inputPrompt);
  } catch (error: any) {
    await GenerationRun.create({ userId: new Types.ObjectId(userId), inputPrompt, status: 'failed', error: error?.message });
    const err: any = new Error('Generation failed');
    err.status = 500;
    err.code = 'GenerationFailed';
    throw err;
  }

  const record = await FormBlueprint.create({
    userId: new Types.ObjectId(userId),
    prompt: inputPrompt,
    blueprint,
    status: 'draft'
  });
  await GenerationRun.create({ userId: new Types.ObjectId(userId), blueprintId: record._id, inputPrompt, outputBlueprint: blueprint, status: 'ok' });
  return { blueprint, blueprintId: record._id.toString() };
}

export async function list(userId: string, limit = 50) {
  const items = await FormBlueprint.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
  return items.map((i) => ({ ...i, id: i._id.toString() }));
}

export async function getById(userId: string, id: string) {
  const item = await FormBlueprint.findOne({ _id: id, userId }).lean();
  if (!item) {
    const err: any = new Error('Not found');
    err.status = 404; err.code = 'BlueprintNotFound';
    throw err;
  }
  return { ...item, id: item._id.toString() };
}

export async function remove(userId: string, id: string) {
  const res = await FormBlueprint.deleteOne({ _id: id, userId });
  if (!res.deletedCount) {
    const err: any = new Error('Not found');
    err.status = 404; err.code = 'BlueprintNotFound';
    throw err;
  }
}

export async function applyToTally(userId: string, id: string) {
  const record = await FormBlueprint.findOne({ _id: id, userId });
  if (!record) {
    const err: any = new Error('Not found');
    err.status = 404; err.code = 'BlueprintNotFound';
    throw err;
  }
  const client = await getClientForUser(userId);
  const payload = {
    title: record.blueprint.title,
    fields: record.blueprint.fields.map((f) => ({ key: f.key, label: f.label, type: mapFieldType(f.type), required: !!f.required, options: f.options }))
  };
  const created = await client.createForm(payload);
  record.tallyFormId = created.id;
  record.status = 'applied';
  await record.save();
  return { tallyFormId: created.id, shareUrl: created.shareUrl };
}

export async function patch(userId: string, id: string, input: PatchInput) {
  const record = await FormBlueprint.findOne({ _id: id, userId });
  if (!record) {
    const err: any = new Error('Not found');
    err.status = 404; err.code = 'BlueprintNotFound';
    throw err;
  }
  const before = record.toObject();
  if (input.name !== undefined) record.name = input.name;
  if (input.blueprint !== undefined) record.blueprint = input.blueprint as any;
  const after = record.toObject();
  record.lastAppliedDiff = diffObjects(before.blueprint, after.blueprint);
  await record.save();
  return { ...after, id: record._id.toString() };
}

