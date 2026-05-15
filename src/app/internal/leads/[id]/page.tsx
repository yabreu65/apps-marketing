import Link from 'next/link';

import { LeadNotesPanel } from '@/components/internal/LeadNotesPanel';
import { LeadStatusUpdater } from '@/components/internal/LeadStatusUpdater';
import { InternalLogoutButton } from '@/components/internal/InternalLogoutButton';
import { formatDateTime } from '@/lib/format';
import { getLeadStatusBadgeClass, getLeadStatusLabel } from '@/lib/lead-status';
import { buildLeadSummaryWithOptionalAI } from '@/lib/lead-summary-ai';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
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
type TimelineItem = {
  id: string;
  kind: 'status' | 'note';
  createdAt: Date;
  title: string;
  description: string;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      businessType: true,
      serviceInterest: true,
      message: true,
      source: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      notes: {
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      statusHistory: {
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          fromStatus: true,
          toStatus: true,
          createdAt: true,
        },
      },
    },
  });

  if (!lead) {
    return (
      <main className="min-h-screen bg-[#0B1020] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-[#26324A] bg-[#111827] p-6 shadow-lg shadow-black/20">
          <h1 className="text-2xl font-semibold text-[#FFFBF5]">Lead no encontrado</h1>
          <p className="text-sm text-slate-300">No existe un lead con ese ID en la base local.</p>
          <Link
            href="/internal/leads"
            className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
          >
            Volver a leads
          </Link>
        </div>
      </main>
    );
  }

  const leadSummaryResult = await buildLeadSummaryWithOptionalAI({
    name: lead.name,
    serviceInterest: lead.serviceInterest,
    businessType: lead.businessType,
    message: lead.message,
    source: lead.source,
    status: lead.status,
    notes: lead.notes,
    statusHistory: lead.statusHistory.map((item) => ({
      fromStatus: item.fromStatus,
      toStatus: item.toStatus,
      createdAt: item.createdAt,
    })),
  });

  const leadSummary = leadSummaryResult.summary;

  const timeline: TimelineItem[] = [
    ...lead.statusHistory.map((item) => ({
      id: `status-${item.id}`,
      kind: 'status' as const,
      createdAt: item.createdAt,
      title: 'Cambio de status',
      description: `${item.fromStatus ? getLeadStatusLabel(item.fromStatus) : 'Sin status'} → ${getLeadStatusLabel(item.toStatus)}`,
    })),
    ...lead.notes.map((note) => ({
      id: `note-${note.id}`,
      kind: 'note' as const,
      createdAt: note.createdAt,
      title: 'Nota interna',
      description: note.content,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <main className="min-h-screen bg-[#0B1020] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="space-y-3 rounded-2xl border border-[#26324A] bg-[#111827] p-6 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-wide text-slate-400">Detalle de lead</p>
          <h1 className="text-2xl font-semibold tracking-tight text-[#FFFBF5] sm:text-3xl">{lead.name}</h1>
          <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Vista interna protegida con autenticación local mínima. Antes de producción debe reforzarse con usuarios, roles y controles de acceso.
          </p>
          <div className="flex justify-end">
            <InternalLogoutButton />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getLeadStatusBadgeClass(lead.status)}`}>
              {getLeadStatusLabel(lead.status)}
            </span>
            <span>Fuente: {lead.source}</span>
            <span>•</span>
            <span>Recibido: {formatDateTime(lead.createdAt)}</span>
          </div>
        </header>

        <LeadStatusUpdater leadId={lead.id} currentStatus={lead.status} />

        <section className="rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-200">Nombre</dt>
              <dd className="mt-1 text-slate-300">{lead.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">Email</dt>
              <dd className="mt-1 text-slate-300">{lead.email ?? '—'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">Teléfono</dt>
              <dd className="mt-1 text-slate-300">{lead.phone ?? '—'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">Tipo de negocio</dt>
              <dd className="mt-1 text-slate-300">{lead.businessType ?? '—'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">Servicio de interés</dt>
              <dd className="mt-1 text-slate-300">{lead.serviceInterest}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-200">Última actualización</dt>
              <dd className="mt-1 text-slate-300">{formatDateTime(lead.updatedAt)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-slate-200">Mensaje</dt>
              <dd className="mt-1 whitespace-pre-wrap text-slate-300">{lead.message}</dd>
            </div>
          </dl>
        </section>



        <section className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Resumen comercial sugerido</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Tipo de oportunidad</p>
              <p className="mt-1 text-sm text-slate-100">{leadSummary.opportunityType}</p>
            </article>
            <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Prioridad sugerida</p>
              <span className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityBadgeClass(leadSummary.priority)}`}>
                {getPriorityLabel(leadSummary.priority)}
              </span>
            </article>
          </div>
          <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Resumen</p>
            <p className="mt-1 text-sm text-slate-300">{leadSummary.summary}</p>
          </article>
          <article className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Siguiente acción recomendada</p>
            <p className="mt-1 text-sm text-slate-300">{leadSummary.recommendedAction}</p>
          </article>
          <p className="text-xs text-slate-400">{leadSummaryResult.source === 'rules' ? 'Resumen orientativo generado por reglas locales. No usa IA ni servicios externos.' : null}{leadSummaryResult.source === 'ollama' ? 'Resumen generado con IA local mediante Ollama. No se enviaron datos a servicios externos.' : null}{leadSummaryResult.source === 'rules_fallback' ? 'Ollama no estuvo disponible. Se mostró resumen por reglas locales.' : null}</p>
        </section>

        <LeadNotesPanel leadId={lead.id} notes={lead.notes} />

        <section className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Actividad</h2>
          {timeline.length === 0 ? (
            <p className="text-sm text-slate-300">Todavía no hay actividad registrada para este lead.</p>
          ) : (
            <div className="space-y-3">
              {timeline.map((item) => (
                <article key={item.id} className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-100">{item.title}</p>
                    <p className="text-xs text-slate-400">{formatDateTime(item.createdAt)}</p>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <Link
          href="/internal/leads"
          className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
        >
          ← Volver a /internal/leads
        </Link>
      </div>
    </main>
  );
}
