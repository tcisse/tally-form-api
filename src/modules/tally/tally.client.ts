import { env } from '../../config/env.js';

export interface TallyClientOptions {
  apiKey: string;
}

export class TallyClient {
  private readonly apiBase = env.TALLY_API_BASE;
  private readonly apiKey: string;

  constructor(opts: TallyClientOptions) {
    this.apiKey = opts.apiKey;
  }

  private headers() {
    return { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' } as const;
  }

  // Stubs — replace with real Tally API endpoints when available
  async createForm(payload: any): Promise<{ id: string; shareUrl?: string }> {
    // Placeholder no-op
    return { id: 'tally_form_mock', shareUrl: 'https://tally.so/r/mock' };
  }
}

