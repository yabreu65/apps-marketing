'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { formatDateTime } from '@/lib/format';

type LeadNoteItem = {
  id: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type LeadNotesPanelProps = {
  leadId: string;
  notes: LeadNoteItem[];
};

export function LeadNotesPanel({ leadId, notes }: LeadNotesPanelProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/leads/${leadId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

    if (!response.ok || !data?.ok) {
      setError(data?.message ?? 'No se pudo guardar la nota.');
      return;
    }

    setContent('');
    setMessage('Nota agregada correctamente.');

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
      <h2 className="text-lg font-semibold text-slate-100">Notas internas</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="Agregar nota interna sobre este lead"
          className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
          disabled={isPending}
        />
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-slate-400">{content.length}/1000</p>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30 disabled:opacity-60"
          >
            {isPending ? 'Guardando...' : 'Guardar nota'}
          </button>
        </div>
      </form>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-slate-300">Todavía no hay notas para este lead.</p>
        ) : (
          notes.map((note) => (
            <article key={note.id} className="rounded-xl border border-[#26324A] bg-[#111827] p-3 text-sm text-slate-200">
              <p className="whitespace-pre-wrap">{note.content}</p>
              <p className="mt-2 text-xs text-slate-400">{formatDateTime(note.createdAt)}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
