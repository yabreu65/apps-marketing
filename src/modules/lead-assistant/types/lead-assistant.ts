export const PUBLIC_ASSISTANT_INTENTS = [
  'landing',
  'web_professional',
  'dashboard',
  'mvp_saas',
  'ai_automation',
  'seo_marketing',
  'lead_followup_priority',
  'pricing',
  'not_sure',
  'human_help',
] as const;

export type PublicAssistantIntent = (typeof PUBLIC_ASSISTANT_INTENTS)[number];

export type PublicAssistantRole = 'assistant' | 'visitor';

export type PublicAssistantMessage = {
  id: string;
  role: PublicAssistantRole;
  content: string;
  intent?: PublicAssistantIntent;
  createdAt: string;
};

export type PublicAssistantMemory = {
  summary: string;
  interests: PublicAssistantIntent[];
  lastTopic: string;
  updatedAt: string;
};

export type PublicAssistantState = {
  visitorKey: string;
  messages: PublicAssistantMessage[];
  memory: PublicAssistantMemory | null;
};

export type PublicAssistantSource = 'rules' | 'ollama' | 'rules_fallback';

export type AssistantCta = {
  label: string;
  href: string;
  kind: 'form' | 'whatsapp_manual';
};

export type PublicAssistantReply = {
  text: string;
  intent: PublicAssistantIntent;
  followUpQuestion?: string;
  rationale: string;
  source: PublicAssistantSource;
  ctas: AssistantCta[];
};

export type DetectIntentResult = {
  intent: PublicAssistantIntent;
  confidence: number;
  signals: string[];
};

export type PublicAssistantQuickReply = {
  id: string;
  label: string;
  intentHint: PublicAssistantIntent;
};

export type AppsMarketingAssistantConfig = {
  businessName: string;
  whatsappNumber: string;
  contactFormAnchor: string;
  greeting: string;
  privacyNote: string;
  quickReplies: PublicAssistantQuickReply[];
};

export type PublicAssistantReplyInput = {
  visitorMessage: string;
  detectedIntent: DetectIntentResult;
  memory: PublicAssistantMemory | null;
};

export type PublicChatAIInput = {
  visitorMessage: string;
  detectedIntent: PublicAssistantIntent;
  memorySummary?: string;
};
