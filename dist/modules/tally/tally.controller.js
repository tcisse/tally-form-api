import { TallyConnection } from '../../models/TallyConnection.model.js';
export async function connectWithApiKey(req, res) {
    const { apiKey } = req.body;
    if (!apiKey) {
        return res.status(400).json({ error: 'ValidationError', message: 'apiKey required' });
    }
    const upserted = await TallyConnection.findOneAndUpdate({ userId: req.user.id }, { userId: req.user.id, accessToken: apiKey }, { upsert: true, new: true }).lean();
    res.status(201).json({ connected: true, connectionId: upserted._id.toString() });
}
export async function statusController(req, res) {
    const conn = await TallyConnection.findOne({ userId: req.user.id }).lean();
    res.json({ connected: !!conn, scopes: conn?.scopes ?? [], expiresAt: conn?.expiresAt ?? null });
}
