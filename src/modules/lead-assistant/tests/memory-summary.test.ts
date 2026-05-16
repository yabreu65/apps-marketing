import { describe, expect, it } from 'vitest';

import {
  buildPublicAssistantMemorySummary,
  describePreviousMemory,
} from '@/modules/lead-assistant/core/memory-summary';

describe('memory-summary', () => {
  it('agrega intención actual y mantiene resumen', () => {
    const memory = buildPublicAssistantMemorySummary(
      null,
      [
        {
          id: 'msg-1',
          role: 'visitor',
          content: 'Necesito un dashboard para priorizar leads',
          createdAt: new Date().toISOString(),
        },
      ],
      'dashboard',
    );

    expect(memory.interests).toContain('dashboard');
    expect(memory.summary.toLowerCase()).toContain('dashboard interno');
  });

  it('describe memoria previa para continuidad', () => {
    const line = describePreviousMemory({
      summary: 'Interés principal: mvp_saas',
      interests: ['mvp_saas'],
      lastTopic: 'mvp_saas',
      updatedAt: new Date().toISOString(),
    });

    expect(line).toContain('mvp saas');
  });
});
