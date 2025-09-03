import { TallyConnection } from '../../models/TallyConnection.model.js';
import { TallyClient } from './tally.client.js';
export async function getClientForUser(userId) {
    const conn = await TallyConnection.findOne({ userId }).lean();
    if (!conn?.accessToken) {
        const err = new Error('No Tally connection');
        err.status = 400;
        err.code = 'TallyNotConnected';
        throw err;
    }
    return new TallyClient({ apiKey: conn.accessToken });
}
