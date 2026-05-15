import Link from 'next/link';

import { InternalLogoutButton } from '@/components/internal/InternalLogoutButton';
import { formatDateTime } from '@/lib/format';
import { LEAD_STATUSES, getLeadStatusBadgeClass, getLeadStatusLabel } from '@/lib/lead-status';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

type LeadsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type FilterOption = {
  label: string;
  value: string;
};

const PAGE_SIZE = 20;

const STATUS_OPTIONS: FilterOption[] = [
  { label: 'Todos', value: '' },
  ...LEAD_STATUSES.map((status) => ({ label: getLeadStatusLabel(status), value: status })),
];

const SOURCE_OPTIONS: FilterOption[] = [
  { label: 'Todas', value: '' },
  { label: 'contact_form', value: 'contact_form' },
  { label: 'chat', value: 'chat' },
  { label: 'diagnosis', value: 'diagnosis' },
  { label: 'unknown', value: 'unknown' },
];

const SERVICE_OPTIONS: FilterOption[] = [
  { label: 'Todos', value: '' },
  { label: 'Landing comercial', value: 'Landing comercial' },
  { label: 'Sitio web profesional', value: 'Sitio web profesional' },
  { label: 'Sistema web a medida', value: 'Sistema web a medida' },
  { label: 'Dashboard / panel interno', value: 'Dashboard / panel interno' },
  { label: 'MVP SaaS', value: 'MVP SaaS' },
  { label: 'Automatización comercial', value: 'Automatización comercial' },
  { label: 'IA aplicada al negocio', value: 'IA aplicada al negocio' },
  { label: 'SEO / marketing digital', value: 'SEO / marketing digital' },
  { label: 'No estoy seguro', value: 'No estoy seguro' },
];

function getSingleParam(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    const trimmed = value[0].trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

function getPage(value: string | undefined): number {
  if (!value) return 1;

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) return 1;

  return parsed;
}

function buildHref(current: Record<string, string | undefined>, updates: Record<string, string | undefined>) {
  const nextParams = new URLSearchParams();
  const merged = { ...current, ...updates };

  if (merged.status) nextParams.set('status', merged.status);
  if (merged.source) nextParams.set('source', merged.source);
  if (merged.serviceInterest) nextParams.set('serviceInterest', merged.serviceInterest);
  if (merged.q) nextParams.set('q', merged.q);

  const page = getPage(merged.page);
  if (page > 1) nextParams.set('page', String(page));

  const query = nextParams.toString();
  return query ? `/internal/leads?${query}` : '/internal/leads';
}

