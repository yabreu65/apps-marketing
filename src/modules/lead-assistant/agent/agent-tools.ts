import { prisma } from '@/lib/prisma';
import type { PublicAssistantIntent, PublicAssistantMemoryFacts } from '@/modules/lead-assistant/types/lead-assistant';

const BLOCKED_PATTERNS = [/openai/i, /claude/i, /whatsapp cloud api/i, /ventas garantizadas/i, /garantizamos ventas/i];

export function validateAgentReplyText(text: string) {
  const normalized = text.trim();
  if (normalized.length < 30 || normalized.length > 1500) return false;
  if (BLOCKED_PATTERNS.some((pattern) => pattern.test(normalized))) return false;

  const questionMatches = normalized.match(/\?/g) ?? [];
  if (questionMatches.length > 1) return false;

  return true;
}

function mapIntentToService(intent: PublicAssistantIntent) {
  const byIntent: Partial<Record<PublicAssistantIntent, string>> = {
    landing: 'Landing comercial',
    web_professional: 'Sitio web profesional',
    dashboard: 'Dashboard / panel interno',
    mvp_saas: 'MVP SaaS',
    ai_automation: 'IA aplicada al negocio',
    seo_marketing: 'SEO / marketing digital',
    lead_followup_priority: 'Dashboard / panel interno',
    pricing: 'No estoy seguro (quiero orientación)',
    not_sure: 'No estoy seguro (quiero orientación)',
    human_help: 'No estoy seguro (quiero orientación)',
  };

  return byIntent[intent] ?? 'No estoy seguro (quiero orientación)';
}

function buildLeadMessage(visitorKey: string, summary: string) {
  const base = summary || 'Lead detectado por chat público con contexto parcial.';
  return `[visitor:${visitorKey}] ${base}`.slice(0, 1000);
}

export async function upsertLeadFromChat(params: {
  visitorKey: string;
  intent: PublicAssistantIntent;
  memoryFacts?: PublicAssistantMemoryFacts;
  summary: string;
  leadAction: 'create' | 'update' | 'none';
}) {
  if (params.leadAction === 'none') return;

  const visitorTag = `[visitor:${params.visitorKey}]`;
  const existing = await prisma.lead.findFirst({
    where: {
      source: 'chat',
      message: { startsWith: visitorTag },
    },
    orderBy: { updatedAt: 'desc' },
    select: { id: true },
  });

  const payload = {
    businessType: params.memoryFacts?.businessType ?? null,
    serviceInterest: mapIntentToService(params.intent),
    message: buildLeadMessage(params.visitorKey, params.summary),
    source: 'chat',
  };

  if (existing) {
    await prisma.lead.update({
      where: { id: existing.id },
      data: payload,
      select: { id: true },
    });
    return;
  }

  if (params.leadAction === 'update') {
    return;
  }

  await prisma.lead.create({
    data: {
      name: `Visitante ${params.visitorKey.slice(0, 8)}`,
      email: null,
      phone: null,
      ...payload,
      status: 'new',
    },
    select: { id: true },
  });
}
