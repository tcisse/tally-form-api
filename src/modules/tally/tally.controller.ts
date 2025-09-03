import { Request, Response } from 'express';
import { TallyConnection } from '../../models/TallyConnection.model.js';

export async function connectWithApiKey(req: Request, res: Response) {
  const { apiKey } = req.body as { apiKey?: string };
  if (!apiKey) {
    return res.status(400).json({ error: 'ValidationError', message: 'apiKey required' });
  }
  const upserted = await TallyConnection.findOneAndUpdate(
    { userId: req.user!.id },
    { userId: req.user!.id, accessToken: apiKey },
    { upsert: true, new: true }
  ).lean();
  res.status(201).json({ connected: true, connectionId: upserted._id.toString() });
}

export async function statusController(req: Request, res: Response) {
  const conn = await TallyConnection.findOne({ userId: req.user!.id }).lean();
  res.json({ connected: !!conn, scopes: conn?.scopes ?? [], expiresAt: conn?.expiresAt ?? null });
}

