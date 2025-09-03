import { Request, Response } from 'express';
import * as FormsService from './forms.service.js';
import type { PatchInput } from './forms.schemas.js';

export async function generateController(req: Request, res: Response) {
  const { prompt } = req.body as { prompt: string };
  const result = await FormsService.generate(req.user!.id, prompt);
  res.status(201).json(result);
}

export async function listController(req: Request, res: Response) {
  const items = await FormsService.list(req.user!.id);
  res.json({ items });
}

export async function getController(req: Request, res: Response) {
  const item = await FormsService.getById(req.user!.id, req.params.id);
  res.json({ item });
}

export async function deleteController(req: Request, res: Response) {
  await FormsService.remove(req.user!.id, req.params.id);
  res.status(204).send();
}

export async function applyController(req: Request, res: Response) {
  const result = await FormsService.applyToTally(req.user!.id, req.params.id);
  res.json(result);
}

export async function patchController(req: Request, res: Response) {
  const body = req.body as PatchInput;
  const item = await FormsService.patch(req.user!.id, req.params.id, body);
  res.json({ item });
}

