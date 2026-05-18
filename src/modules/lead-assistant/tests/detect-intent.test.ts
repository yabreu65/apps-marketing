import { describe, expect, it } from "vitest";

import { detectLeadAssistantIntent } from "@/modules/lead-assistant/core/detect-intent";

describe("detectLeadAssistantIntent", () => {
	it("detecta lead_followup_priority para consultas perdidas en WhatsApp/Instagram", () => {
		const result = detectLeadAssistantIntent(
			"Recibo consultas por WhatsApp e Instagram pero se me olvidan y no sé priorizarlas.",
		);

		expect(result.intent).toBe("lead_followup_priority");
		expect(result.confidence).toBeGreaterThan(0.8);
	});

	it("detecta pricing para preguntas de costos", () => {
		const result = detectLeadAssistantIntent(
			"¿Cuánto cuesta una solución así?",
		);

		expect(result.intent).toBe("pricing");
		expect(result.questionType).toBe("pricing");
	});

	it("no clasifica lead_followup_priority solo por mencionar WhatsApp", () => {
		const result = detectLeadAssistantIntent(
			"Quiero una landing para captar más consultas desde WhatsApp.",
		);

		expect(result.intent).toBe("landing");
	});

	it("detecta not_sure cuando el visitante compara varias opciones", () => {
		const result = detectLeadAssistantIntent(
			"Tengo un negocio de servicios y no sé si necesito landing, web o IA para empezar.",
		);

		expect(result.intent).toBe("not_sure");
		expect(result.questionType).toBe("unknown");
	});

	it("cae en not_sure cuando no hay señales claras", () => {
		const result = detectLeadAssistantIntent(
			"Quiero mejorar mi negocio pero no sé por dónde empezar.",
		);

		expect(result.intent).toBe("not_sure");
	});


	it('detecta landing para señal retail simple "vendo ropa"', () => {
		const result = detectLeadAssistantIntent('vendo ropa');

		expect(result.intent).toBe('landing');
	});

	it('interpreta "quiero vender online" como consulta de captacion/landing', () => {
		const result = detectLeadAssistantIntent('quiero vender online');

		expect(['landing', 'not_sure']).toContain(result.intent);
	});

	it('interpreta "necesito algo barato" sin inventar pricing fijo', () => {
		const result = detectLeadAssistantIntent('necesito algo barato');

		expect(result.intent).toBe('not_sure');
	});

	it("detecta lead_followup_priority en retail con pérdida explícita de consultas", () => {
		const result = detectLeadAssistantIntent(
			"Tengo un negocio de venta de artículos, vendo por Instagram y WhatsApp, pero pierdo muchas consultas.",
		);

		expect(result.intent).toBe("lead_followup_priority");
	});

	it('detecta questionType definition en preguntas tipo "qué es"', () => {
		const result = detectLeadAssistantIntent("¿Qué es una landing?");

		expect(result.questionType).toBe("definition");
	});

	it('no confunde "facial" con intención de IA', () => {
		const result = detectLeadAssistantIntent(
			"Tengo un negocio que vende artículos de limpieza facial, ¿qué me recomendás?",
		);

		expect(result.intent).not.toBe("ai_automation");
	});
});