export default async function InternalLeadsPage({ searchParams }: LeadsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const statusFilter = getSingleParam(resolvedSearchParams.status);
  const sourceFilter = getSingleParam(resolvedSearchParams.source);
  const serviceInterestFilter = getSingleParam(resolvedSearchParams.serviceInterest);
  const queryFilter = getSingleParam(resolvedSearchParams.q);
  const page = getPage(getSingleParam(resolvedSearchParams.page));

  const currentFilters = {
    status: statusFilter,
    source: sourceFilter,
    serviceInterest: serviceInterestFilter,
    q: queryFilter,
    page: String(page),
  };

  const where: Prisma.LeadWhereInput = {
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(sourceFilter ? { source: sourceFilter } : {}),
    ...(serviceInterestFilter ? { serviceInterest: serviceInterestFilter } : {}),
    ...(queryFilter
      ? {
          OR: [
            { name: { contains: queryFilter, mode: 'insensitive' } },
            { email: { contains: queryFilter, mode: 'insensitive' } },
            { phone: { contains: queryFilter, mode: 'insensitive' } },
            { businessType: { contains: queryFilter, mode: 'insensitive' } },
            { serviceInterest: { contains: queryFilter, mode: 'insensitive' } },
            { message: { contains: queryFilter, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  const totalLeads = await prisma.lead.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalLeads / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageAdjusted = safePage !== page;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: PAGE_SIZE,
    skip: (safePage - 1) * PAGE_SIZE,
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

  const hasFilters = Boolean(statusFilter || sourceFilter || serviceInterestFilter || queryFilter);

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
          <div className="flex justify-end">
            <InternalLogoutButton />
          </div>
          <p className="text-sm text-slate-300">
            Mostrando <span className="font-semibold text-orange-300">{leads.length}</span> de{' '}
            <span className="font-semibold text-orange-300">{totalLeads}</span> leads.
          </p>

          <section className="space-y-3 rounded-xl border border-[#26324A] bg-[#151B2E] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-300">Búsqueda y filtros</p>

            <form action="/internal/leads" className="flex flex-col gap-2 sm:flex-row">
              <input type="hidden" name="status" value={statusFilter ?? ''} />
              <input type="hidden" name="source" value={sourceFilter ?? ''} />
              <input type="hidden" name="serviceInterest" value={serviceInterestFilter ?? ''} />
              <input
                type="search"
                name="q"
                defaultValue={queryFilter ?? ''}
                placeholder="Buscar por nombre, email, servicio o mensaje"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30"
              >
                Buscar
              </button>
            </form>

            <div className="space-y-2">
              <p className="text-xs text-slate-400">Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => {
                  const active = (statusFilter ?? '') === option.value;
                  return (
                    <Link
                      key={`status-${option.value || 'all'}`}
                      href={buildHref(currentFilters, { status: option.value || undefined, page: '1' })}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? 'border-orange-500/50 bg-orange-500/20 text-orange-100'
                          : 'border-slate-600/70 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60'
                      }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400">Source</p>
              <div className="flex flex-wrap gap-2">
                {SOURCE_OPTIONS.map((option) => {
                  const active = (sourceFilter ?? '') === option.value;
                  return (
                    <Link
                      key={`source-${option.value || 'all'}`}
                      href={buildHref(currentFilters, { source: option.value || undefined, page: '1' })}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? 'border-orange-500/50 bg-orange-500/20 text-orange-100'
                          : 'border-slate-600/70 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60'
                      }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400">Service Interest</p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((option) => {
                  const active = (serviceInterestFilter ?? '') === option.value;
                  return (
                    <Link
                      key={`service-${option.value || 'all'}`}
                      href={buildHref(currentFilters, { serviceInterest: option.value || undefined, page: '1' })}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? 'border-orange-500/50 bg-orange-500/20 text-orange-100'
                          : 'border-slate-600/70 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60'
                      }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {hasFilters ? (
              <Link
                href="/internal/leads"
                className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 hover:bg-violet-500/20"
              >
                Limpiar filtros
              </Link>
            ) : null}
          </section>
        </header>

        {leads.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-[#26324A] bg-[#151B2E] p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-100">No encontramos leads con los criterios actuales</h2>
            <p className="mt-2 text-sm text-slate-300">Probá ajustando búsqueda o filtros, o limpiá los criterios para ver todos los leads.</p>
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
                    <th className="px-4 py-3">Detalle</th>
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
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getLeadStatusBadgeClass(lead.status)}`}>
                          {getLeadStatusLabel(lead.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-300">{formatDateTime(lead.createdAt)}</td>
                      <td className="max-w-xs px-4 py-4 text-slate-300">{lead.message}</td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/internal/leads/${lead.id}`}
                          className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 hover:bg-violet-500/20"
                        >
                          Ver detalle
                        </Link>
                      </td>
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
                    <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getLeadStatusBadgeClass(lead.status)}`}>
                      {getLeadStatusLabel(lead.status)}
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
                  <Link
                    href={`/internal/leads/${lead.id}`}
                    className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 hover:bg-violet-500/20"
                  >
                    Ver detalle
                  </Link>
                </article>
              ))}
            </section>

            <nav className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#26324A] bg-[#111827] p-4 text-sm text-slate-300">
              <div className="space-y-1">
                <p>
                  Página <span className="font-semibold text-slate-100">{safePage}</span> de{' '}
                  <span className="font-semibold text-slate-100">{totalPages}</span>
                </p>
                {pageAdjusted ? (
                  <p className="text-xs text-amber-200">La página solicitada no estaba disponible y se ajustó automáticamente.</p>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={buildHref(currentFilters, { page: String(Math.max(1, safePage - 1)) })}
                  aria-disabled={safePage <= 1}
                  className={`rounded-lg border px-3 py-1.5 ${
                    safePage <= 1
                      ? 'pointer-events-none border-slate-700 text-slate-500'
                      : 'border-violet-400/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20'
                  }`}
                >
                  Anterior
                </Link>
                <Link
                  href={buildHref(currentFilters, { page: String(Math.min(totalPages, safePage + 1)) })}
                  aria-disabled={safePage >= totalPages}
                  className={`rounded-lg border px-3 py-1.5 ${
                    safePage >= totalPages
                      ? 'pointer-events-none border-slate-700 text-slate-500'
                      : 'border-violet-400/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20'
                  }`}
                >
                  Siguiente
                </Link>
              </div>
            </nav>
          </>
        )}
      </div>
    </main>
  );
}
