import { BlueprintSchema } from '../forms/forms.schemas.js';
import { buildPrompt } from './ai.prompt.js';
// Placeholder AI service: deterministic template for now
export async function generateBlueprintFromPrompt(naturalLanguage) {
    const _prompt = buildPrompt(naturalLanguage);
    const naive = {
        title: 'Generated Form',
        description: 'Auto-generated from prompt',
        fields: [
            { key: 'name', label: 'Name', type: 'text', required: true },
            { key: 'email', label: 'Email', type: 'email', required: true }
        ]
    };
    return BlueprintSchema.parse(naive);
}
