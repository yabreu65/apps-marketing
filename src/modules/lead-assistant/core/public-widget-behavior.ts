export type MessageRole = "assistant" | "visitor";

export type QuickRepliesPresentationInput = {
	hasUserMessage: boolean;
	quickReplyCount: number;
};

export type ComposerAvailabilityInput = {
	hasState: boolean;
	isResponding: boolean;
};

export type HandoffAction = {
	kind: "form" | "whatsapp_manual" | "copy_summary";
	tier: "primary" | "secondary" | "tertiary";
};

export function getFloatingTriggerMetadata() {
	return {
		containerClass:
			"fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-2 right-2 z-50 w-auto max-w-[420px] sm:bottom-6 sm:left-auto sm:right-6 sm:w-[420px]",
		buttonClass:
			"rounded-full border border-violet-300/20 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-2.5 text-xs font-semibold text-[var(--warm-white)] shadow-[0_16px_38px_rgba(124,58,237,0.42)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--purple-soft)] min-h-11 sm:px-4 sm:py-3 sm:text-sm",
		minTapTargetPx: 44,
	} as const;
}

export function buildWidgetShellClasses(isOpen: boolean) {
	const baseClass =
		"flex w-full flex-col overflow-hidden rounded-[1.35rem] border bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] backdrop-blur-xl transition-all duration-200 ease-out";
	const openStateClass =
		"max-h-[min(88dvh,44rem)] translate-y-0 scale-100 border-violet-400/25 opacity-100 shadow-[0_28px_90px_rgba(2,6,23,0.85),0_0_48px_rgba(124,58,237,0.22)] sm:max-h-[82vh]";
	const closedStateClass =
		"pointer-events-none max-h-0 translate-y-2 scale-[0.98] border-transparent opacity-0 shadow-none";

	return `${baseClass} ${isOpen ? openStateClass : closedStateClass}`;
}

export function getHeaderLayoutMetadata() {
	return {
		compactPaddingClass: "px-4 py-2.5 sm:py-3",
		statusClass: "relative mt-2 flex items-center gap-2 text-[10px] text-emerald-200/90",
		maxMobileRows: 2,
	} as const;
}

export function getQuickRepliesPresentation({
	hasUserMessage,
	quickReplyCount,
}: QuickRepliesPresentationInput) {
	const showQuickReplies = !hasUserMessage;
	const shouldUseCompactMobileDensity = showQuickReplies && quickReplyCount > 3;

	return {
		showQuickReplies,
		containerClass: shouldUseCompactMobileDensity
			? "mb-3 flex max-h-20 flex-wrap gap-1.5 overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible"
			: "mb-3 flex flex-wrap gap-1.5",
		shouldUseCompactMobileDensity,
	} as const;
}

export function resolveComposerAvailability({
	hasState,
	isResponding,
}: ComposerAvailabilityInput) {
	const blockingReasons: Array<"missing_state" | "responding"> = [];

	if (!hasState) {
		blockingReasons.push("missing_state");
	}

	if (isResponding) {
		blockingReasons.push("responding");
	}

	return {
		isComposerDisabled: blockingReasons.length > 0,
		blockingReasons,
	} as const;
}

export function getMessageBubblePresentation(role: MessageRole, isLatest: boolean) {
	const wrapperClass = role === "assistant" ? "justify-start" : "justify-end";
	const bubbleClass =
		role === "assistant"
			? "max-w-[88%] whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/[0.055] px-3.5 py-2.5 text-sm leading-relaxed text-slate-100 shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
			: "max-w-[88%] whitespace-pre-wrap rounded-2xl bg-gradient-to-br from-[var(--orange-cta)] to-[var(--orange-hover)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--warm-white)] shadow-[0_12px_28px_rgba(249,115,22,0.18)]";

	return {
		wrapperClass,
		bubbleClass,
		animationStyle: isLatest ? "messagePopIn 180ms ease-out" : undefined,
	} as const;
}

export function getHandoffActionHierarchy({
	hasPrimaryFormCta,
	hasSecondaryWhatsAppCta,
}: {
	hasPrimaryFormCta: boolean;
	hasSecondaryWhatsAppCta: boolean;
}) {
	const hierarchy: HandoffAction[] = [];

	if (hasPrimaryFormCta) {
		hierarchy.push({ kind: "form", tier: "primary" });
	}

	if (hasSecondaryWhatsAppCta) {
		hierarchy.push({ kind: "whatsapp_manual", tier: "secondary" });
	}

	hierarchy.push({ kind: "copy_summary", tier: "tertiary" });

	return hierarchy;
}

export function getScrollAndComposerLayout() {
	return {
		messagesClass:
			"min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.12),transparent_32%),rgba(2,6,23,0.96)] px-3.5 py-4 sm:px-4",
		composerClass:
			"sticky bottom-0 border-t border-violet-300/15 bg-[rgba(15,23,42,0.98)] px-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4 sm:pb-3",
	} as const;
}
