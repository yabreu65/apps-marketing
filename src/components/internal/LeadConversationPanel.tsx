'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { formatDateTime } from '@/lib/format';
import type { LeadConversationDirection, LeadConversationMessage } from '@/types/lead-conversation';
import type { LeadReplySuggestion } from '@/types/lead-reply-suggestion';

type LeadConversationPanelProps = {
  leadId: string;
  messages: Array<Omit<LeadConversationMessage, 'createdAt'> & { createdAt: string | Date }>;
};

type ConversationApiResponse = {
  ok: boolean;
  message?: string;
  conversationMessage?: LeadConversationMessage;
  errors?: Array<{ field: string; message: string }>;
};

type SuggestionApiResponse = {
  ok: boolean;
  message?: string;
  suggestion?: LeadReplySuggestion;
};

function getDirectionLabel(direction: LeadConversationDirection) {
  return direction === 'inbound' ? 'Entrante' : 'Respuesta manual';
}

function getDirectionTone(direction: LeadConversationDirection) {
  return direction === 'inbound'
    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
    : 'border-violet-500/30 bg-violet-500/10 text-violet-100';
}

function normalizeMessages(messages: LeadConversationPanelProps['messages']): LeadConversationMessage[] {
  return messages.map((item) => ({
    ...item,
    createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
  }));
}

