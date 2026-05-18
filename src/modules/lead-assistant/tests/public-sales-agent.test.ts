import { beforeEach, describe, expect, it, vi } from 'vitest';

const generateGeminiPublicChatReplyMock = vi.hoisted(() => vi.fn());
const validateAgentReplyTextMock = vi.hoisted(() => vi.fn(() => true));

vi.mock('@/modules/lead-assistant/agent/knowledge-loader', () => ({
  loadSalesKnowledge: vi.fn(async () => '# conocimiento comercial'),
}));

vi.mock('@/lib/ai/gemini-public-chat-provider', () => ({
  getGeminiPublicChatConfig: vi.fn(() => ({
    enabled: true,
    apiKey: 'x',
    model: 'gemini-2.5-flash',
  })),
  generateGeminiPublicChatReply: generateGeminiPublicChatReplyMock,
}));

vi.mock('@/modules/lead-assistant/agent/agent-tools', () => ({
  validateAgentReplyText: validateAgentReplyTextMock,
  upsertLeadFromChat: vi.fn(async () => undefined),
}));

import { resolvePublicSalesAgentReply } from '@/modules/lead-assistant/agent/public-sales-agent';
import { buildTechnicalAIErrorReply } from '@/modules/lead-assistant/core/technical-error-reply';

const baseInput = {
  visitorKey: 'visitor-123',
  message: 'vendo ropa',
  memory: null,
  messages: [],
  decision: {
    intent: 'landing' as const,
    userMessage: 'vendo ropa',
    conversationSummary: 'sin memoria',
    detectedContext: { channels: [], painPoints: [], goals: [] },
    recommendedPath: 'landing comercial',
    nextQuestion: '¿Cómo vendés hoy?',
    commercialGoal: 'captación',
    cta: [],
    constraints: [],
  },
  baseReply: {
    text: 'fallback-local-no-visible',
    intent: 'landing' as const,
    rationale: 'rationale',
    source: 'rules' as const,
    ctas: [],
  },
};

describe('public-sales-agent gemini-only', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ENABLE_GEMINI_PUBLIC_CHAT = 'true';
    process.env.LEAD_AGENT_FALLBACK_ENABLED = 'true';
  });

  it('Caso A: vende ropa, respuesta final viene solo de Gemini', async () => {
    generateGeminiPublicChatReplyMock.mockResolvedValueOnce({
      replyText:
        'Si vendés ropa, te conviene una web catálogo o landing con fotos, talles y acceso rápido a WhatsApp/Instagram para captar consultas mejor. ¿Hoy vendés más por Instagram o WhatsApp?',
      summary: 'Ropa retail con foco en captación',
      leadAction: 'update',
    });

    const result = await resolvePublicSalesAgentReply(baseInput);

    expect(result.reply.source).toBe('gemini');
    expect(result.reply.text.toLowerCase()).toContain('ropa');
    expect(result.reply.text.toLowerCase()).toContain('catálogo');
    expect(result.reply.text).not.toContain('fallback-local-no-visible');
  });

  it('Caso B: vende zapatos, no concatena fallback y menciona zapatos', async () => {
    generateGeminiPublicChatReplyMock.mockResolvedValueOnce({
      replyText:
        'Para vender zapatos, te recomiendo una landing catálogo con modelos y talles destacados, más CTA directo a WhatsApp para consultas. ¿Querés priorizar catálogo rápido o venta online por fases?',
      summary: 'Zapatos con necesidad de catálogo',
      leadAction: 'update',
    });

    const result = await resolvePublicSalesAgentReply({ ...baseInput, message: 'vendo zapatos' });

    expect(result.reply.text.toLowerCase()).toContain('zapatos');
    expect(result.reply.text.toLowerCase()).not.toContain('prendas');
    expect(result.reply.text).not.toContain('fallback-local-no-visible');
  });

  it('Caso C: farmacia sin web recomienda landing local/web simple', async () => {
    generateGeminiPublicChatReplyMock.mockResolvedValueOnce({
      replyText:
        'Para una farmacia sin página, conviene arrancar con una web profesional simple o landing local con ubicación, horarios, servicios y botón a WhatsApp para generar confianza. ¿Ya tenés definidos tus horarios y servicios principales?',
      summary: 'Farmacia sin web',
      leadAction: 'update',
    });

    const result = await resolvePublicSalesAgentReply({
      ...baseInput,
      message: 'tengo una farmacia y no tengo pagina web que me recomiendas',
    });

    const text = result.reply.text.toLowerCase();
    expect(text).toContain('farmacia');
    expect(text).toMatch(/web|landing/);
    expect(text).toMatch(/ubicación|horarios|whatsapp|servicios|confianza/);
  });

  it('Caso D: memoria ropa+instagram no repregunta canal', async () => {
    generateGeminiPublicChatReplyMock.mockResolvedValueOnce({
      replyText:
        'Con ropa en Instagram, te conviene una landing enfocada en conversión con productos destacados, oferta clara y CTA directo para consultas. ¿Querés que prioricemos fotos clave, propuesta y CTA en una primera versión?',
      summary: 'captación sobre base conocida',
      leadAction: 'update',
    });

    const result = await resolvePublicSalesAgentReply({
      ...baseInput,
      message: 'captar consultas',
      memory: {
        summary: 'Negocio: retail / venta de productos | Canales: Instagram',
        interests: ['landing'],
        lastTopic: 'landing',
        updatedAt: new Date().toISOString(),
        facts: { channels: ['Instagram'], painPoints: [], goals: ['captar consultas'], businessType: 'retail / venta de productos' },
      },
    });

    const text = result.reply.text.toLowerCase();
    expect(text).toContain('landing');
    expect(text).toContain('conversión');
    expect(text).not.toContain('instagram o whatsapp');
  });

  it('Caso E: cómo publicar responde implementación (hosting/dominio/vercel/seo)', async () => {
    generateGeminiPublicChatReplyMock.mockResolvedValueOnce({
      replyText:
        'Para publicarla, primero definimos dominio, luego deploy en Vercel, configuración de hosting y SEO básico, y finalmente conexión de CTA a WhatsApp/Instagram. ¿Ya tenés dominio comprado?',
      summary: 'Consulta de publicación técnica',
      leadAction: 'none',
    });

    const result = await resolvePublicSalesAgentReply({
      ...baseInput,
      message: 'perfecto, entonces me recomiendas una landing page, y como la publico',
    });

    const text = result.reply.text.toLowerCase();
    expect(text).toContain('dominio');
    expect(text).toContain('vercel');
    expect(text).toContain('seo');
  });

  it('Caso F: nunca concatena fallbackText con aiReply.replyText', async () => {
    generateGeminiPublicChatReplyMock.mockResolvedValueOnce({
      replyText: 'Respuesta AI única y final. ¿Querés que te proponga estructura de secciones?',
      summary: 'ok',
      leadAction: 'none',
    });

    const result = await resolvePublicSalesAgentReply(baseInput);

    expect(result.reply.text).toBe('Respuesta AI única y final. ¿Querés que te proponga estructura de secciones?');
    expect(result.reply.text).not.toContain(baseInput.baseReply.text);
  });

  it('fallback técnico mínimo si falla Gemini', async () => {
    generateGeminiPublicChatReplyMock.mockRejectedValueOnce(new Error('network'));

    const result = await resolvePublicSalesAgentReply(baseInput);

    expect(result.reply.source).toBe('rules_fallback');
    expect(result.reply.text).toBe(buildTechnicalAIErrorReply());
  });
});
