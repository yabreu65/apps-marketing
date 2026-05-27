export type LeadReplySuggestionSource = 'rules' | 'gemini' | 'rules_fallback';

export type LeadReplySuggestion = {
  suggestedReply: string;
  source: LeadReplySuggestionSource;
  rationale: string;
};

export type LeadReplySuggestionMessage = {
  direction: 'inbound' | 'outbound';
  content: string;
  createdAt?: string | Date;
};

export type LeadReplySuggestionLeadContext = {
  name?: string | null;
  serviceInterest: string;
  businessType?: string | null;
  message: string;
  source: string;
  status: string;
};

export type LeadReplySuggestionInput = {
  lead: LeadReplySuggestionLeadContext;
  messages: LeadReplySuggestionMessage[];
};
