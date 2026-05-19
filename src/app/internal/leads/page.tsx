import Link from "next/link";

import { ChatFunnelReport } from "@/components/internal/ChatFunnelReport";
import { InternalLogoutButton } from "@/components/internal/InternalLogoutButton";
import { formatDateTime } from "@/lib/format";
import {
	buildLeadWhereInput,
	extractLeadFiltersFromRecord,
	getSingleSearchParam,
} from "@/lib/lead-dashboard-filters";
import { buildLeadDashboardMetrics } from "@/lib/lead-metrics";
import {
	LEAD_STATUSES,
	getLeadStatusBadgeClass,
	getLeadStatusLabel,
} from "@/lib/lead-status";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type LeadsPageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type FilterOption = {
	label: string;
	value: string;
};

type LeadListItem = {
	id: string;
	name: string;
	email: string | null;
	phone: string | null;
	businessType: string | null;
	serviceInterest: string;
	source: string;
	status: string;
	createdAt: Date;
	message: string;
};

const PAGE_SIZE = 20;

const STATUS_OPTIONS: FilterOption[] = [
	{ label: "Todos", value: "" },
	...LEAD_STATUSES.map((status) => ({
		label: getLeadStatusLabel(status),
		value: status,
	})),
];

const SOURCE_OPTIONS: FilterOption[] = [
	{ label: "Todas", value: "" },
	{ label: "contact_form", value: "contact_form" },
	{ label: "chat", value: "chat" },
	{ label: "diagnosis", value: "diagnosis" },
	{ label: "unknown", value: "unknown" },
];

const SERVICE_OPTIONS: FilterOption[] = [
	{ label: "Todos", value: "" },
	{ label: "Landing comercial", value: "Landing comercial" },
	{ label: "Sitio web profesional", value: "Sitio web profesional" },
	{ label: "Sistema web a medida", value: "Sistema web a medida" },
	{ label: "Dashboard / panel interno", value: "Dashboard / panel interno" },
	{ label: "MVP SaaS", value: "MVP SaaS" },
	{ label: "Automatización comercial", value: "Automatización comercial" },
	{ label: "IA aplicada al negocio", value: "IA aplicada al negocio" },
	{ label: "SEO / marketing digital", value: "SEO / marketing digital" },
	{ label: "No estoy seguro", value: "No estoy seguro" },
];

function getPage(value: string | undefined): number {
	if (!value) return 1;

	const parsed = Number.parseInt(value, 10);
	if (Number.isNaN(parsed) || parsed < 1) return 1;

	return parsed;
}

function buildHref(
	current: Record<string, string | undefined>,
	updates: Record<string, string | undefined>,
) {
	const nextParams = new URLSearchParams();
	const merged = { ...current, ...updates };

	if (merged.status) nextParams.set("status", merged.status);
	if (merged.source) nextParams.set("source", merged.source);
	if (merged.serviceInterest)
		nextParams.set("serviceInterest", merged.serviceInterest);
	if (merged.q) nextParams.set("q", merged.q);

	const page = getPage(merged.page);
	if (page > 1) nextParams.set("page", String(page));

	const query = nextParams.toString();
	return query ? `/internal/leads?${query}` : "/internal/leads";
}

function buildExportHref(current: Record<string, string | undefined>) {
	const params = new URLSearchParams();

	if (current.status) params.set("status", current.status);
	if (current.source) params.set("source", current.source);
	if (current.serviceInterest)
		params.set("serviceInterest", current.serviceInterest);
	if (current.q) params.set("q", current.q);

	const query = params.toString();
	return query ? `/internal/leads/export?${query}` : "/internal/leads/export";
}

