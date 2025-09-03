export const SYSTEM_PROMPT = `You are a helpful assistant that converts natural language requests into form blueprints.`;

export function buildPrompt(userInput: string) {
  return `${SYSTEM_PROMPT}\n\nUser: ${userInput}\nAssistant: Return a concise form with fields.`;
}

