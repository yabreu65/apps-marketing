import Link from 'next/link';

import { formatDateTime } from '@/lib/format';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
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

  return (
    <main className="min-h-screen bg-[#0B1020] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="space-y-3 rounded-2xl border border-[#26324A] bg-[#111827] p-6 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-wide text-slate-400">Detalle de lead</p>
          <h1 className="text-2xl font-semibold tracking-tight text-[#FFFBF5] sm:text-3xl">{lead.name}</h1>
          <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Vista interna local. Debe protegerse con autenticación antes de producción.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <span className="inline-flex rounded-full border border-orange-500/40 bg-orange-500/15 px-2.5 py-1 text-xs font-medium text-orange-100">
              {lead.status}
            </span>
            <span>Fuente: {lead.source}</span>
            <span>•</span>
            <span>Recibido: {formatDateTime(lead.createdAt)}</span>
          </div>
        </header>

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
