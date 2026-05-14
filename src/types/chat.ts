export type ChatRole = 'assistant' | 'user';

export type ChatIntent =
  | 'landing'
  | 'web'
  | 'system'
  | 'saas'
  | 'automation_ai'
  | 'seo_marketing'
  | 'pricing'
  | 'human'
  | 'unknown';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

export type QuickReply = {
  id: string;
  label: string;
  intentHint: ChatIntent;
};
