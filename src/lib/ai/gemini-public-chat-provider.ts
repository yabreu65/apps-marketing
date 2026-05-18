import { GoogleGenAI } from '@google/genai';

type LeadAction = 'create' | 'update' | 'none';

type GeminiPublicChatReply = {
  replyText: string;
  summary: string;
  leadAction: LeadAction;
};

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

export function getGeminiPublicChatConfig() {
  return {
    enabled: (process.env.ENABLE_GEMINI_PUBLIC_CHAT ?? 'false').trim().toLowerCase() === 'true',
    apiKey: (process.env.GEMINI_API_KEY ?? '').trim(),
    model: (process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL).trim(),
  };
}

function parseGeminiJson(raw: string): GeminiPublicChatReply {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned) as Partial<GeminiPublicChatReply>;

  if (!parsed.replyText || typeof parsed.replyText !== 'string') {
    throw new Error('gemini_invalid_reply_shape');
  }

  const leadAction: LeadAction =
    parsed.leadAction === 'create' || parsed.leadAction === 'update' || parsed.leadAction === 'none'
      ? parsed.leadAction
      : 'none';

  return {
    replyText: parsed.replyText.trim(),
    summary: `${parsed.summary ?? ''}`.trim(),
    leadAction,
  };
}

export async function generateGeminiPublicChatReply(input: { prompt: string }): Promise<GeminiPublicChatReply> {
  const config = getGeminiPublicChatConfig();

  if (!config.enabled) throw new Error('gemini_public_chat_disabled');
  if (!config.apiKey) throw new Error('gemini_api_key_missing');

  const client = new GoogleGenAI({ apiKey: config.apiKey });

  const result = await client.models.generateContent({
    model: config.model,
    contents: [{ role: 'user', parts: [{ text: input.prompt }] }],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.6,
    },
  });

  const text = result.text?.trim();
  if (!text) throw new Error('gemini_empty_response');

  return parseGeminiJson(text);
}
