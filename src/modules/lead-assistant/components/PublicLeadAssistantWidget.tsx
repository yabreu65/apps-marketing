'use client';

import { useEffect, useMemo, useState } from 'react';

import { appsMarketingAssistantConfig } from '@/modules/lead-assistant/config/appsMarketingAssistantConfig';
import {
  clearPublicAssistantMemory,
  getOrCreateVisitorKey,
  loadPublicAssistantState,
  savePublicAssistantState,
} from '@/modules/lead-assistant/server/public-memory-service';
import { processPublicAssistantMessage } from '@/modules/lead-assistant/server/public-chat-service';
import type {
  AppsMarketingAssistantConfig,
  PublicAssistantMessage,
  PublicAssistantReply,
  PublicAssistantState,
} from '@/modules/lead-assistant/types/lead-assistant';

function createGreetingMessage(config: AppsMarketingAssistantConfig): PublicAssistantMessage {
  return {
    id: 'assistant-greeting',
    role: 'assistant',
    content: config.greeting,
    createdAt: new Date().toISOString(),
    intent: 'not_sure',
  };
}

function buildInitialState(visitorKey: string, config: AppsMarketingAssistantConfig): PublicAssistantState {
  return {
    visitorKey,
    messages: [createGreetingMessage(config)],
    memory: null,
  };
}

export function PublicLeadAssistantWidget() {
  const config = appsMarketingAssistantConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [visitorKey, setVisitorKey] = useState('');
  const [state, setState] = useState<PublicAssistantState | null>(null);
  const [input, setInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastReply, setLastReply] = useState<PublicAssistantReply | null>(null);

  useEffect(() => {
    const key = getOrCreateVisitorKey();
    const existingState = loadPublicAssistantState(key);

    setVisitorKey(key);

    if (existingState) {
      setState(existingState);
      return;
    }

    const initialState = buildInitialState(key, config);
    savePublicAssistantState(initialState);
    setState(initialState);
  }, [config]);

  const quickReplies = config.quickReplies;

  const messages = useMemo(() => state?.messages ?? [], [state]);

  async function handleSend(rawMessage?: string) {
    if (!state) return;

    const content = (rawMessage ?? input).trim();
    if (!content) return;

    setError(null);
    setIsResponding(true);

    try {
      const { nextState, reply } = await processPublicAssistantMessage({
        visitorInput: content,
        state,
        config,
      });

      setState(nextState);
      savePublicAssistantState(nextState);
      setLastReply(reply);
      setInput('');
    } catch {
      setError('No pude responder en este momento. Probá nuevamente en unos segundos.');
    } finally {
      setIsResponding(false);
    }
  }

  function handleResetMemory() {
    if (!visitorKey) return;

    clearPublicAssistantMemory(visitorKey);
    const resetState = buildInitialState(visitorKey, config);
    savePublicAssistantState(resetState);
    setState(resetState);
    setLastReply(null);
    setError(null);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          id="public-lead-assistant-widget"
          aria-label="Asistente comercial público"
          className="w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-[#26324A] bg-[#0F172A] shadow-[0_18px_45px_rgba(2,6,23,0.55)]"
        >
          <header className="flex items-center justify-between border-b border-[#26324A] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#FFFBF5]">Asistente comercial</p>
              <p className="text-xs text-[#94A3B8]">Local-first · sin WhatsApp automático</p>
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

          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <p
                  className={`max-w-[88%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'assistant'
                      ? 'border border-[#26324A] bg-[#111827] text-[#E2E8F0]'
                      : 'bg-[#F97316] text-[#FFFBF5]'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {isResponding ? <p className="text-xs text-[#A78BFA]">Analizando contexto y preparando respuesta...</p> : null}
          </div>

          <div className="border-t border-[#26324A] px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  type="button"
                  onClick={() => {
                    void handleSend(reply.label);
                  }}
                  className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-3 py-1 text-xs text-[#C4B5FD] hover:bg-[#7C3AED]/20"
                  disabled={isResponding}
                >
                  {reply.label}
                </button>
              ))}
            </div>

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
                  disabled={isResponding}
                />
                <button
                  type="submit"
                  className="rounded-md bg-[#F97316] px-3 py-2 text-sm font-medium text-[#FFFBF5] hover:bg-[#EA580C] disabled:opacity-70"
                  disabled={isResponding}
                >
                  Enviar
                </button>
              </div>
            </form>

            {lastReply ? (
              <div className="mt-3 rounded-lg border border-[#26324A] bg-[#101827] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Siguiente paso sugerido</p>
                <p className="mt-1 text-xs text-slate-200">{lastReply.followUpQuestion}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lastReply.ctas.map((cta) => (
                    <a
                      key={`${cta.kind}-${cta.href}`}
                      href={cta.href}
                      target={cta.kind === 'whatsapp_manual' ? '_blank' : undefined}
                      rel={cta.kind === 'whatsapp_manual' ? 'noreferrer' : undefined}
                      className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${
                        cta.kind === 'whatsapp_manual'
                          ? 'bg-[#F97316] text-[#FFFBF5] hover:bg-[#EA580C]'
                          : 'border border-[#7C3AED]/50 text-[#CBD5E1] hover:bg-[#7C3AED]/15'
                      }`}
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {error ? <p className="mt-3 text-xs text-rose-300">{error}</p> : null}

            <p className="mt-3 text-xs text-[#94A3B8]">{config.privacyNote}</p>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[11px] text-slate-500">visitante: {visitorKey.slice(0, 8)}</p>
              <button
                type="button"
                onClick={handleResetMemory}
                className="rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-700/20"
              >
                Borrar memoria
              </button>
            </div>
          </div>
        </section>
      ) : null}

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
  );
}
