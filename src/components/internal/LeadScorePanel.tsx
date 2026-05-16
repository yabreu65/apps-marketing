import type { LeadScore } from '@/types/lead-score';

type LeadScorePanelProps = {
  score: LeadScore;
};

function levelLabel(level: LeadScore['level']) {
  if (level === 'high') return 'Alta';
  if (level === 'medium') return 'Media';
  return 'Baja';
}

function levelClass(level: LeadScore['level']) {
  if (level === 'high') return 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100';
  if (level === 'medium') return 'border-amber-500/40 bg-amber-500/15 text-amber-100';
  return 'border-slate-500/40 bg-slate-500/15 text-slate-200';
}

export function LeadScorePanel({ score }: LeadScorePanelProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-100">Lead Score</h2>
        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${levelClass(score.level)}`}>
          Prioridad {levelLabel(score.level)}
        </span>
      </div>

      <div className="rounded-xl border border-[#26324A] bg-[#111827] px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Score estimado</p>
        <p className="text-3xl font-semibold text-slate-100">{score.score}/100</p>
      </div>

      <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Razones principales</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {score.reasons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Señales positivas</p>
          {score.positiveSignals.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {score.positiveSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-300">Sin señales positivas relevantes.</p>
          )}
        </article>

        <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Señales faltantes o riesgos</p>
          {score.missingSignals.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {score.missingSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-300">No se detectaron faltantes críticos en esta evaluación.</p>
          )}
        </article>
      </div>

      <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Siguiente acción recomendada</p>
        <p className="mt-2 text-sm text-slate-300">{score.recommendedAction}</p>
      </article>

      <p className="text-xs text-slate-400">
        Estimación local explicable. No ejecuta acciones automáticas, no cambia el estado del lead y no se persiste en base de datos.
      </p>
    </section>
  );
}
