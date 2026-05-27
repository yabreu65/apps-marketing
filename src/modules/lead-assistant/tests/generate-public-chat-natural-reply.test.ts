import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/lead-assistant/ai/ollama-client', () => ({
  generateWithOllama: vi.fn(),
}));

import { generateWithOllama } from '@/modules/lead-assistant/ai/ollama-client';
import { generatePublicChatNaturalReply } from '@/modules/lead-assistant/ai/generate-public-chat-natural-reply';
import type { PublicChatDecision } from '@/modules/lead-assistant/types/lead-assistant';

const mockedGenerateWithOllama = vi.mocked(generateWithOllama);

const decision: PublicChatDecision = {
  intent: 'not_sure',
  userMessage: 'vendo ropa',
  conversationSummary: 'sin memoria previa',
  detectedContext: {
    channels: [],
    painPoints: [],
    goals: [],
  },
  recommendedPath: 'diagnostico inicial para definir primer paso',
  nextQuestion: 'Hoy vendes por instagram o whatsapp?',
  commercialGoal: 'Guide initial diagnosis to choose a realistic first path.',
  cta: [],
  constraints: ['No prometer ventas garantizadas.'],
};

const baseReply = {
  text: 'Perfecto. Cuéntame por donde vendes hoy para orientarte mejor.',
  intent: 'not_sure' as const,
  rationale: 'rationale',
  source: 'rules' as const,
  ctas: [],
};

describe('generatePublicChatNaturalReply', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('uses ollama text when response is valid', async () => {
    mockedGenerateWithOllama.mockResolvedValueOnce(
      'Perfecto. Si vendes ropa, podemos ordenar primero captacion y seguimiento. Para orientarte bien, hoy vendes mas por Instagram o por WhatsApp?',
    );

    const result = await generatePublicChatNaturalReply({ decision, baseReply });

    expect(result.source).toBe('ollama');
    expect(result.reply.source).toBe('ollama');
    expect(result.reply.text.toLowerCase()).toContain('instagram');
  });

  it('falls back when ollama fails', async () => {
    mockedGenerateWithOllama.mockRejectedValueOnce(new Error('failed'));

    const result = await generatePublicChatNaturalReply({ decision, baseReply });

    expect(result.source).toBe('rules_fallback');
    expect(result.reply.text).toBe(baseReply.text);
  });

  it('falls back when ollama returns empty text', async () => {
    mockedGenerateWithOllama.mockResolvedValueOnce('   ');

    const result = await generatePublicChatNaturalReply({ decision, baseReply });

    expect(result.source).toBe('rules_fallback');
  });

  it('falls back when ollama returns forbidden claims', async () => {
    mockedGenerateWithOllama.mockResolvedValueOnce(
      'Te garantizamos ventas. Escribime y lo conectamos con WhatsApp Cloud API hoy mismo?',
    );

    const result = await generatePublicChatNaturalReply({ decision, baseReply });

    expect(result.source).toBe('rules_fallback');
  });
});
