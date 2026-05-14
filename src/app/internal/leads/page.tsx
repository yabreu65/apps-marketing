import { prisma } from '@/lib/prisma';
import { formatDateTime } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function InternalLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
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

  return (
    <main className="min-h-screen bg-[#0B1020] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-3 rounded-2xl border border-[#26324A] bg-[#111827] p-6 shadow-lg shadow-black/20">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
            Dashboard interno local
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-[#FFFBF5] sm:text-3xl">Leads internos</h1>
          <p className="text-sm text-slate-300 sm:text-base">Vista local para revisar consultas recibidas.</p>
          <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Vista interna local. Debe protegerse con autenticación antes de producción.
          </p>
          <p className="text-sm text-slate-300">
            Mostrando <span className="font-semibold text-orange-300">{leads.length}</span> lead{leads.length === 1 ? '' : 's'} (máximo 50).
          </p>
        </header>

        {leads.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-[#26324A] bg-[#151B2E] p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-100">No hay leads todavía</h2>
            <p className="mt-2 text-sm text-slate-300">
              Cuando lleguen consultas desde el formulario, aparecerán en esta vista.
            </p>
          </section>
        ) : (
          <>
            <section className="hidden overflow-x-auto rounded-2xl border border-[#26324A] bg-[#111827] lg:block">
              <table className="min-w-full divide-y divide-[#26324A] text-left text-sm">
                <thead className="bg-[#151B2E] text-xs uppercase tracking-wide text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Teléfono</th>
                    <th className="px-4 py-3">Tipo de negocio</th>
                    <th className="px-4 py-3">Servicio de interés</th>
                    <th className="px-4 py-3">Fuente</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Mensaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26324A]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="align-top text-slate-200">
                      <td className="px-4 py-4 font-medium text-slate-100">{lead.name}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.email ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.phone ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.businessType ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.serviceInterest}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.source}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200">
                          {lead.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-300">{formatDateTime(lead.createdAt)}</td>
                      <td className="max-w-xs px-4 py-4 text-slate-300">{lead.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="grid gap-4 lg:hidden">
              {leads.map((lead) => (
                <article
                  key={lead.id}
                  className="space-y-3 rounded-xl border border-[#26324A] bg-[#151B2E] p-4 shadow-md shadow-black/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold text-slate-100">{lead.name}</h2>
                    <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-200">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{formatDateTime(lead.createdAt)}</p>
                  <dl className="space-y-2 text-sm text-slate-300">
                    <div>
                      <dt className="font-medium text-slate-200">Email</dt>
                      <dd>{lead.email ?? '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Teléfono</dt>
                      <dd>{lead.phone ?? '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Tipo de negocio</dt>
                      <dd>{lead.businessType ?? '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Servicio de interés</dt>
                      <dd>{lead.serviceInterest}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Fuente</dt>
                      <dd>{lead.source}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-200">Mensaje</dt>
                      <dd className="whitespace-pre-wrap">{lead.message}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
