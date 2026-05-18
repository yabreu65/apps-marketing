export type ChatFunnelEventName =
	| "chat_open"
	| "chat_first_message"
	| "chat_cta_click"
	| "chat_form_start"
	| "chat_form_submit";

export type ChatFunnelEvent = {
	name: ChatFunnelEventName;
	timestamp: string;
	meta?: Record<string, string>;
};

export type ChatFunnelSummary = {
	open: number;
	firstMessage: number;
	ctaClick: number;
	formStart: number;
	formSubmit: number;
	rates: {
		openToFirstMessage: number;
		firstMessageToCta: number;
		ctaToFormSubmit: number;
	};
};

const STORAGE_KEY = "apps_marketing_chat_funnel_events";

export function trackChatFunnelEvent(
	name: ChatFunnelEventName,
	meta?: Record<string, string>,
) {
	if (typeof window === "undefined") return;

	const event: ChatFunnelEvent = {
		name,
		timestamp: new Date().toISOString(),
		meta,
	};

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		const events = raw ? ((JSON.parse(raw) as ChatFunnelEvent[]) ?? []) : [];
		events.push(event);
		window.localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(events.slice(-300)),
		);
	} catch {
		// ignore storage errors in UX path
	}

	console.info("[chat-funnel]", event);
}

export function getChatFunnelEvents(): ChatFunnelEvent[] {
	if (typeof window === "undefined") return [];

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? ((JSON.parse(raw) as ChatFunnelEvent[]) ?? []) : [];
	} catch {
		return [];
	}
}

function safeRate(numerator: number, denominator: number) {
	if (denominator <= 0) return 0;
	return Math.round((numerator / denominator) * 100);
}

export function summarizeChatFunnel(
	events: ChatFunnelEvent[],
): ChatFunnelSummary {
	const open = events.filter((event) => event.name === "chat_open").length;
	const firstMessage = events.filter(
		(event) => event.name === "chat_first_message",
	).length;
	const ctaClick = events.filter(
		(event) => event.name === "chat_cta_click",
	).length;
	const formStart = events.filter(
		(event) => event.name === "chat_form_start",
	).length;
	const formSubmit = events.filter(
		(event) => event.name === "chat_form_submit",
	).length;

	return {
		open,
		firstMessage,
		ctaClick,
		formStart,
		formSubmit,
		rates: {
			openToFirstMessage: safeRate(firstMessage, open),
			firstMessageToCta: safeRate(ctaClick, firstMessage),
			ctaToFormSubmit: safeRate(formSubmit, ctaClick),
		},
	};
}
