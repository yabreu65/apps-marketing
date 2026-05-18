import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	getChatFunnelEvents,
	summarizeChatFunnel,
	trackChatFunnelEvent,
} from "@/lib/chat-funnel";

describe("chat-funnel", () => {
	beforeEach(() => {
		const store = new Map<string, string>();

		vi.stubGlobal("window", {
			localStorage: {
				getItem: (key: string) => store.get(key) ?? null,
				setItem: (key: string, value: string) => {
					store.set(key, value);
				},
			},
		});
	});

	it("guarda eventos en localStorage", () => {
		trackChatFunnelEvent("chat_open");
		trackChatFunnelEvent("chat_first_message");
		trackChatFunnelEvent("chat_cta_click", {
			kind: "form",
			position: "primary",
		});
		trackChatFunnelEvent("chat_form_submit", { source: "contact_form" });

		const events = getChatFunnelEvents();
		const summary = summarizeChatFunnel(events);

		expect(events).toHaveLength(4);
		expect(events[0].name).toBe("chat_open");
		expect(events[2].meta?.kind).toBe("form");
		expect(summary.open).toBe(1);
		expect(summary.firstMessage).toBe(1);
		expect(summary.ctaClick).toBe(1);
		expect(summary.formSubmit).toBe(1);
		expect(summary.rates.openToFirstMessage).toBe(100);
	});
});
