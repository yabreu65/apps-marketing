import { describe, expect, it } from "vitest";

import { appsMarketingAssistantConfig } from "@/modules/lead-assistant/config/appsMarketingAssistantConfig";
import {
	buildAssistantCtas,
	prioritizeAssistantCtas,
} from "@/modules/lead-assistant/core/suggested-actions";

describe("buildAssistantCtas", () => {
	it("prioriza formulario para intención landing", () => {
		const ctas = buildAssistantCtas("landing", appsMarketingAssistantConfig);

		expect(ctas[0].kind).toBe("form");
		expect(ctas[1].kind).toBe("whatsapp_manual");
		expect(ctas[0].label).toBe("Completar formulario");
		expect(ctas[1].label).toBe("Continuar por WhatsApp");
	});

	it("prioriza formulario para intención pricing", () => {
		const ctas = buildAssistantCtas("pricing", appsMarketingAssistantConfig);

		expect(ctas[0].kind).toBe("form");
		expect(ctas[1].kind).toBe("whatsapp_manual");
	});

	it("prioriza formulario para intención human_help", () => {
		const ctas = buildAssistantCtas("human_help", appsMarketingAssistantConfig);

		expect(ctas[0].kind).toBe("form");
		expect(ctas[1].kind).toBe("whatsapp_manual");
	});

	it("reordena CTAs invertidas para mantener formulario primero", () => {
		const inverted = [...buildAssistantCtas("landing", appsMarketingAssistantConfig)]
			.reverse();
		const prioritized = prioritizeAssistantCtas(inverted);

		expect(prioritized[0]?.kind).toBe("form");
		expect(prioritized[1]?.kind).toBe("whatsapp_manual");
	});
});
