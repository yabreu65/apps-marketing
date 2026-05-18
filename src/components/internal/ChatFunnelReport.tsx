"use client";

import { useMemo } from "react";

import { getChatFunnelEvents, summarizeChatFunnel } from "@/lib/chat-funnel";

export function ChatFunnelReport() {
	const events = useMemo(() => getChatFunnelEvents(), []);
	const summary = useMemo(() => summarizeChatFunnel(events), [events]);
	const recentEvents = useMemo(() => events.slice(-20).reverse(), [events]);

	return (
		<section className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<p className="text-xs font-medium uppercase tracking-wide text-slate-300">
					Funnel del chat (navegador actual)
				</p>
				<p className="text-xs text-slate-400">
					Eventos locales para optimizar conversión.
				</p>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
				<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
					<p className="text-xs text-slate-400">Chat open</p>
					<p className="mt-1 text-xl font-semibold text-slate-100">
						{summary.open}
					</p>
				</article>
				<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
					<p className="text-xs text-slate-400">First message</p>
					<p className="mt-1 text-xl font-semibold text-violet-300">
						{summary.firstMessage}
					</p>
				</article>
				<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
					<p className="text-xs text-slate-400">CTA click</p>
					<p className="mt-1 text-xl font-semibold text-orange-300">
						{summary.ctaClick}
					</p>
				</article>
				<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
					<p className="text-xs text-slate-400">Form start</p>
					<p className="mt-1 text-xl font-semibold text-sky-300">
						{summary.formStart}
					</p>
				</article>
				<article className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-panel)]/80 p-3">
					<p className="text-xs text-slate-400">Form submit</p>
					<p className="mt-1 text-xl font-semibold text-emerald-300">
						{summary.formSubmit}
					</p>
				</article>
			</div>

			<div className="grid gap-3 sm:grid-cols-3">
				<p className="text-xs text-slate-300">
					open → first message:{" "}
					<span className="font-semibold text-slate-100">
						{summary.rates.openToFirstMessage}%
					</span>
				</p>
				<p className="text-xs text-slate-300">
					first message → cta:{" "}
					<span className="font-semibold text-slate-100">
						{summary.rates.firstMessageToCta}%
					</span>
				</p>
				<p className="text-xs text-slate-300">
					cta → submit:{" "}
					<span className="font-semibold text-slate-100">
						{summary.rates.ctaToFormSubmit}%
					</span>
				</p>
			</div>

			<div className="overflow-x-auto rounded-lg border border-[var(--border-panel)]">
				<table className="min-w-full divide-y divide-[var(--border-panel)] text-xs">
					<thead className="bg-[var(--bg-panel)] text-slate-300">
						<tr>
							<th className="px-3 py-2 text-left font-medium">Evento</th>
							<th className="px-3 py-2 text-left font-medium">Timestamp</th>
							<th className="px-3 py-2 text-left font-medium">Meta</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[var(--border-panel)] bg-[var(--bg-panel-soft)] text-slate-200">
						{recentEvents.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-3 py-3 text-slate-400">
									Sin eventos todavía.
								</td>
							</tr>
						) : (
							recentEvents.map((event, index) => (
								<tr key={`${event.timestamp}-${index}`}>
									<td className="px-3 py-2">{event.name}</td>
									<td className="px-3 py-2">
										{new Date(event.timestamp).toLocaleString()}
									</td>
									<td className="px-3 py-2">
										{event.meta ? JSON.stringify(event.meta) : "-"}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
