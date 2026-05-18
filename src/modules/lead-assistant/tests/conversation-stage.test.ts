import { describe, expect, it } from "vitest";

import { determinePublicAssistantConversationStage } from "@/modules/lead-assistant/core/conversation-stage";

describe("determinePublicAssistantConversationStage", () => {
	it("marca first_contact para primera consulta ambigua sin memoria", () => {
		const stage = determinePublicAssistantConversationStage({
			visitorMessage: "Estoy arrancando y no sé qué necesito",
			detectedIntent: {
				intent: "not_sure",
				confidence: 0.7,
				signals: ["diagnóstico"],
			},
			memory: null,
			previousVisitorMessages: 0,
		});

		expect(stage).toBe("first_contact");
	});

	it("marca recommendation cuando el usuario pide qué hacer primero", () => {
		const stage = determinePublicAssistantConversationStage({
			visitorMessage: "Ya vendo por Instagram, ¿qué debería hacer primero?",
			detectedIntent: {
				intent: "not_sure",
				confidence: 0.7,
				signals: ["diagnóstico"],
			},
			memory: null,
			previousVisitorMessages: 2,
		});

		expect(stage).toBe("recommendation");
	});

	it("marca objection cuando la pregunta trae objeción", () => {
		const stage = determinePublicAssistantConversationStage({
			visitorMessage: "¿Me garantizan ventas?",
			detectedIntent: {
				intent: "not_sure",
				confidence: 0.7,
				signals: ["objeción"],
				questionType: "objection",
			},
			memory: null,
			previousVisitorMessages: 1,
		});

		expect(stage).toBe("objection");
	});
});
