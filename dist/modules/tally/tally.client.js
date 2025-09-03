import { env } from '../../config/env.js';
export class TallyClient {
    apiBase = env.TALLY_API_BASE;
    apiKey;
    constructor(opts) {
        this.apiKey = opts.apiKey;
    }
    headers() {
        return { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' };
    }
    // Stubs — replace with real Tally API endpoints when available
    async createForm(payload) {
        // Placeholder no-op
        return { id: 'tally_form_mock', shareUrl: 'https://tally.so/r/mock' };
    }
}