export function LeadConversationPanel({ leadId, messages }: LeadConversationPanelProps) {
  const router = useRouter();
  const [direction, setDirection] = useState<LeadConversationDirection>('inbound');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [messageList, setMessageList] = useState<LeadConversationMessage[]>(() => normalizeMessages(messages));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<LeadReplySuggestion | null>(null);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const nearLimit = content.length > 900;

  const actionLabel = useMemo(() => {
    if (isSubmitting || isPending) return 'Guardando...';
    return direction === 'inbound' ? 'Registrar mensaje entrante' : 'Registrar respuesta manual';
  }, [direction, isPending, isSubmitting]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setCopyFeedback(null);

    const normalizedContent = content.trim();

    if (!normalizedContent) {
      setError('El contenido del mensaje es obligatorio.');
      return;
    }

    if (normalizedContent.length < 2) {
      setError('El mensaje debe tener al menos 2 caracteres.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction, content: normalizedContent, channel: 'whatsapp_simulated' }),
      });

      const data = (await response.json().catch(() => null)) as ConversationApiResponse | null;

      if (!response.ok || !data?.ok || !data.conversationMessage) {
        if (data?.errors?.length) {
          setError(data.errors[0]?.message ?? 'No se pudo guardar el mensaje simulado.');
        } else {
          setError(data?.message ?? 'No se pudo guardar el mensaje simulado.');
        }
        return;
      }

      setContent('');
      setSuccess(data.message ?? 'Mensaje simulado guardado correctamente.');
      setMessageList((current) => [data.conversationMessage!, ...current]);

      startTransition(() => {
        router.refresh();
      });
    } catch {
      setError('No se pudo guardar el mensaje simulado.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSuggestReply() {
    setSuggestionError(null);
    setCopyFeedback(null);
    setSuccess(null);

    setIsSuggesting(true);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}/conversation/suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = (await response.json().catch(() => null)) as SuggestionApiResponse | null;

      if (!response.ok || !data?.ok || !data.suggestion) {
        setSuggestionError(data?.message ?? 'No se pudo generar una sugerencia local.');
        return;
      }

      setSuggestion(data.suggestion);
      setSuccess(data.message ?? 'Sugerencia local generada.');
    } catch {
      setSuggestionError('No se pudo generar una sugerencia local.');
    } finally {
      setIsSuggesting(false);
    }
  }

  function handleUseSuggestion() {
    if (!suggestion) return;
    setDirection('outbound');
    setContent(suggestion.suggestedReply);
    setSuggestionError(null);
    setCopyFeedback('Sugerencia cargada en el textarea.');
  }

  async function handleCopySuggestion() {
    if (!suggestion) return;

    try {
      await navigator.clipboard.writeText(suggestion.suggestedReply);
      setCopyFeedback('Sugerencia copiada al portapapeles.');
      setSuggestionError(null);
    } catch {
      setSuggestionError('No se pudo copiar la sugerencia en este navegador.');
    }
  }

  function getSuggestionSourceLabel(source: LeadReplySuggestion['source']) {
    if (source === 'ollama') return 'IA local (Ollama)';
    if (source === 'rules_fallback') return 'Reglas locales (fallback)';
    return 'Reglas locales';
  }

  const disablePrimaryActions = isSubmitting || isSuggesting || isPending;

  return (
    <section className="space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-100">Conversación simulada</h2>
        <p className="text-sm text-slate-300">
          Simulador local. No envía mensajes reales por WhatsApp.
        </p>
        <p className="text-xs text-slate-400">
          Canal: <span className="font-medium text-slate-300">whatsapp_simulated</span> · Sin Meta API ni integraciones externas.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSuggestReply}
          disabled={disablePrimaryActions}
          className="rounded-full border border-sky-500/40 bg-sky-500/15 px-3.5 py-1.5 text-xs font-medium text-sky-100 hover:bg-sky-500/25 disabled:opacity-60"
        >
          {isSuggesting ? 'Generando sugerencia...' : 'Sugerir respuesta local'}
        </button>
      </div>

      {suggestion ? (
        <article className="space-y-3 rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-sky-100">Sugerencia de respuesta</p>
            <span className="inline-flex rounded-full border border-sky-400/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-medium text-sky-100">
              {getSuggestionSourceLabel(suggestion.source)}
            </span>
          </div>

          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-100">{suggestion.suggestedReply}</p>

          <p className="text-xs text-sky-100/90">Motivo: {suggestion.rationale}</p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleUseSuggestion}
              disabled={disablePrimaryActions}
              className="rounded-lg border border-violet-500/40 bg-violet-500/20 px-3 py-1.5 text-xs font-medium text-violet-100 hover:bg-violet-500/30 disabled:opacity-60"
            >
              Usar sugerencia
            </button>
            <button
              type="button"
              onClick={handleCopySuggestion}
              disabled={disablePrimaryActions}
              className="rounded-lg border border-slate-500/40 bg-slate-500/20 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-500/30 disabled:opacity-60"
            >
              Copiar sugerencia
            </button>
          </div>
        </article>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-3">
        <fieldset className="flex flex-wrap gap-2" aria-label="Dirección del mensaje">
          <button
            type="button"
            onClick={() => setDirection('inbound')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              direction === 'inbound'
                ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-100'
                : 'border-slate-600 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
            }`}
            disabled={disablePrimaryActions}
          >
            Mensaje entrante
          </button>
          <button
            type="button"
            onClick={() => setDirection('outbound')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              direction === 'outbound'
                ? 'border-violet-500/40 bg-violet-500/20 text-violet-100'
                : 'border-slate-600 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
            }`}
            disabled={disablePrimaryActions}
          >
            Respuesta manual
          </button>
        </fieldset>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={3}
          maxLength={1000}
          placeholder={
            direction === 'inbound'
              ? 'Ej: Hola, quiero saber costo y tiempos para una landing comercial.'
              : 'Ej: ¡Gracias por escribir! Te comparto próximos pasos para avanzar.'
          }
          className="w-full resize-y rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
          disabled={disablePrimaryActions}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`text-xs ${nearLimit ? 'text-amber-300' : 'text-slate-400'}`}>{content.length}/1000</p>
          <button
            type="submit"
            disabled={disablePrimaryActions}
            className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30 disabled:opacity-60"
          >
            {actionLabel}
          </button>
        </div>
      </form>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {suggestionError ? <p className="text-sm text-rose-300">{suggestionError}</p> : null}
      {success ? <p className="text-sm text-emerald-300">{success}</p> : null}
      {copyFeedback ? <p className="text-sm text-sky-200">{copyFeedback}</p> : null}

      <div className="space-y-3">
        {messageList.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border-strong-alt)] bg-[var(--bg-secondary)] p-3 text-sm text-slate-300">
            Aún no hay mensajes simulados para este lead.
          </p>
        ) : (
          messageList.map((message) => (
            <div key={message.id} className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
              <article className="w-full max-w-[42rem] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3 text-sm text-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getDirectionTone(message.direction)}`}>
                    {getDirectionLabel(message.direction)}
                  </span>
                  <p className="text-xs text-slate-400">{formatDateTime(message.createdAt)}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-slate-200">{message.content}</p>
                <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">canal: {message.channel}</p>
              </article>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-slate-500">
        Simulación local para preparación comercial. No modifica automáticamente estado ni dispara acciones externas.
      </p>
    </section>
  );
}
