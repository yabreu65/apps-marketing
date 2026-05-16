'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { formatDateTime } from '@/lib/format';
import type { LeadConversationDirection, LeadConversationMessage } from '@/types/lead-conversation';

type LeadConversationPanelProps = {
  leadId: string;
  messages: Array<Omit<LeadConversationMessage, 'createdAt'> & { createdAt: string | Date }>;
};

type ConversationApiResponse = {
  ok: boolean;
  message?: LeadConversationMessage;
  info?: string;
  errors?: Array<{ field: string; message: string }>;
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
  const [isPending, startTransition] = useTransition();

  const nearLimit = content.length > 900;

  const actionLabel = useMemo(() => {
    if (isPending) return 'Guardando...';
    return direction === 'inbound' ? 'Registrar mensaje entrante' : 'Registrar respuesta manual';
  }, [direction, isPending]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const response = await fetch(`/api/admin/leads/${leadId}/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction, content, channel: 'whatsapp_simulated' }),
    });

    const data = (await response.json().catch(() => null)) as ConversationApiResponse | null;

    if (!response.ok || !data?.ok || !data.message) {
      if (data?.errors?.length) {
        setError(data.errors[0]?.message ?? 'No se pudo guardar el mensaje simulado.');
      } else {
        setError(data?.info ?? 'No se pudo guardar el mensaje simulado.');
      }
      return;
    }

    setContent('');
    setSuccess(data.info ?? 'Mensaje simulado guardado correctamente.');
    setMessageList((current) => [data.message!, ...current]);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-100">Conversación simulada</h2>
        <p className="text-sm text-slate-300">
          Canal local <span className="font-medium text-slate-200">whatsapp_simulated</span>. No envía mensajes reales ni usa Meta.
        </p>
      </div>

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
            disabled={isPending}
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
            disabled={isPending}
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
          disabled={isPending}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`text-xs ${nearLimit ? 'text-amber-300' : 'text-slate-400'}`}>{content.length}/1000</p>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30 disabled:opacity-60"
          >
            {actionLabel}
          </button>
        </div>
      </form>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-300">{success}</p> : null}

      <div className="space-y-3">
        {messageList.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#33415f] bg-[#111827] p-3 text-sm text-slate-300">
            Aún no hay mensajes simulados para este lead.
          </p>
        ) : (
          messageList.map((message) => (
            <article key={message.id} className="rounded-xl border border-[#26324A] bg-[#111827] p-3 text-sm text-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getDirectionTone(message.direction)}`}>
                  {getDirectionLabel(message.direction)}
                </span>
                <p className="text-xs text-slate-400">{formatDateTime(message.createdAt)}</p>
              </div>
              <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-slate-200">{message.content}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">canal: {message.channel}</p>
            </article>
          ))
        )}
      </div>

      <p className="text-xs text-slate-500">
        Simulación local para preparación comercial. No modifica automáticamente estado ni dispara acciones externas.
      </p>
    </section>
  );
}
