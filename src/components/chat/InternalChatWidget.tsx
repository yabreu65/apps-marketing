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

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppLink(
        '+54 9 11 0000 0000',
        'Hola, usé el chat de orientación y quiero solicitar un diagnóstico para mi proyecto digital.',
      ),
    [],
  );

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
          className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[#26324A] bg-[#0F172A] shadow-[0_18px_45px_rgba(2,6,23,0.55)]"
        >
          <header className="flex items-center justify-between border-b border-[#26324A] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#FFFBF5]">Orientación inicial</p>
              <p className="text-xs text-[#94A3B8]">Sin bots externos ni integraciones activas</p>
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
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    message.role === 'assistant'
                      ? 'border border-[#26324A] bg-[#111827] text-[#E2E8F0]'
                      : 'bg-[#F97316] text-[#FFFBF5]'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {isTyping ? <p className="text-xs text-[#A78BFA]">Escribiendo respuesta…</p> : null}
          </div>

          <div className="border-t border-[#26324A] px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  type="button"
                  onClick={() => handleUserMessage(reply.label)}
                  className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-3 py-1 text-xs text-[#C4B5FD] hover:bg-[#7C3AED]/20"
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
                  className="w-full rounded-md border border-[#26324A] bg-[#0B1020] px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                />
                <button
                  type="submit"
                  className="rounded-md bg-[#F97316] px-3 py-2 text-sm font-medium text-[#FFFBF5] hover:bg-[#EA580C] focus:outline-none focus:ring-2 focus:ring-[#FDBA74]"
                >
                  Enviar
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs text-[#94A3B8]">{privacyNote}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#F97316] px-3 py-2 text-xs font-semibold text-[#FFFBF5] hover:bg-[#EA580C]"
              >
                Ir a WhatsApp
              </a>
              <a
                href="#contact-form"
                className="rounded-md border border-[#7C3AED]/50 px-3 py-2 text-xs font-semibold text-[#CBD5E1] hover:bg-[#7C3AED]/15"
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
        className="rounded-full bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-[#FFFBF5] shadow-[0_12px_30px_rgba(124,58,237,0.35)] hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
        aria-expanded={isOpen}
        aria-controls="internal-chat-widget"
      >
        {isOpen ? 'Ocultar chat' : 'Abrir chat'}
      </button>
    </div>
  );
}
