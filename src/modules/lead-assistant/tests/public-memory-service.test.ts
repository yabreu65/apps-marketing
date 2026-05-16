import { describe, expect, it } from 'vitest';

import {
  createFallbackState,
  getOrCreateVisitorKey,
} from '@/modules/lead-assistant/server/public-memory-service';

describe('public-memory-service', () => {
  it('retorna visitor_local cuando no hay browser storage', () => {
    const key = getOrCreateVisitorKey();
    expect(key).toBe('visitor_local');
  });

  it('crea estado fallback con greeting inicial', () => {
    const state = createFallbackState('visitor_123', 'Hola de prueba');

    expect(state.visitorKey).toBe('visitor_123');
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].role).toBe('assistant');
    expect(state.messages[0].content).toContain('Hola');
  });
});
