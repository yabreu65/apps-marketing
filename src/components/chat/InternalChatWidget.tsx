'use client';

import { useMemo, useState } from 'react';

import { intentResponses, initialChatMessage, privacyNote, quickReplies } from '@/data/chat';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { ChatIntent, ChatMessage } from '@/types/chat';

function detectIntent(input: string): ChatIntent {
  const text = input.toLowerCase();

  if (text.includes('cuánto') || text.includes('cuanto') || text.includes('precio') || text.includes('costo')) {
    return 'pricing';
  }
  if (text.includes('persona') || text.includes('humano') || text.includes('asesor') || text.includes('equipo')) {
    return 'human';
  }
  if (text.includes('landing')) return 'landing';
  if (text.includes('paciente') || text.includes('consulta')) return 'landing';
  if (text.includes('seo') || text.includes('marketing')) return 'seo_marketing';
  if (text.includes('web') || text.includes('sitio')) return 'web';
  if (text.includes('sistema') || text.includes('dashboard') || text.includes('panel')) return 'system';
  if (text.includes('saas') || text.includes('mvp')) return 'saas';
  if (text.includes('whatsapp') || text.includes('ia') || text.includes('automat')) return 'automation_ai';

  return 'unknown';
}

export function InternalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialChatMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastIntent, setLastIntent] = useState<ChatIntent>('unknown');

  const whatsappHref = useMemo(() => {
    const messagesByIntent: Record<ChatIntent, string> = {
      landing: 'Hola, usé el chat y quiero orientación para una landing comercial de mi proyecto.',
      web: 'Hola, usé el chat y quiero evaluar una web profesional para mi negocio.',
      system: 'Hola, usé el chat y quiero orientación para un sistema web o dashboard interno.',
      saas: 'Hola, usé el chat y quiero evaluar un MVP SaaS para mi idea.',
      automation_ai: 'Hola, usé el chat y quiero evaluar automatización o IA aplicada para mi negocio.',
      seo_marketing: 'Hola, usé el chat y quiero orientación sobre SEO y marketing digital.',
      pricing: 'Hola, quiero consultar costos y alcance para mi proyecto digital.',
      human: 'Hola, quiero hablar con una persona del equipo sobre mi proyecto digital.',
      unknown: 'Hola, usé el chat de orientación y quiero solicitar un diagnóstico para mi proyecto digital.',
    };

    return buildWhatsAppLink('+54 9 11 0000 0000', messagesByIntent[lastIntent]);
  }, [lastIntent]);

  function appendAssistantResponse(intent: ChatIntent) {
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: intentResponses[intent],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 450);
  }

  function handleUserMessage(rawText: string) {
    const text = rawText.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    const intent = detectIntent(text);
    setLastIntent(intent);
    appendAssistantResponse(intent);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleUserMessage(input);
    setInput('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          id="internal-chat-widget"
          aria-label="Chat de orientación"
          className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-panel)] shadow-[0_18px_45px_rgba(2,6,23,0.55)]"
        >
          <header className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--warm-white)]">Orientación inicial</p>
              <p className="text-xs text-[var(--text-muted)]">Sin bots externos ni integraciones activas</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-[var(--border-subtle)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
              aria-label="Cerrar chat"
            >
              Cerrar
            </button>
          </header>

          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <p
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    message.role === 'assistant'
                      ? 'border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-bright)]'
                      : 'bg-[var(--orange-cta)] text-[var(--warm-white)]'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {isTyping ? <p className="text-xs text-[var(--purple-soft)]">Escribiendo respuesta…</p> : null}
          </div>

          <div className="border-t border-[var(--border-subtle)] px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  type="button"
                  onClick={() => handleUserMessage(reply.label)}
                  className="rounded-full border border-[var(--purple-primary)]/40 bg-[var(--purple-primary)]/10 px-3 py-1 text-xs text-[var(--text-accent)] hover:bg-[var(--purple-primary)]/20"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <label htmlFor="chat-input" className="sr-only">
                Escribí tu consulta
              </label>
              <div className="flex gap-2">
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Contame qué querés construir..."
                  className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-soft)]"
                />
                <button
                  type="submit"
                  className="rounded-md bg-[var(--orange-cta)] px-3 py-2 text-sm font-medium text-[var(--warm-white)] hover:bg-[var(--orange-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--orange-soft)]"
                >
                  Enviar
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs text-[var(--text-muted)]">{privacyNote}</p>

            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Podés continuar por WhatsApp o completar el formulario para que revisemos tu caso.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[var(--orange-cta)] px-3 py-2 text-xs font-semibold text-[var(--warm-white)] hover:bg-[var(--orange-hover)]"
              >
                Solicitar diagnóstico por WhatsApp
              </a>
              <a
                href="#contact-form"
                className="rounded-md border border-[var(--purple-primary)]/50 px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--purple-primary)]/15"
              >
                Completar formulario
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-[var(--purple-primary)] px-4 py-3 text-sm font-semibold text-[var(--warm-white)] shadow-[0_12px_30px_rgba(124,58,237,0.35)] hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-soft)]"
        aria-expanded={isOpen}
        aria-controls="internal-chat-widget"
      >
        {isOpen ? 'Ocultar chat' : 'Abrir chat'}
      </button>
    </div>
  );
}