export default async function InternalLeadsPage({
	searchParams,
}: LeadsPageProps) {
	const resolvedSearchParams = (await searchParams) ?? {};
	const {
		status: statusFilter,
		source: sourceFilter,
		serviceInterest: serviceInterestFilter,
		q: queryFilter,
	} = extractLeadFiltersFromRecord(resolvedSearchParams);
	const page = getPage(getSingleSearchParam(resolvedSearchParams.page));

	const currentFilters = {
		status: statusFilter,
		source: sourceFilter,
		serviceInterest: serviceInterestFilter,
		q: queryFilter,
		page: String(page),
	};

	const where = buildLeadWhereInput({
		status: statusFilter,
		source: sourceFilter,
		serviceInterest: serviceInterestFilter,
		q: queryFilter,
	});

	const totalLeads = await prisma.lead.count({ where });
	const totalPages = Math.max(1, Math.ceil(totalLeads / PAGE_SIZE));
	const safePage = Math.min(page, totalPages);
	const pageAdjusted = safePage !== page;

	const leads = await prisma.lead.findMany({
		where,
		orderBy: { createdAt: "desc" },
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

	const metricsInput = await prisma.lead.findMany({
		where,
		select: {
			status: true,
			serviceInterest: true,
			message: true,
			source: true,
			email: true,
			phone: true,
			businessType: true,
		},
	});
	const metrics = buildLeadDashboardMetrics(metricsInput);

	const hasFilters = Boolean(
		statusFilter || sourceFilter || serviceInterestFilter || queryFilter,
	);
	const hasAnyLead = metrics.total > 0;

	return (
		<main className="min-h-screen bg-[var(--bg-primary)] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
			<div className="mx-auto w-full max-w-6xl space-y-6">
				<header className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-lg shadow-black/20">
					<span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
						Dashboard interno local
					</span>
					<h1 className="text-2xl font-semibold tracking-tight text-[var(--warm-white)] sm:text-3xl">
						Leads internos
					</h1>
					<p className="text-sm text-slate-300 sm:text-base">
						Vista local para revisar consultas recibidas.
					</p>
					<p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
						Vista interna protegida con autenticación local mínima. Antes de
						producción debe reforzarse con usuarios, roles y controles de
						acceso.
					</p>
					<div className="flex flex-wrap justify-end gap-2">
						<Link
							href={buildExportHref(currentFilters)}
							className="inline-flex items-center rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/20"
						>
							Exportar CSV
						</Link>
						<InternalLogoutButton />
					</div>
					<p className="text-sm text-slate-300">
						Mostrando{" "}
						<span className="font-semibold text-orange-300">
							{leads.length}
						</span>{" "}
						de{" "}
						<span className="font-semibold text-orange-300">{totalLeads}</span>{" "}
						leads.
					</p>

					<section className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<p className="text-xs font-medium uppercase tracking-wide text-slate-300">
								Métricas comerciales locales
							</p>
							<p className="text-xs text-slate-400">
								{hasFilters
									? "Calculadas sobre la búsqueda y filtros actuales."
									: "Calculadas sobre todas las consultas actuales."}
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Total de leads</p>
								<p className="mt-1 text-xl font-semibold text-slate-100">
									{metrics.total}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads nuevos</p>
								<p className="mt-1 text-xl font-semibold text-orange-300">
									{metrics.byStatus.new}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads contactados</p>
								<p className="mt-1 text-xl font-semibold text-sky-300">
									{metrics.byStatus.contacted}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads calificados</p>
								<p className="mt-1 text-xl font-semibold text-emerald-300">
									{metrics.byStatus.qualified}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads en propuesta</p>
								<p className="mt-1 text-xl font-semibold text-violet-300">
									{metrics.byStatus.proposal}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads cerrados</p>
								<p className="mt-1 text-xl font-semibold text-teal-300">
									{metrics.byStatus.closed}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads archivados</p>
								<p className="mt-1 text-xl font-semibold text-slate-300">
									{metrics.byStatus.archived}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Alto potencial</p>
								<p className="mt-1 text-xl font-semibold text-fuchsia-300">
									{metrics.highPotential}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">Leads sin contactar</p>
								<p className="mt-1 text-xl font-semibold text-amber-300">
									{metrics.uncontacted}
								</p>
							</article>
							<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
								<p className="text-xs text-slate-400">
									Servicio más consultado
								</p>
								{metrics.topServiceInterest ? (
									<>
										<p className="mt-1 text-sm font-semibold text-slate-100">
											{metrics.topServiceInterest.name}
										</p>
										<p className="text-xs text-slate-400">
											{metrics.topServiceInterest.count} lead(s)
										</p>
									</>
								) : (
									<p className="mt-1 text-sm text-slate-300">
										{hasFilters
											? "Sin datos para este corte (revisá filtros o búsqueda)."
											: hasAnyLead
												? "Sin datos suficientes para este corte"
												: "Aún sin consultas registradas"}
									</p>
								)}
							</article>
						</div>
					</section>

					<ChatFunnelReport />

					<section className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4">
						<p className="text-xs font-medium uppercase tracking-wide text-slate-300">
							Búsqueda y filtros
						</p>

						<form
							action="/internal/leads"
							className="flex flex-col gap-2 sm:flex-row"
						>
							<input type="hidden" name="status" value={statusFilter ?? ""} />
							<input type="hidden" name="source" value={sourceFilter ?? ""} />
							<input
								type="hidden"
								name="serviceInterest"
								value={serviceInterestFilter ?? ""}
							/>
							<input
								type="search"
								name="q"
								defaultValue={queryFilter ?? ""}
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
									const active = (statusFilter ?? "") === option.value;
									return (
										<Link
											key={`status-${option.value || "all"}`}
											href={buildHref(currentFilters, {
												status: option.value || undefined,
												page: "1",
											})}
											className={`rounded-full border px-3 py-1 text-xs transition ${
												active
													? "border-orange-500/50 bg-orange-500/20 text-orange-100"
													: "border-slate-600/70 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60"
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
									const active = (sourceFilter ?? "") === option.value;
									return (
										<Link
											key={`source-${option.value || "all"}`}
											href={buildHref(currentFilters, {
												source: option.value || undefined,
												page: "1",
											})}
											className={`rounded-full border px-3 py-1 text-xs transition ${
												active
													? "border-orange-500/50 bg-orange-500/20 text-orange-100"
													: "border-slate-600/70 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60"
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
									const active = (serviceInterestFilter ?? "") === option.value;
									return (
										<Link
											key={`service-${option.value || "all"}`}
											href={buildHref(currentFilters, {
												serviceInterest: option.value || undefined,
												page: "1",
											})}
											className={`rounded-full border px-3 py-1 text-xs transition ${
												active
													? "border-orange-500/50 bg-orange-500/20 text-orange-100"
													: "border-slate-600/70 bg-slate-800/50 text-slate-200 hover:bg-slate-700/60"
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
					<section className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--card-bg)] p-8 text-center">
						{hasFilters ? (
							<>
								<h2 className="text-lg font-semibold text-slate-100">
									No encontramos leads con los criterios actuales
								</h2>
								<p className="mt-2 text-sm text-slate-300">
									Probá ajustando búsqueda o filtros, o limpiá los criterios
									para ver todos los leads.
								</p>
							</>
						) : (
							<>
								<h2 className="text-lg font-semibold text-slate-100">
									Todavía no hay leads cargados
								</h2>
								<p className="mt-2 text-sm text-slate-300">
									Podés generar datos de prueba con el seed local o enviar una
									consulta desde la landing para comenzar.
								</p>
							</>
						)}
					</section>
				) : (
					<>
						<section className="hidden overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] lg:block">
							<table className="min-w-full divide-y divide-[var(--border-subtle)] text-left text-sm">
								<thead className="bg-[var(--card-bg)] text-xs uppercase tracking-wide text-slate-300">
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
								<tbody className="divide-y divide-[var(--border-subtle)]">
									{leads.map((lead: LeadListItem) => (
										<tr key={lead.id} className="align-top text-slate-200">
											<td className="px-4 py-4 font-medium text-slate-100">
												{lead.name}
											</td>
											<td className="px-4 py-4 text-slate-300">
												{lead.email ?? "—"}
											</td>
											<td className="px-4 py-4 text-slate-300">
												{lead.phone ?? "—"}
											</td>
											<td className="px-4 py-4 text-slate-300">
												{lead.businessType ?? "—"}
											</td>
											<td className="px-4 py-4 text-slate-300">
												{lead.serviceInterest}
											</td>
											<td className="px-4 py-4 text-slate-300">
												{lead.source}
											</td>
											<td className="px-4 py-4">
												<span
													className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getLeadStatusBadgeClass(lead.status)}`}
												>
													{getLeadStatusLabel(lead.status)}
												</span>
											</td>
											<td className="whitespace-nowrap px-4 py-4 text-slate-300">
												{formatDateTime(lead.createdAt)}
											</td>
											<td className="max-w-xs px-4 py-4 text-slate-300">
												{lead.message}
											</td>
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
							{leads.map((lead: LeadListItem) => (
								<article
									key={lead.id}
									className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4 shadow-md shadow-black/20"
								>
									<div className="flex items-start justify-between gap-3">
										<h2 className="text-base font-semibold text-slate-100">
											{lead.name}
										</h2>
										<span
											className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getLeadStatusBadgeClass(lead.status)}`}
										>
											{getLeadStatusLabel(lead.status)}
										</span>
									</div>
									<p className="text-xs text-slate-400">
										{formatDateTime(lead.createdAt)}
									</p>
									<dl className="space-y-2 text-sm text-slate-300">
										<div>
											<dt className="font-medium text-slate-200">Email</dt>
											<dd>{lead.email ?? "—"}</dd>
										</div>
										<div>
											<dt className="font-medium text-slate-200">Teléfono</dt>
											<dd>{lead.phone ?? "—"}</dd>
										</div>
										<div>
											<dt className="font-medium text-slate-200">
												Tipo de negocio
											</dt>
											<dd>{lead.businessType ?? "—"}</dd>
										</div>
										<div>
											<dt className="font-medium text-slate-200">
												Servicio de interés
											</dt>
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

						<nav className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm text-slate-300">
							<div className="space-y-1">
								<p>
									Página{" "}
									<span className="font-semibold text-slate-100">
										{safePage}
									</span>{" "}
									de{" "}
									<span className="font-semibold text-slate-100">
										{totalPages}
									</span>
								</p>
								{pageAdjusted ? (
									<p className="text-xs text-amber-200">
										La página solicitada no estaba disponible y se ajustó
										automáticamente.
									</p>
								) : null}
							</div>

							<div className="flex items-center gap-2">
								<Link
									href={buildHref(currentFilters, {
										page: String(Math.max(1, safePage - 1)),
									})}
									aria-disabled={safePage <= 1}
									className={`rounded-lg border px-3 py-1.5 ${
										safePage <= 1
											? "pointer-events-none border-slate-700 text-slate-500"
											: "border-violet-400/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20"
									}`}
								>
									Anterior
								</Link>
								<Link
									href={buildHref(currentFilters, {
										page: String(Math.min(totalPages, safePage + 1)),
									})}
									aria-disabled={safePage >= totalPages}
									className={`rounded-lg border px-3 py-1.5 ${
										safePage >= totalPages
											? "pointer-events-none border-slate-700 text-slate-500"
											: "border-violet-400/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20"
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
