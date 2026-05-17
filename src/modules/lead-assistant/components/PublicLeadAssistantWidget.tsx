"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackChatFunnelEvent } from "@/lib/chat-funnel";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { appsMarketingAssistantConfig } from "@/modules/lead-assistant/config/appsMarketingAssistantConfig";
import { buildPublicLeadAssistantResponse } from "@/modules/lead-assistant/core/build-response";
import { determinePublicAssistantConversationStage } from "@/modules/lead-assistant/core/conversation-stage";
import { detectLeadAssistantIntent } from "@/modules/lead-assistant/core/detect-intent";
import {
	buildPublicLeadHandoffSummary,
	buildPublicLeadHandoffWhatsAppMessage,
	formatPublicLeadHandoffSummary,
	getLatestVisitorMessage,
} from "@/modules/lead-assistant/core/handoff-summary";
import { buildPublicAssistantMemorySummary } from "@/modules/lead-assistant/core/memory-summary";
import {
	buildWidgetShellClasses,
	getFloatingTriggerMetadata,
	getHandoffActionHierarchy,
	getHeaderLayoutMetadata,
	getMessageBubblePresentation,
	getQuickRepliesPresentation,
	getScrollAndComposerLayout,
	resolveComposerAvailability,
} from "@/modules/lead-assistant/core/public-widget-behavior";
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
				const response = await fetch(
					`/api/public/chat?visitorKey=${encodeURIComponent(key)}`,
				);
				const data = (await response
					.json()
					.catch(() => null)) as PublicChatApiResponse | null;

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
		() =>
			handoffSummary ? formatPublicLeadHandoffSummary(handoffSummary) : "",
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
	const visitorTurns = useMemo(
		() => messages.filter((message) => message.role === "visitor").length,
		[messages],
	);
	const showQuickReplies = !hasUserMessage;
	const hasPendingHandoffData = Boolean(
		handoffSummaryText && handoffSummaryText.includes("Dato pendiente"),
	);
	const shouldShowMiniClose =
		visitorTurns >= 2 && visitorTurns <= 3 && Boolean(lastReply);
	const prioritizedCtas = useMemo(
		() => prioritizeAssistantCtas(lastReply?.ctas ?? []),
		[lastReply?.ctas],
	);
	const primaryFormCta = prioritizedCtas[0] ?? null;
	const secondaryWhatsAppCta = prioritizedCtas[1] ?? null;
	const triggerMetadata = getFloatingTriggerMetadata();
	const headerLayout = getHeaderLayoutMetadata();
	const quickRepliesPresentation = getQuickRepliesPresentation({
		hasUserMessage,
		quickReplyCount: quickReplies.length,
	});
	const composerAvailability = resolveComposerAvailability({
		hasState: Boolean(state),
		isResponding,
	});
	const handoffActionHierarchy = getHandoffActionHierarchy({
		hasPrimaryFormCta: Boolean(primaryFormCta),
		hasSecondaryWhatsAppCta: Boolean(secondaryWhatsAppCta),
	});
	const isCopySummaryTertiary = handoffActionHierarchy.some(
		(action) => action.kind === "copy_summary" && action.tier === "tertiary",
	);
	const scrollAndComposerLayout = getScrollAndComposerLayout();

	useEffect(() => {
		if (!isOpen) return;
		const container = messagesContainerRef.current;
		if (!container) return;
		container.scrollTop = container.scrollHeight;
	}, [isOpen, messages, isResponding, lastReply]);

	function applyLocalFallbackReply(content: string) {
		if (!state) return;

		const now = new Date().toISOString();
		const detectedIntent = detectLeadAssistantIntent(content);
		const conversationStage = determinePublicAssistantConversationStage({
			visitorMessage: content,
			detectedIntent,
			memory: state.memory,
			previousVisitorMessages: visitorTurns,
		});
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: content,
				detectedIntent,
				memory: state.memory,
				conversationStage,
			},
			config,
		);
		const nextMessages = [
			...messages,
			{
				id: `local-visitor-${Date.now()}`,
				role: "visitor" as const,
				content,
				createdAt: now,
			},
			{
				id: `local-assistant-${Date.now()}`,
				role: "assistant" as const,
				content: reply.text,
				intent: reply.intent,
				createdAt: new Date().toISOString(),
			},
		];

		setState({
			...state,
			messages: nextMessages,
			memory: buildPublicAssistantMemorySummary(
				state.memory,
				nextMessages,
				reply.intent,
				conversationStage,
			),
		});
		setLastReply(reply);
		setInput("");
		setIsHandoffExpanded(false);
		setError(null);
	}

	async function handleSend(rawMessage?: string) {
		if (!state) return;

		const content = (rawMessage ?? input).trim();
		if (!content) return;

		setError(null);
		setIsResponding(true);

		if (visitorTurns === 0) {
			trackChatFunnelEvent("chat_first_message", {
				intentHint: lastReply?.intent ?? "unknown",
			});
		}

		try {
			const response = await fetch("/api/public/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					visitorKey: state.visitorKey,
					message: content,
				}),
			});

			const data = (await response
				.json()
				.catch(() => null)) as PublicChatApiResponse | null;

			if (!response.ok || !data?.ok || !data.state || !data.reply) {
				console.warn("[public-chat] API response failed, using local fallback", {
					status: response.status,
					message: data?.message,
				});
				applyLocalFallbackReply(content);
				return;
			}

			setState(data.state);
			setLastReply(data.reply);
			setInput("");
			setIsHandoffExpanded(false);
		} catch {
			console.warn("[public-chat] API request failed, using local fallback");
			applyLocalFallbackReply(content);
		} finally {
			setIsResponding(false);
		}
	}

	async function handleResetMemory() {
		if (!visitorKey) return;

		setError(null);

		try {
			const response = await fetch(
				`/api/public/chat/memory?visitorKey=${encodeURIComponent(visitorKey)}`,
				{
					method: "DELETE",
				},
			);

			const data = (await response
				.json()
				.catch(() => null)) as PublicMemoryApiResponse | null;

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
			const fallback = createFallbackState(nextVisitorKey, config.greeting);
			setState(fallback);
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

	return (
		<div className={triggerMetadata.containerClass}>
			<section
				id="public-lead-assistant-widget"
				aria-label="Asistente comercial público"
				aria-hidden={!isOpen}
				className={buildWidgetShellClasses(isOpen)}
			>
				<header
					className={`relative overflow-hidden border-b border-violet-300/15 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(17,24,39,0.96))] ${headerLayout.compactPaddingClass}`}
				>
					<div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl" />
					<div className="relative flex items-center justify-between gap-3">
						<div className="flex min-w-0 items-center gap-3">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-violet-500/15 text-sm font-bold text-violet-100 shadow-[0_0_24px_rgba(139,92,246,0.25)]">
								AI
							</div>
							<div className="min-w-0">
								<p className="truncate text-sm font-semibold tracking-tight text-[var(--warm-white)]">
									Asistente comercial
								</p>
								<p className="truncate text-[11px] text-[var(--text-soft)]">
									Diagnóstico guiado · contacto manual
								</p>
							</div>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/10 hover:text-white"
							aria-label="Cerrar chat"
						>
							Cerrar
						</button>
					</div>
					<div className={headerLayout.statusClass}>
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
						<span>Modo guía activo · contacto manual</span>
					</div>
				</header>

				<div
					ref={messagesContainerRef}
					className={scrollAndComposerLayout.messagesClass}
				>
					{messages.length === 0 && !isResponding ? (
						<p className="rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-slate-300">
							Todavía no hay mensajes. Contame tu objetivo y te sugiero el
							próximo paso comercial.
						</p>
					) : null}

					{messages.map((message, index) => {
						const isLatest = index === messages.length - 1;
						const bubblePresentation = getMessageBubblePresentation(
							message.role,
							isLatest,
						);

						return (
							<div
								key={message.id}
								className={`flex ${bubblePresentation.wrapperClass}`}
							>
								<p
									className={bubblePresentation.bubbleClass}
									style={
										bubblePresentation.animationStyle
											? { animation: bubblePresentation.animationStyle }
											: undefined
									}
								>
									{message.content}
								</p>
							</div>
						);
					})}

					{isResponding ? (
						<div className="flex justify-start">
							<p className="rounded-full border border-violet-300/15 bg-violet-500/10 px-3 py-1.5 text-xs text-[var(--purple-soft)]">
								Revisando tu contexto para sugerirte el próximo paso...
							</p>
						</div>
					) : null}
					{lastReply ? (
						<div className="mt-1 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 shadow-[0_14px_32px_rgba(0,0,0,0.2)]">
							<p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200/80">
								Siguiente paso sugerido
							</p>
							<p className="mt-1.5 text-xs leading-relaxed text-slate-200">
								{lastReply.followUpQuestion}
							</p>
							{handoffSummary ? (
								<div className="mt-3 rounded-xl border border-violet-300/15 bg-slate-950/45 p-2.5">
									<div className="flex items-center justify-between gap-2">
										<p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--purple-soft)]">
											Resumen para contacto
										</p>
										<button
											type="button"
											onClick={() =>
												setIsHandoffExpanded((previous) => !previous)
											}
											className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-white/10 hover:text-white"
										>
											{isHandoffExpanded ? "Ocultar" : "Ver resumen"}
										</button>
									</div>

									{isHandoffExpanded ? (
										<>
											<ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-slate-200">
												<li>
													<span className="text-slate-400">
														Tipo de proyecto:
													</span>{" "}
													{handoffSummary.projectType}
												</li>
												<li>
													<span className="text-slate-400">
														Objetivo/problema:
													</span>{" "}
													{handoffSummary.mainGoalOrProblem}
												</li>
												<li>
													<span className="text-slate-400">
														Servicio probable:
													</span>{" "}
													{handoffSummary.probableService}
												</li>
												<li>
													<span className="text-slate-400">Urgencia:</span>{" "}
													{handoffSummary.urgencyLevel}
												</li>
												<li>
													<span className="text-slate-400">Claridad:</span>{" "}
													{handoffSummary.clarityLevel}
												</li>
												<li>
													<span className="text-slate-400">Plazo:</span>{" "}
													{handoffSummary.timelineSignal}
												</li>
												<li>
													<span className="text-slate-400">
														Prioridad comercial:
													</span>{" "}
													{handoffSummary.commercialPriority}
												</li>
												<li>
													<span className="text-slate-400">
														Siguiente paso:
													</span>{" "}
													{handoffSummary.nextRecommendedStep}
												</li>
											</ul>

											{hasPendingHandoffData ? (
												<p className="mt-2 text-[10px] text-amber-200">
													Faltan algunos datos para completar el resumen.
												</p>
											) : null}
										</>
									) : null}
								</div>
							) : null}

							{shouldShowMiniClose ? (
								<p className="mt-2 text-[11px] text-[var(--text-secondary)]">
									Si querés, en este paso ya te conviene continuar por un canal
									de contacto para avanzar más rápido.
								</p>
							) : null}

							<div className="mt-3 rounded-xl border border-violet-300/15 bg-slate-950/40 p-2.5">
								<p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-200/80">
									Prioridad recomendada
								</p>
								<p className="mt-1 text-[11px] text-slate-300">
									Completá el formulario para recibir un diagnóstico más claro
									y accionable.
								</p>
								<div className="mt-2.5 grid gap-2">
									<a
										href={primaryFormCta?.href ?? config.contactFormAnchor}
										onClick={() => {
											trackChatFunnelEvent("chat_cta_click", {
												kind: primaryFormCta?.kind ?? "form",
												position: "primary",
											});
											setIsOpen(false);
										}}
										className="rounded-xl bg-[var(--orange-cta)] px-3 py-2.5 text-center text-xs font-semibold text-[var(--warm-white)] shadow-[0_10px_24px_rgba(249,115,22,0.2)] hover:bg-[var(--orange-hover)]"
									>
										{primaryFormCta?.label ??
											"Completar formulario de diagnóstico"}
									</a>

									{secondaryWhatsAppCta ? (
										<a
											href={handoffWhatsAppHref ?? secondaryWhatsAppCta.href}
											target="_blank"
											rel="noreferrer"
											onClick={() => {
												trackChatFunnelEvent("chat_cta_click", {
													kind: secondaryWhatsAppCta.kind,
													position: "secondary",
												});
											}}
											className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-xs font-medium text-slate-200 hover:bg-white/[0.07]"
										>
											Alternativa rápida: {secondaryWhatsAppCta.label}
										</a>
									) : null}
								</div>

								<div className="mt-2.5">
									<button
										type="button"
										onClick={() => {
											void handleCopySummary();
										}}
										className={
											isCopySummaryTertiary
												? "text-[11px] font-medium text-[var(--text-accent-soft)] underline-offset-2 hover:underline"
												: "text-xs text-slate-300"
										}
									>
										Copiar resumen
									</button>
								</div>
							</div>
							<p className="mt-2 text-[10px] leading-relaxed text-slate-500">
								Contacto manual: este enlace solo abre WhatsApp con el resumen
								precargado.
							</p>
							{isCopySuccess ? (
								<p className="mt-1 text-[10px] text-emerald-300">
									Resumen copiado.
								</p>
							) : null}
						</div>
					) : null}

					<p className="mt-3 text-[10px] leading-relaxed text-slate-500">
						{config.privacyNote}
					</p>
				</div>

				<div className={scrollAndComposerLayout.composerClass}>
					{quickRepliesPresentation.showQuickReplies ? (
						<div className={quickRepliesPresentation.containerClass}>
							{quickReplies.map((reply) => (
								<button
									key={reply.id}
									type="button"
									onClick={() => {
										void handleSend(reply.label);
									}}
									className="rounded-full border border-violet-300/20 bg-violet-500/10 px-2.5 py-1 text-[11px] text-violet-100 hover:bg-violet-500/20"
									disabled={composerAvailability.isComposerDisabled}
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
						className="space-y-2"
					>
						<label htmlFor="public-assistant-input" className="sr-only">
							Escribí tu consulta
						</label>
						<div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-1.5 shadow-inner shadow-black/20">
							<input
								id="public-assistant-input"
								type="text"
								value={input}
								onChange={(event) => setInput(event.target.value)}
								placeholder="Contame tu objetivo comercial..."
								className="w-full rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
								disabled={composerAvailability.isComposerDisabled}
							/>
							<button
								type="submit"
								className="rounded-xl bg-gradient-to-r from-[var(--orange-cta)] to-[var(--orange-hover)] px-3.5 py-2 text-sm font-semibold text-[var(--warm-white)] shadow-[0_10px_22px_rgba(249,115,22,0.22)] hover:brightness-105 disabled:opacity-70"
								disabled={composerAvailability.isComposerDisabled}
							>
								Enviar
							</button>
						</div>
					</form>

					{error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}

					<div className="mt-3 flex items-center justify-between gap-2">
						<p className="text-[10px] text-slate-500">
							{process.env.NODE_ENV === "development"
								? `Sesión local activa · ${visitorKey.slice(0, 8)}`
								: "Sesión local activa"}
						</p>
						<button
							type="button"
							onClick={() => {
								void handleResetMemory();
							}}
							className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-400 hover:bg-white/10 hover:text-slate-200"
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
					className={triggerMetadata.buttonClass}
					aria-expanded={isOpen}
					aria-controls="public-lead-assistant-widget"
				>
					{isOpen ? "Cerrar diagnóstico" : "Diagnóstico comercial en 2 minutos"}
				</button>
			</div>

			<style jsx>{`
				@keyframes messagePopIn {
					from {
						opacity: 0;
						transform: translateY(4px) scale(0.98);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}
			`}</style>
		</div>
	);
}
