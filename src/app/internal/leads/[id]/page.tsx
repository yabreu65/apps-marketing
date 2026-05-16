import Link from 'next/link';

import { LeadNotesPanel } from '@/components/internal/LeadNotesPanel';
import { LeadScorePanel } from '@/components/internal/LeadScorePanel';
import { LeadSummaryPanel } from '@/components/internal/LeadSummaryPanel';
import { LeadStatusUpdater } from '@/components/internal/LeadStatusUpdater';
import { InternalLogoutButton } from '@/components/internal/InternalLogoutButton';
import { formatDateTime } from '@/lib/format';
import { getLeadStatusBadgeClass, getLeadStatusLabel } from '@/lib/lead-status';
import { buildLeadScore } from '@/lib/lead-score';
import { buildLeadSummaryWithOptionalAI } from '@/lib/lead-summary-ai';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

type TimelineItem = {
  id: string;
  kind: 'status' | 'note';
  createdAt: Date;
  title: string;
  description: string;
};

function formatLeadSource(source: string) {
  switch (source) {
    case 'contact_form':
      return 'Formulario';
    case 'chat':
      return 'Chat interno';
    case 'diagnosis':
      return 'Diagnóstico';
    case 'unknown':
      return 'No especificada';
    default:
      return source;
  }
}

function displayValue(value?: string | null) {
  if (!value) return 'No informado';
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : 'No informado';
}

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

  const leadScore = buildLeadScore({
    serviceInterest: lead.serviceInterest,
    businessType: lead.businessType,
    message: lead.message,
    source: lead.source,
    status: lead.status,
    email: lead.email,
    phone: lead.phone,
    notes: lead.notes,
    statusHistory: lead.statusHistory.map((item) => ({ toStatus: item.toStatus })),
  });

  const timeline: TimelineItem[] = [
    ...lead.statusHistory.map((item) => ({
      id: `status-${item.id}`,
      kind: 'status' as const,
      createdAt: item.createdAt,
      title: 'Cambio de estado',
      description: `${item.fromStatus ? getLeadStatusLabel(item.fromStatus) : 'Sin estado'} → ${getLeadStatusLabel(item.toStatus)}`,
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
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-4 rounded-2xl border border-[#26324A] bg-[#111827] p-6 shadow-lg shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/internal/leads"
              className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-200 hover:bg-violet-500/20"
            >
              ← Volver a leads
            </Link>
            <InternalLogoutButton />
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-slate-400">Detalle de lead interno</p>
              <h1 className="text-2xl font-semibold tracking-tight text-[#FFFBF5] sm:text-3xl">{lead.name}</h1>
            </div>

            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getLeadStatusBadgeClass(lead.status)}`}>
              {getLeadStatusLabel(lead.status)}
            </span>
          </div>

          <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
            <p className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2">Fuente: {formatLeadSource(lead.source)}</p>
            <p className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2">Recibido: {formatDateTime(lead.createdAt)}</p>
            <p className="rounded-lg border border-[#26324A] bg-[#151B2E] px-3 py-2">Actualizado: {formatDateTime(lead.updatedAt)}</p>
          </div>

          <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 sm:text-sm">
            Vista interna protegida con autenticación local mínima. Antes de producción debe reforzarse con usuarios, roles y controles de acceso.
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <article className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
            <h2 className="text-lg font-semibold text-slate-100">Datos principales</h2>

            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-200">Nombre</dt>
                <dd className="mt-1 text-slate-300">{displayValue(lead.name)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Email</dt>
                <dd className="mt-1 break-all text-slate-300">{displayValue(lead.email)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Teléfono</dt>
                <dd className="mt-1 text-slate-300">{displayValue(lead.phone)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Tipo de negocio</dt>
                <dd className="mt-1 text-slate-300">{displayValue(lead.businessType)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Servicio de interés</dt>
                <dd className="mt-1 text-slate-300">{displayValue(lead.serviceInterest)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Fuente</dt>
                <dd className="mt-1 text-slate-300">{formatLeadSource(lead.source)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Última actualización</dt>
                <dd className="mt-1 text-slate-300">{formatDateTime(lead.updatedAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">Fecha de ingreso</dt>
                <dd className="mt-1 text-slate-300">{formatDateTime(lead.createdAt)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium text-slate-200">Mensaje</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words rounded-lg border border-[#26324A] bg-[#111827] p-3 text-slate-300">
                  {displayValue(lead.message)}
                </dd>
              </div>
            </dl>
          </article>

          <div className="space-y-6">
            <LeadStatusUpdater leadId={lead.id} currentStatus={lead.status} />
            <LeadScorePanel score={leadScore} />
          </div>
        </section>

        <LeadSummaryPanel leadId={lead.id} initialSummary={leadSummaryResult.summary} initialSource={leadSummaryResult.source} />

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <LeadNotesPanel leadId={lead.id} notes={lead.notes} />

          <section className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
            <h2 className="text-lg font-semibold text-slate-100">Actividad reciente</h2>
            {timeline.length === 0 ? (
              <p className="text-sm text-slate-300">Todavía no hay actividad registrada para este lead.</p>
            ) : (
              <div className="space-y-3">
                {timeline.map((item) => (
                  <article key={item.id} className="rounded-xl border border-[#26324A] bg-[#111827] p-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex h-2.5 w-2.5 rounded-full ${
                            item.kind === 'status' ? 'bg-violet-400' : 'bg-emerald-400'
                          }`}
                          aria-hidden
                        />
                        <p className="text-sm font-medium text-slate-100">{item.title}</p>
                      </div>
                      <p className="text-xs text-slate-400">{formatDateTime(item.createdAt)}</p>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
