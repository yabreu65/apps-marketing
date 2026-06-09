"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { trackChatFunnelEvent } from "@/lib/chat-funnel";
import { buildPublicApiUrl } from "@/lib/public-api-url";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { appsMarketingAssistantConfig } from "@/modules/lead-assistant/config/appsMarketingAssistantConfig";
import { buildTechnicalAIErrorReply } from "@/modules/lead-assistant/core/technical-error-reply";
import {
	buildPublicLeadHandoffSummary,
	buildPublicLeadHandoffWhatsAppMessage,
	formatPublicLeadHandoffSummary,
	getLatestVisitorMessage,
} from "@/modules/lead-assistant/core/handoff-summary";
import { prioritizeAssistantCtas } from "@/modules/lead-assistant/core/suggested-actions";
import {
	clearStoredVisitorKey,
	createFallbackState,
	getOrCreateVisitorKey,
} from "@/modules/lead-assistant/server/public-memory-service";
import type {
	PublicAssistantReply,
	PublicAssistantState,
	PublicChatApiResponse,
	PublicMemoryApiResponse,
} from "@/modules/lead-assistant/types/lead-assistant";

function inferPublicDataPoints(params: {
	latestVisitorMessage: string | null;
	memorySummary: string | null;
}) {
	const message = (params.latestVisitorMessage ?? "").toLowerCase();
	const summary = (params.memorySummary ?? "").toLowerCase();
	const text = `${message} ${summary}`;
	let points = 0;
	if (
		/(ropa|zapatos|farmacia|restaurante|peluquer[ií]a|consultorio|tienda|negocio|servicio)/i.test(
			text,
		)
	)
		points += 1;
	if (/(instagram|whatsapp|local|web|formulario|carrito)/i.test(text)) points += 1;
	if (
		/(pierdo|desorden|consultas|objetivo|captar|presupuesto|precio|propuesta|urgente|r[aá]pido)/i.test(
			text,
		)
	)
		points += 1;
	return points;
}

function shouldShowPublicHandoff(params: {
	lastReply: PublicAssistantReply | null;
	latestVisitorMessage: string | null;
	memorySummary: string | null;
	visitorTurns: number;
}) {
	if (!params.lastReply) return false;
	const message = (params.latestVisitorMessage ?? "").toLowerCase();
	const highIntent =
		/(quiero avanzar|presupuesto|precio|propuesta|contacten|me interesa|quiero contratar|c[oó]mo seguimos|urgente|pasame info|pierdo muchas consultas|no puedo responder)/i.test(
			message,
		);
	const dataPoints = inferPublicDataPoints({
		latestVisitorMessage: params.latestVisitorMessage,
		memorySummary: params.memorySummary,
	});
	if (highIntent) return true;
	if (params.visitorTurns < 2) return false;
	return dataPoints >= 2 && params.lastReply.intent !== "not_sure";
}

