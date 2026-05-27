import { buildLeadReplySuggestionByRules } from '@/lib/lead-reply-suggestion';
import type {
  LeadReplySuggestion,
  LeadReplySuggestionInput,
  LeadReplySuggestionSource,
} from '@/types/lead-reply-suggestion';

export type LeadReplySuggestionWithSource = {
  suggestion: LeadReplySuggestion;
  source: LeadReplySuggestionSource;
};

/**
 * Phase 35B: local-model providers removed from runtime.
 * Reply suggestion stays deterministic by local business rules.
 */
export async function buildLeadReplySuggestionWithOptionalAI(
  input: LeadReplySuggestionInput,
): Promise<LeadReplySuggestionWithSource> {
  try {
    const suggestion = buildLeadReplySuggestionByRules(input);
    return {
      suggestion,
      source: 'rules',
    };
  } catch {
    const fallbackSuggestion: LeadReplySuggestion = {
      suggestedReply:
        'Gracias por tu consulta. Para orientarte mejor, comparte objetivo principal, urgencia y tipo de solución que quieres priorizar.',
      rationale: 'Fallback de seguridad por reglas locales cuando ocurre un error no esperado.',
      source: 'rules_fallback',
    };

    return {
      suggestion: fallbackSuggestion,
      source: 'rules_fallback',
    };
  }
}
