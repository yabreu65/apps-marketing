import { describe, expect, it } from "vitest";

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

describe("public widget behavior coverage", () => {
	it("keeps mobile trigger reachable with safe-area spacing and touch target", () => {
		const trigger = getFloatingTriggerMetadata();

		expect(trigger.containerClass).toContain("env(safe-area-inset-bottom)");
		expect(trigger.minTapTargetPx).toBeGreaterThanOrEqual(44);
		expect(trigger.buttonClass).toContain("min-h-11");
	});

	it("keeps header compact on mobile while preserving purpose/status readability", () => {
		const header = getHeaderLayoutMetadata();

		expect(header.compactPaddingClass).toContain("py-2.5");
		expect(header.maxMobileRows).toBeLessThanOrEqual(2);
		expect(header.statusClass).toContain("text-[10px]");
	});

	it("does not let quick replies block free typed input", () => {
		const quickReplies = getQuickRepliesPresentation({
			hasUserMessage: false,
			quickReplyCount: 5,
		});
		const composer = resolveComposerAvailability({
			hasState: true,
			isResponding: false,
		});

		expect(quickReplies.showQuickReplies).toBe(true);
		expect(composer.isComposerDisabled).toBe(false);
		expect(composer.blockingReasons).toEqual([]);
	});

	it("adapts quick replies for mobile density without hiding desktop flow", () => {
		const quickReplies = getQuickRepliesPresentation({
			hasUserMessage: false,
			quickReplyCount: 5,
		});

		expect(quickReplies.containerClass).toContain("max-h-20");
		expect(quickReplies.containerClass).toContain("overflow-y-auto");
		expect(quickReplies.containerClass).toContain("sm:max-h-none");
	});

	it("keeps visitor and assistant messages readable and visually separated", () => {
		const assistantBubble = getMessageBubblePresentation("assistant", true);
		const visitorBubble = getMessageBubblePresentation("visitor", false);

		expect(assistantBubble.wrapperClass).toContain("justify-start");
		expect(visitorBubble.wrapperClass).toContain("justify-end");
		expect(assistantBubble.bubbleClass).toContain("leading-relaxed");
		expect(visitorBubble.bubbleClass).toContain("leading-relaxed");
		expect(assistantBubble.bubbleClass).not.toEqual(visitorBubble.bubbleClass);
		expect(assistantBubble.animationStyle).toBe("messagePopIn 180ms ease-out");
	});

	it("keeps utility actions below conversion CTAs in semantic hierarchy", () => {
		const hierarchy = getHandoffActionHierarchy({
			hasPrimaryFormCta: true,
			hasSecondaryWhatsAppCta: true,
		});

		expect(hierarchy[0]?.kind).toBe("form");
		expect(hierarchy[0]?.tier).toBe("primary");
		expect(hierarchy[1]?.kind).toBe("whatsapp_manual");
		expect(hierarchy[1]?.tier).toBe("secondary");
		expect(hierarchy[2]?.kind).toBe("copy_summary");
		expect(hierarchy[2]?.tier).toBe("tertiary");
	});

	it("keeps mobile sheet internals scrollable while composer remains reachable", () => {
		const shellOpen = buildWidgetShellClasses(true);
		const layout = getScrollAndComposerLayout();

		expect(shellOpen).toContain("max-h-[min(88dvh,44rem)]");
		expect(layout.messagesClass).toContain("overflow-y-auto");
		expect(layout.composerClass).toContain("sticky bottom-0");
		expect(layout.composerClass).toContain("env(safe-area-inset-bottom)");
	});
});
