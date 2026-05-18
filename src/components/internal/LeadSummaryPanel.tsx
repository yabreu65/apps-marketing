'use client';

import { useState, useTransition } from 'react';

import type { LeadSummaryResult } from '@/lib/lead-summary';
import type { LeadSummarySource } from '@/lib/lead-summary-ai';

type LeadSummaryPanelProps = {
  leadId: string;
  initialSummary: LeadSummaryResult;
  initialSource: LeadSummarySource;
};

type SummaryApiResponse = {
  ok: boolean;
  summary?: LeadSummaryResult;
  source?: LeadSummarySource;
  message?: string;
};

function getPriorityBadgeClass(priority: 'low' | 'medium' | 'high') {
  if (priority === 'high') return 'border-rose-500/40 bg-rose-500/15 text-rose-100';
  if (priority === 'medium') return 'border-amber-500/40 bg-amber-500/15 text-amber-100';
  return 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100';
}

function getPriorityLabel(priority: 'low' | 'medium' | 'high') {
  if (priority === 'high') return 'Alta';
  if (priority === 'medium') return 'Media';
  return 'Baja';
}

function getSourceBadge(source: LeadSummarySource) {
  if (source === 'ollama') return 'IA local (Ollama)';
  if (source === 'rules_fallback') return 'Reglas locales (fallback)';
  return 'Reglas locales';
}

function getSourceNote(source: LeadSummarySource) {
  if (source === 'ollama') {
    return 'Resumen generado con IA local mediante Ollama. No se enviaron datos a servicios externos.';
  }

  if (source === 'rules_fallback') {
    return 'Ollama no estuvo disponible. Se mostró resumen por reglas locales.';
  }

  return 'Resumen orientativo generado por reglas locales. No usa IA ni servicios externos.';
}

export function LeadSummaryPanel({ leadId, initialSummary, initialSource }: LeadSummaryPanelProps) {
  const [summary, setSummary] = useState(initialSummary);
  const [source, setSource] = useState<LeadSummarySource>(initialSource);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function regenerateSummary() {
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/leads/${leadId}/summary`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = (await response.json().catch(() => null)) as SummaryApiResponse | null;

        if (!response.ok || !data?.ok || !data.summary || !data.source) {
          setError(data?.message ?? 'No se pudo regenerar el resumen en este momento.');
          return;
        }

        setSummary(data.summary);
        setSource(data.source);
      } catch {
        setError('No se pudo regenerar el resumen en este momento.');
      }
    });
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-100">Resumen comercial sugerido</h2>
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-100">
            {getSourceBadge(source)}
          </span>
        </div>

        <button
          type="button"
          onClick={regenerateSummary}
          disabled={isPending}
          className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-100 hover:bg-violet-500/20 disabled:opacity-60"
        >
          {isPending ? 'Regenerando resumen...' : 'Regenerar resumen IA local'}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Tipo de oportunidad</p>
          <p className="mt-2 text-sm text-slate-100">{summary.opportunityType}</p>
        </article>
        <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Prioridad sugerida</p>
          <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityBadgeClass(summary.priority)}`}>
            {getPriorityLabel(summary.priority)}
          </span>
        </article>
      </div>

      <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Resumen</p>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-300">{summary.summary}</p>
      </article>

      <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Siguiente acción recomendada</p>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-300">{summary.recommendedAction}</p>
      </article>

      {error ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>
      ) : null}

      <p className="text-xs text-slate-400">{getSourceNote(source)}</p>
      <p className="text-xs text-slate-500">
        Este resumen es solo de apoyo: no modifica el lead, no persiste cambios y no ejecuta acciones automáticas.
      </p>
    </section>
  );
}
