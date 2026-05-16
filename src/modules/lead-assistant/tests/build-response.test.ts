import { describe, expect, it } from 'vitest';

import { appsMarketingAssistantConfig } from '@/modules/lead-assistant/config/appsMarketingAssistantConfig';
import { buildPublicLeadAssistantResponse } from '@/modules/lead-assistant/core/build-response';

describe('buildPublicLeadAssistantResponse', () => {
  it('para lead_followup_priority prioriza dashboard sobre landing', () => {
    const reply = buildPublicLeadAssistantResponse(
      {
        visitorMessage: 'Pierdo consultas de WhatsApp e Instagram',
        detectedIntent: {
          intent: 'lead_followup_priority',
          confidence: 0.93,
          signals: ['seguimiento'],
        },
        memory: null,
      },
      appsMarketingAssistantConfig,
    );

    expect(reply.text.toLowerCase()).toContain('dashboard');
    expect(reply.text.toLowerCase()).not.toContain('landing nueva');
    expect(reply.ctas).toHaveLength(2);
  });

  it('en pricing no inventa precio fijo', () => {
    const reply = buildPublicLeadAssistantResponse(
      {
        visitorMessage: '¿Cuánto cuesta?',
        detectedIntent: {
          intent: 'pricing',
          confidence: 0.9,
          signals: ['pricing'],
        },
        memory: null,
      },
      appsMarketingAssistantConfig,
    );

    expect(reply.text.toLowerCase()).toContain('depende');
    expect(reply.text).not.toMatch(/\$\d+/);
  });
});
