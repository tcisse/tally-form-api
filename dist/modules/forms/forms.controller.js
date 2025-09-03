import * as FormsService from './forms.service.js';
export async function generateController(req, res) {
    const { prompt } = req.body;
    const result = await FormsService.generate(req.user.id, prompt);
    res.status(201).json(result);
}
export async function listController(req, res) {
    const items = await FormsService.list(req.user.id);
    res.json({ items });
}
export async function getController(req, res) {
    const item = await FormsService.getById(req.user.id, req.params.id);
    res.json({ item });
}
export async function deleteController(req, res) {
    await FormsService.remove(req.user.id, req.params.id);
    res.status(204).send();
}
export async function applyController(req, res) {
    const result = await FormsService.applyToTally(req.user.id, req.params.id);
    res.json(result);
}
export async function patchController(req, res) {
    const body = req.body;
    const item = await FormsService.patch(req.user.id, req.params.id, body);
    res.json({ item });
}
