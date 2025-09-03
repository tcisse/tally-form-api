import { Types } from 'mongoose';
import { FormBlueprint } from '../../models/FormBlueprint.model.js';
import { GenerationRun } from '../../models/GenerationRun.model.js';
import { generateBlueprintFromPrompt } from '../ai/ai.service.js';
import { getClientForUser } from '../tally/tally.service.js';
import { mapFieldType } from '../../utils/tallyMap.js';
import { diffObjects } from '../../utils/diff.js';
export async function generate(userId, inputPrompt) {
    let blueprint;
    try {
        blueprint = await generateBlueprintFromPrompt(inputPrompt);
    }
    catch (error) {
        await GenerationRun.create({ userId: new Types.ObjectId(userId), inputPrompt, status: 'failed', error: error?.message });
        const err = new Error('Generation failed');
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
export async function list(userId, limit = 50) {
    const items = await FormBlueprint.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
    return items.map((i) => ({ ...i, id: i._id.toString() }));
}
export async function getById(userId, id) {
    const item = await FormBlueprint.findOne({ _id: id, userId }).lean();
    if (!item) {
        const err = new Error('Not found');
        err.status = 404;
        err.code = 'BlueprintNotFound';
        throw err;
    }
    return { ...item, id: item._id.toString() };
}
export async function remove(userId, id) {
    const res = await FormBlueprint.deleteOne({ _id: id, userId });
    if (!res.deletedCount) {
        const err = new Error('Not found');
        err.status = 404;
        err.code = 'BlueprintNotFound';
        throw err;
    }
}
export async function applyToTally(userId, id) {
    const record = await FormBlueprint.findOne({ _id: id, userId });
    if (!record) {
        const err = new Error('Not found');
        err.status = 404;
        err.code = 'BlueprintNotFound';
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
export async function patch(userId, id, input) {
    const record = await FormBlueprint.findOne({ _id: id, userId });
    if (!record) {
        const err = new Error('Not found');
        err.status = 404;
        err.code = 'BlueprintNotFound';
        throw err;
    }
    const before = record.toObject();
    if (input.name !== undefined)
        record.name = input.name;
    if (input.blueprint !== undefined)
        record.blueprint = input.blueprint;
    const after = record.toObject();
    record.lastAppliedDiff = diffObjects(before.blueprint, after.blueprint);
    await record.save();
    return { ...after, id: record._id.toString() };
}