export function PublicLeadAssistantWidget() {
	const config = appsMarketingAssistantConfig;
	const [isOpen, setIsOpen] = useState(false);
	const [visitorKey, setVisitorKey] = useState("");
	const [state, setState] = useState<PublicAssistantState | null>(null);
	const [input, setInput] = useState("");
	const [isResponding, setIsResponding] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [lastReply, setLastReply] = useState<PublicAssistantReply | null>(null);
	const [isCopySuccess, setIsCopySuccess] = useState(false);
	const [isHandoffExpanded, setIsHandoffExpanded] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		async function bootstrap() {
			const key = getOrCreateVisitorKey();
			setVisitorKey(key);

			try {
				const response = await fetch(buildPublicApiUrl("/api/public/chat"), {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ visitorKey: key, mode: "state" }),
				});
				const data = (await response.json().catch(() => null)) as
					| PublicChatApiResponse
					| null;

				if (!response.ok || !data?.ok || !data.state) {
					setState(createFallbackState(key, config.greeting));
					return;
				}

				setState(data.state);
			} catch {
				setState(createFallbackState(key, config.greeting));
			}
		}

		void bootstrap();
	}, [config.greeting]);

	const quickReplies = config.quickReplies;
	const messages = useMemo(() => state?.messages ?? [], [state]);
	const latestVisitorMessage = useMemo(
		() => getLatestVisitorMessage(messages),
		[messages],
	);
	const handoffSummary = useMemo(() => {
		if (!lastReply || !state) return null;
		return buildPublicLeadHandoffSummary({
			intent: lastReply.intent,
			memory: state.memory,
			latestVisitorMessage,
		});
	}, [lastReply, latestVisitorMessage, state]);
	const handoffSummaryText = useMemo(
		() => (handoffSummary ? formatPublicLeadHandoffSummary(handoffSummary) : ""),
		[handoffSummary],
	);
	const handoffWhatsAppHref = useMemo(() => {
		if (!handoffSummary) return null;
		return buildWhatsAppLink(
			config.whatsappNumber,
			buildPublicLeadHandoffWhatsAppMessage(handoffSummary),
		);
	}, [config.whatsappNumber, handoffSummary]);

	const hasUserMessage = useMemo(
		() => messages.some((message) => message.role === "visitor"),
		[messages],
	);
	const showQuickReplies = !hasUserMessage;
	const visitorTurns = useMemo(
		() => messages.filter((message) => message.role === "visitor").length,
		[messages],
	);
	const prioritizedCtas = useMemo(
		() => prioritizeAssistantCtas(lastReply?.ctas ?? []),
		[lastReply?.ctas],
	);
	const primaryFormCta = prioritizedCtas[0] ?? null;
	const secondaryWhatsAppCta = prioritizedCtas[1] ?? null;
	const showHandoffCtas = useMemo(
		() =>
			shouldShowPublicHandoff({
				lastReply,
				latestVisitorMessage,
				memorySummary: state?.memory?.summary ?? null,
				visitorTurns,
			}),
		[lastReply, latestVisitorMessage, state?.memory?.summary, visitorTurns],
	);

	useEffect(() => {
		if (!isOpen) return;
		const container = messagesContainerRef.current;
		if (!container) return;

		requestAnimationFrame(() => {
			container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
		});
	}, [isOpen, messages.length, isResponding]);

	function applyLocalFallbackReply() {
		if (!state) return;

		const technicalReply = buildTechnicalAIErrorReply();
		setState((previous) => {
			if (!previous) return previous;
			return {
				...previous,
				messages: [
					...previous.messages,
					{
						id: `local-assistant-${Date.now()}`,
						role: "assistant",
						content: technicalReply,
						createdAt: new Date().toISOString(),
					},
				],
			};
		});

		setLastReply({
			text: technicalReply,
			intent: "not_sure",
			rationale: "Fallback técnico local del widget",
			source: "rules_fallback",
			ctas: [],
		});
		setError(null);
	}

	async function handleSend(rawMessage?: string) {
		if (!state) return;

		const content = (rawMessage ?? input).trim();
		if (!content || isResponding) return;

		setError(null);
		setIsResponding(true);
		setInput("");
		setIsHandoffExpanded(false);

		setState((previous) => {
			if (!previous) return previous;
			return {
				...previous,
				messages: [
					...previous.messages,
					{
						id: `pending-visitor-${Date.now()}`,
						role: "visitor",
						content,
						createdAt: new Date().toISOString(),
					},
				],
			};
		});

		if (!hasUserMessage) {
			trackChatFunnelEvent("chat_first_message", {
				intentHint: lastReply?.intent ?? "unknown",
			});
		}

		try {
			const response = await fetch(buildPublicApiUrl("/api/public/chat"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ visitorKey: state.visitorKey, message: content }),
			});

			const data = (await response.json().catch(() => null)) as
				| PublicChatApiResponse
				| null;
			if (!response.ok || !data?.ok || !data.state || !data.reply) {
				applyLocalFallbackReply();
				return;
			}

			setState(data.state);
			setLastReply(data.reply);
		} catch {
			applyLocalFallbackReply();
		} finally {
			setIsResponding(false);
		}
	}

	async function handleResetMemory() {
		if (!visitorKey) return;
		setError(null);

		try {
			const response = await fetch(
				`${buildPublicApiUrl("/api/public/chat/memory")}?visitorKey=${encodeURIComponent(visitorKey)}`,
				{ method: "DELETE" },
			);
			const data = (await response.json().catch(() => null)) as
				| PublicMemoryApiResponse
				| null;

			if (!response.ok || !data?.ok) {
				setError(
					data?.message ??
						"No pudimos reiniciar el contexto ahora. Probá de nuevo en unos segundos.",
				);
				return;
			}

			clearStoredVisitorKey();
			const nextVisitorKey = getOrCreateVisitorKey();
			setVisitorKey(nextVisitorKey);
			setState(createFallbackState(nextVisitorKey, config.greeting));
			setLastReply(null);
			setIsHandoffExpanded(false);
		} catch {
			setError(
				"No pudimos reiniciar el contexto ahora. Probá de nuevo en unos segundos.",
			);
		}
	}

	async function handleCopySummary() {
		if (!handoffSummaryText) return;
		try {
			await navigator.clipboard.writeText(handoffSummaryText);
			setIsCopySuccess(true);
			setTimeout(() => setIsCopySuccess(false), 2200);
		} catch {
			setError("No pude copiar el resumen. Probá nuevamente.");
		}
	}

	const composerDisabled = !state || isResponding;
	const sendDisabled = composerDisabled || !input.trim();
	return (
		<div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-40 sm:bottom-5 sm:right-5">
			<section
				id="public-lead-assistant-widget"
				aria-label="Asistente comercial público"
				aria-hidden={!isOpen}
				className={`overflow-hidden rounded-3xl border border-[#26324A] bg-[#111827] shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition-all duration-200 ${
					isOpen
						? "pointer-events-auto h-[min(78vh,680px)] w-[min(94vw,420px)] opacity-100"
						: "pointer-events-none h-0 w-[min(94vw,420px)] opacity-0"
				}`}
			>
				<header className="sticky top-0 z-10 border-b border-[#26324A] bg-[#151B2E]/95 px-4 py-3 backdrop-blur">
					<div className="flex items-center justify-between gap-3">
						<div className="flex min-w-0 items-center gap-3">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/15 text-xs font-bold text-[#F8FAFC]">
								AM
							</div>
							<div className="min-w-0">
								<p className="truncate text-sm font-semibold text-[#F8FAFC]">PawTech Studio</p>
								<p className="truncate text-[11px] text-[#CBD5E1]">Diagnóstico rápido con IA · contacto manual</p>
							</div>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="rounded-full border border-[#26324A] bg-[#111827] px-2.5 py-1 text-[11px] text-[#CBD5E1] hover:bg-[#151B2E]"
							aria-label="Minimizar chat"
						>
							Cerrar
						</button>
					</div>
				</header>

				<div
					ref={messagesContainerRef}
					className="h-[calc(100%-152px)] overflow-y-auto bg-[#0B1020] px-3 py-3"
				>
					{messages.length === 0 && !isResponding ? (
						<p className="mb-2.5 text-xs text-[#CBD5E1]">Todavía no hay mensajes.</p>
					) : null}
					{messages.map((message) => {
						const isAssistant = message.role === "assistant";
						return (
							<div
								key={message.id}
								className={`mb-2.5 flex ${isAssistant ? "justify-start" : "justify-end"}`}
							>
								<div
									className={`max-w-[84%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
										isAssistant
											? "border border-[#26324A] bg-[#151B2E] text-[#F8FAFC]"
											: "bg-[#F97316] text-[#fff7ed]"
									}`}
								>
									{message.content}
								</div>
							</div>
						);
					})}

					{isResponding ? (
						<div className="mb-2.5 flex justify-start">
							<div className="flex items-center gap-1 rounded-2xl border border-[#26324A] bg-[#151B2E] px-3 py-2 text-xs text-[#CBD5E1]">
								<span>Revisando tu contexto para sugerirte el próximo paso...</span>
								<span className="chat-dot" />
								<span className="chat-dot animation-delay-150" />
								<span className="chat-dot animation-delay-300" />
							</div>
						</div>
					) : null}

					{showHandoffCtas && lastReply && handoffSummary ? (
						<div className="mt-3 rounded-2xl border border-[#26324A] bg-[#111827] p-3">
							<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
								Prioridad recomendada
							</p>
							<div className="mb-2 flex items-center justify-between gap-2">
								<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
									Resumen
								</p>
								<button
									type="button"
									onClick={() => setIsHandoffExpanded((previous) => !previous)}
									className="rounded-full border border-[#26324A] px-2 py-0.5 text-[10px] text-[#CBD5E1] hover:bg-[#151B2E]"
								>
									{isHandoffExpanded ? "Ocultar" : "Ver resumen"}
								</button>
							</div>
							{isHandoffExpanded ? (
								<p className="mb-2 text-[11px] leading-relaxed text-[#CBD5E1]">
									{handoffSummaryText}
								</p>
							) : null}
							<div className="grid gap-2 sm:grid-cols-2">
								<a
									href={handoffWhatsAppHref ?? secondaryWhatsAppCta?.href ?? "#"}
									target="_blank"
									rel="noreferrer"
									className="rounded-xl bg-[#F97316] px-3 py-2 text-center text-xs font-semibold text-[#fff7ed] hover:bg-[#EA580C]"
								>
									Alternativa rápida: Enviar por WhatsApp
								</a>
								<button
									type="button"
									onClick={() => {
										void handleCopySummary();
									}}
									className="rounded-xl border border-[#26324A] px-3 py-2 text-xs font-medium text-[#CBD5E1] hover:bg-[#151B2E]"
								>
									Copiar resumen
								</button>
							</div>
							<a
								href={primaryFormCta?.href ?? config.contactFormAnchor}
								onClick={() => setIsOpen(false)}
								className="mt-2 block rounded-xl border border-[#26324A] px-3 py-2 text-center text-xs font-medium text-[#CBD5E1] hover:bg-[#151B2E]"
							>
								Completá el formulario
							</a>
							{isCopySuccess ? (
								<p className="mt-2 text-[10px] text-emerald-300">Resumen copiado.</p>
							) : null}
						</div>
					) : null}
				</div>

				<div className="sticky bottom-0 border-t border-[#26324A] bg-[#111827] p-3">
					{showQuickReplies ? (
						<div className="mb-2 flex flex-wrap gap-1.5">
							{quickReplies.slice(0, 4).map((reply) => (
								<button
									key={reply.id}
									type="button"
									onClick={() => {
										void handleSend(reply.label);
									}}
									className="rounded-full border border-[#26324A] bg-[#151B2E] px-2.5 py-1 text-[11px] text-[#CBD5E1] hover:border-[#7C3AED]/50 hover:text-[#F8FAFC]"
									disabled={composerDisabled}
								>
									{reply.label}
								</button>
							))}
						</div>
					) : null}

					<form
						onSubmit={(event) => {
							event.preventDefault();
							void handleSend();
						}}
					>
						<label htmlFor="public-assistant-input" className="sr-only">
							Escribe tu mensaje
						</label>
						<div className="flex items-end gap-2 rounded-2xl border border-[#26324A] bg-[#0B1020] p-2 focus-within:border-[#7C3AED]/60">
							<textarea
								id="public-assistant-input"
								value={input}
								onChange={(event) => setInput(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										void handleSend();
									}
								}}
								placeholder="Escribe tu mensaje…"
								rows={1}
								className="max-h-24 min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none"
								disabled={composerDisabled}
							/>
							<button
								type="submit"
								disabled={sendDisabled}
								className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-sm font-semibold text-[#fff7ed] transition hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
								aria-label="Enviar mensaje"
							>
								➤
							</button>
						</div>
					</form>

					{error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}

					<div className="mt-2 flex items-center justify-between gap-2">
						<p className="text-[10px] text-[#94A3B8]">Diagnóstico guiado por PawTech Studio</p>
						<button
							type="button"
							onClick={() => {
								void handleResetMemory();
							}}
							className="rounded-full border border-[#26324A] px-2.5 py-1 text-[10px] text-[#CBD5E1] hover:bg-[#151B2E]"
							aria-label="Borrar contexto de conversación"
						>
							Borrar contexto
						</button>
					</div>
				</div>
			</section>

			<div className="mt-2.5 flex justify-end">
				<button
					type="button"
					onClick={() => {
						setIsOpen((previous) => {
							const next = !previous;
							if (next) trackChatFunnelEvent("chat_open");
							return next;
						});
					}}
					className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-[var(--orange-cta)] px-3 py-2 text-[11px] font-semibold text-[#F8FAFC] shadow-[0_10px_24px_rgba(14,165,233,0.35)] transition hover:bg-[var(--orange-hover)] sm:px-4 sm:text-xs"
					aria-expanded={isOpen}
					aria-controls="public-lead-assistant-widget"
				>
					{isOpen ? null : (
						<Image
							src="/sussy-asesora.png"
							alt="Sussy asesora virtual"
							width={26}
							height={26}
							className="h-6 w-6 rounded-full border border-cyan-200/50 object-cover"
						/>
					)}
					{isOpen ? "Cerrar chat" : "Diagnóstico rápido con IA"}
				</button>
			</div>
		</div>
	);
}
