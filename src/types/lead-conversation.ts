export const LEAD_CONVERSATION_DIRECTIONS = ['inbound', 'outbound'] as const;
export const LEAD_CONVERSATION_CHANNELS = ['whatsapp_simulated'] as const;

export type LeadConversationDirection = (typeof LEAD_CONVERSATION_DIRECTIONS)[number];
export type LeadConversationChannel = (typeof LEAD_CONVERSATION_CHANNELS)[number];

export type LeadConversationMessage = {
  id: string;
  leadId: string;
  channel: LeadConversationChannel;
  direction: LeadConversationDirection;
  content: string;
  createdAt: string;
};

export type LeadConversationCreatePayload = {
  direction: LeadConversationDirection;
  content: string;
  channel?: LeadConversationChannel;
};

export type LeadConversationValidationError = {
  field: keyof LeadConversationCreatePayload;
  message: string;
};
