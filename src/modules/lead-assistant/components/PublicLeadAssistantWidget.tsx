'use client';

import { useEffect, useMemo, useState } from 'react';

import { buildWhatsAppLink } from '@/lib/whatsapp';
import { appsMarketingAssistantConfig } from '@/modules/lead-assistant/config/appsMarketingAssistantConfig';
import {
  buildPublicLeadHandoffSummary,
  buildPublicLeadHandoffWhatsAppMessage,
  formatPublicLeadHandoffSummary,
} from '@/modules/lead-assistant/core/handoff-summary';
import {
  clearStoredVisitorKey,
  createFallbackState,
  getOrCreateVisitorKey,
} from '@/modules/lead-assistant/server/public-memory-service';
import type {
  AppsMarketingAssistantConfig,
  PublicAssistantReply,
  PublicAssistantState,
  PublicChatApiResponse,
  PublicMemoryApiResponse,
} from '@/modules/lead-assistant/types/lead-assistant';

export function PublicLeadAssistantWidget() {
  const config = appsMarketingAssistantConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [visitorKey, setVisitorKey] = useState('');
  const [state, setState] = useState<PublicAssistantState | null>(null);
  const [input, setInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastReply, setLastReply] = useState<PublicAssistantReply | null>(null);
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [isHandoffExpanded, setIsHandoffExpanded] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      const key = getOrCreateVisitorKey();
      setVisitorKey(key);

      try {
        const response = await fetch(`/api/public/chat?visitorKey=${encodeURIComponent(key)}`);
        const data = (await response.json().catch(() => null)) as PublicChatApiResponse | null;

        if (!response.ok || !data?.ok || !data.state) {
          setState(createFallbackState(key, config.greeting));
          return;
        }

        setState(data.state);
      } catch {
        setState(createFallbackState(key, config.greeting));
      }
    }

    void bootstrap();
  }, [config.greeting]);

  const quickReplies = config.quickReplies;
  const messages = useMemo(() => state?.messages ?? [], [state]);
  const latestVisitorMessage = useMemo(
    () => messages.find((message) => message.role === 'visitor')?.content ?? null,
    [messages],
  );
  const handoffSummary = useMemo(() => {
    if (!lastReply || !state) return null;

    return buildPublicLeadHandoffSummary({
      intent: lastReply.intent,
      memory: state.memory,
      latestVisitorMessage,
    });
  }, [lastReply, latestVisitorMessage, state]);
  const handoffSummaryText = useMemo(
    () => (handoffSummary ? formatPublicLeadHandoffSummary(handoffSummary) : ''),
    [handoffSummary],
  );
  const handoffWhatsAppHref = useMemo(() => {
    if (!handoffSummary) return null;

    return buildWhatsAppLink(config.whatsappNumber, buildPublicLeadHandoffWhatsAppMessage(handoffSummary));
  }, [config.whatsappNumber, handoffSummary]);
  const hasConversationHistory = useMemo(
    () => messages.filter((message) => message.role === 'visitor').length >= 2,
    [messages],
  );
  const showQuickReplies = !hasConversationHistory;
  const hasPendingHandoffData = Boolean(handoffSummaryText && handoffSummaryText.includes('Dato pendiente'));

  async function handleSend(rawMessage?: string) {
    if (!state) return;

    const content = (rawMessage ?? input).trim();
    if (!content) return;

    setError(null);
    setIsResponding(true);

    try {
      const response = await fetch('/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorKey: state.visitorKey,
          message: content,
        }),
      });

      const data = (await response.json().catch(() => null)) as PublicChatApiResponse | null;

      if (!response.ok || !data?.ok || !data.state || !data.reply) {
        setError(data?.message ?? 'No pude responder en este momento. Probá nuevamente en unos segundos.');
        return;
      }

      setState(data.state);
      setLastReply(data.reply);
      setInput('');
      setIsHandoffExpanded(false);
    } catch {
      setError('No pude responder en este momento. Probá nuevamente en unos segundos.');
    } finally {
      setIsResponding(false);
    }
  }

  async function handleResetMemory() {
    if (!visitorKey) return;

    setError(null);

    try {
      const response = await fetch(`/api/public/chat/memory?visitorKey=${encodeURIComponent(visitorKey)}`, {
        method: 'DELETE',
      });

      const data = (await response.json().catch(() => null)) as PublicMemoryApiResponse | null;

      if (!response.ok || !data?.ok) {
        setError(data?.message ?? 'No se pudo borrar la memoria en este momento.');
        return;
      }

      clearStoredVisitorKey();
      const nextVisitorKey = getOrCreateVisitorKey();
      setVisitorKey(nextVisitorKey);
      const fallback = createFallbackState(nextVisitorKey, config.greeting);
      setState(fallback);
      setLastReply(null);
      setIsHandoffExpanded(false);
    } catch {
      setError('No se pudo borrar la memoria en este momento.');
    }
  }

  async function handleCopySummary() {
    if (!handoffSummaryText) return;

    try {
      await navigator.clipboard.writeText(handoffSummaryText);
      setIsCopySuccess(true);
      setTimeout(() => setIsCopySuccess(false), 2200);
    } catch {
      setError('No pude copiar el resumen. Probá nuevamente.');
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-1rem)] max-w-[420px] sm:w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          id="public-lead-assistant-widget"
          aria-label="Asistente comercial público"
          className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-2xl border border-[#26324A] bg-[#0F172A] shadow-2xl sm:max-h-[82vh]"
        >
          <header className="flex items-center justify-between border-b border-[#26324A] bg-[#0f172a] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#FFFBF5]">Asistente comercial</p>
              <p className="text-xs text-[#94A3B8]">Te orienta antes de contactar</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-[#26324A] px-2 py-1 text-xs text-[#CBD5E1] hover:bg-[#1E293B]"
              aria-label="Cerrar chat"
            >
              Cerrar
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <p
                  className={`max-w-[88%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'assistant'
                      ? 'bg-[#111827] text-[#E2E8F0]'
                      : 'bg-[#F97316] text-[#FFFBF5]'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {isResponding ? <p className="text-xs text-[#A78BFA]">Analizando contexto y preparando respuesta...</p> : null}
          </div>

          <div className="border-t border-[#26324A] bg-[#0f172a] px-4 py-3">
            {showQuickReplies ? (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => {
                      void handleSend(reply.label);
                    }}
                    className="rounded-full border border-[#7C3AED]/35 bg-[#7C3AED]/10 px-2.5 py-1 text-[11px] text-[#C4B5FD] hover:bg-[#7C3AED]/20"
                    disabled={isResponding || !state}
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            ) : null}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void handleSend();
              }}
              className="space-y-2"
            >
              <label htmlFor="public-assistant-input" className="sr-only">
                Escribí tu consulta
              </label>
              <div className="flex gap-2">
                <input
                  id="public-assistant-input"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Contame tu objetivo comercial..."
                  className="w-full rounded-md border border-[#26324A] bg-[#0B1020] px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                  disabled={isResponding || !state}
                />
                <button
                  type="submit"
                  className="rounded-md bg-[#F97316] px-3 py-2 text-sm font-medium text-[#FFFBF5] hover:bg-[#EA580C] disabled:opacity-70"
                  disabled={isResponding || !state}
                >
                  Enviar
                </button>
              </div>
            </form>

            {lastReply ? (
              <div className="mt-3 rounded-lg bg-[#101827] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Siguiente paso sugerido</p>
                <p className="mt-1 text-xs text-slate-200">{lastReply.followUpQuestion}</p>
                {handoffSummary ? (
                  <div className="mt-3 rounded-md border border-[#334155]/80 bg-[#0b1220] p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#a78bfa]">Resumen para contacto</p>
                      <button
                        type="button"
                        onClick={() => setIsHandoffExpanded((previous) => !previous)}
                        className="text-[10px] font-medium text-slate-300 hover:text-white"
                      >
                        {isHandoffExpanded ? 'Ocultar' : 'Ver resumen'}
                      </button>
                    </div>

                    {isHandoffExpanded ? (
                      <>
                        <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-slate-200">
                          <li>
                            <span className="text-slate-400">Tipo de proyecto:</span> {handoffSummary.projectType}
                          </li>
                          <li>
                            <span className="text-slate-400">Objetivo/problema:</span> {handoffSummary.mainGoalOrProblem}
                          </li>
                          <li>
                            <span className="text-slate-400">Servicio probable:</span> {handoffSummary.probableService}
                          </li>
                          <li>
                            <span className="text-slate-400">Urgencia:</span> {handoffSummary.urgencyLevel}
                          </li>
                          <li>
                            <span className="text-slate-400">Siguiente paso:</span> {handoffSummary.nextRecommendedStep}
                          </li>
                        </ul>

                        {hasPendingHandoffData ? (
                          <p className="mt-2 text-[10px] text-amber-200">Faltan algunos datos para completar el resumen.</p>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {handoffWhatsAppHref ? (
                    <a
                      href={handoffWhatsAppHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-[#F97316] px-2.5 py-2 text-center text-xs font-semibold text-[#FFFBF5] hover:bg-[#EA580C]"
                    >
                      Enviar por WhatsApp manual
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      void handleCopySummary();
                    }}
                    className="rounded-md border border-[#7C3AED]/50 px-2.5 py-2 text-xs font-semibold text-[#DDD6FE] hover:bg-[#7C3AED]/15"
                  >
                    Copiar resumen
                  </button>
                  <a
                    href={config.contactFormAnchor}
                    className="rounded-md border border-[#334155] px-2.5 py-2 text-center text-xs font-medium text-slate-200 hover:bg-slate-700/20 sm:col-span-2"
                  >
                    Completar formulario
                  </a>
                </div>
                <p className="mt-2 text-[10px] text-slate-400">
                  Contacto manual: este enlace solo abre WhatsApp con el resumen precargado.
                </p>
                {isCopySuccess ? <p className="mt-1 text-[10px] text-emerald-300">Resumen copiado.</p> : null}
              </div>
            ) : null}

            {error ? <p className="mt-3 text-xs text-rose-300">{error}</p> : null}

            <p className="mt-3 text-xs text-[#94A3B8]">{config.privacyNote}</p>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[11px] text-slate-500">visitante: {visitorKey.slice(0, 8)}</p>
              <button
                type="button"
                onClick={() => {
                  void handleResetMemory();
                }}
                className="rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-700/20"
              >
                Borrar memoria
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="rounded-full bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-[#FFFBF5] shadow-[0_12px_30px_rgba(124,58,237,0.35)] hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
          aria-expanded={isOpen}
          aria-controls="public-lead-assistant-widget"
        >
          {isOpen ? 'Ocultar asistente' : 'Abrir asistente'}
        </button>
      </div>
    </div>
  );
}
