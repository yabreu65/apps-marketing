import { describe, expect, it } from "vitest";

import {
	buildPublicLeadHandoffSummary,
	buildPublicLeadHandoffWhatsAppMessage,
	formatPublicLeadHandoffSummary,
	getLatestVisitorMessage,
} from "@/modules/lead-assistant/core/handoff-summary";

describe("buildPublicLeadHandoffSummary", () => {
	it("genera resumen con campos útiles para handoff comercial", () => {
		const summary = buildPublicLeadHandoffSummary({
			intent: "lead_followup_priority",
			memory: {
				summary: "Interés principal: seguimiento y priorización de consultas.",
				interests: ["lead_followup_priority"],
				lastTopic: "lead_followup_priority",
				updatedAt: new Date().toISOString(),
			},
			latestVisitorMessage:
				"Recibo consultas por WhatsApp e Instagram y se me pasan varias, quiero ordenarlo cuanto antes.",
		});

		expect(summary.projectType.toLowerCase()).toContain("seguimiento");
		expect(summary.probableService.toLowerCase()).toContain("seguimiento");
		expect(summary.urgencyLevel).toBe("Alta");
		expect(summary.clarityLevel).toBe("Alta");
		expect(summary.timelineSignal).toBe("Inmediato");
		expect(summary.commercialPriority).toBe("high");
		expect(summary.nextRecommendedStep.length).toBeGreaterThan(10);
	});

	it("no inventa información cuando faltan datos", () => {
		const summary = buildPublicLeadHandoffSummary({
			intent: "not_sure",
			memory: null,
			latestVisitorMessage: null,
		});

		expect(summary.mainGoalOrProblem).toBe("Dato pendiente");
		expect(summary.probableService).toBe("Dato pendiente");
		expect(summary.urgencyLevel).toBe("Dato pendiente");
		expect(summary.timelineSignal).toBe("Dato pendiente");
		expect(summary.commercialPriority).toBe("low");
	});

	it("formatea resumen y mensaje de WhatsApp manual de forma legible", () => {
		const summary = buildPublicLeadHandoffSummary({
			intent: "landing",
			memory: null,
			latestVisitorMessage:
				"Necesito captar más consultas con una oferta clara.",
		});

		const formatted = formatPublicLeadHandoffSummary(summary);
		const whatsappMessage = buildPublicLeadHandoffWhatsAppMessage(summary);

		expect(formatted).toContain("Tipo de proyecto:");
		expect(formatted).toContain("Objetivo/problema:");
		expect(whatsappMessage).toContain("Resumen para contacto");
		expect(whatsappMessage).toContain("Prioridad comercial:");
		expect(whatsappMessage).toContain("Siguiente paso recomendado:");
	});

	it("toma el último mensaje del visitante cuando hay múltiples turnos", () => {
		const latest = getLatestVisitorMessage([
			{
				id: "v1",
				role: "visitor",
				content: "Primer contexto",
				createdAt: "2026-01-01T10:00:00.000Z",
			},
			{
				id: "a1",
				role: "assistant",
				content: "Respuesta",
				createdAt: "2026-01-01T10:00:05.000Z",
			},
			{
				id: "v2",
				role: "visitor",
				content: "Último contexto relevante",
				createdAt: "2026-01-01T10:00:10.000Z",
			},
		]);

		expect(latest).toBe("Último contexto relevante");
	});

	it("retorna null cuando no hay mensajes del visitante", () => {
		const latest = getLatestVisitorMessage([
			{
				id: "a1",
				role: "assistant",
				content: "Solo asistente",
				createdAt: "2026-01-01T10:00:05.000Z",
			},
		]);

		expect(latest).toBeNull();
	});
});
