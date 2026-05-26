import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { appsMarketingAssistantConfig } from "@/modules/lead-assistant/config/appsMarketingAssistantConfig";

const widgetPath = path.resolve(
	process.cwd(),
	"src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx",
);

function readWidgetSource() {
	return fs.readFileSync(widgetPath, "utf-8");
}

describe("PublicLeadAssistantWidget commercial copy", () => {
	it("uses value-led floating trigger and scoped header copy", () => {
		const source = readWidgetSource();

		expect(source).toContain("Orientación rápida");
		expect(source).toContain("Asistente comercial");
		expect(source).toContain("Diagnóstico guiado");
		expect(source).toContain("contacto manual");
	});

	it("polishes loading, empty and error states with non-technical language", () => {
		const source = readWidgetSource();

		expect(source).toContain("Revisando tu contexto para sugerirte el próximo paso...");
		expect(source).toContain("Todavía no hay mensajes.");
		expect(source).toContain("No pudimos reiniciar el contexto ahora");
	});

	it("prioritizes handoff CTA hierarchy with form-first guidance", () => {
		const source = readWidgetSource();

		expect(source).toContain("Prioridad recomendada");
		expect(source).toContain("Completá el formulario");
		expect(source).toContain("Alternativa rápida");
	});
});

describe("appsMarketingAssistantConfig copy foundation", () => {
	it("keeps greeting concise and value-led", () => {
		expect(appsMarketingAssistantConfig.greeting.toLowerCase()).toContain(
			"2 minutos",
		);
		expect(appsMarketingAssistantConfig.greeting.toLowerCase()).toContain(
			"próximo paso",
		);
	});

	it("keeps quick replies high-intent and scope-safe", () => {
		expect(appsMarketingAssistantConfig.quickReplies.length).toBeLessThanOrEqual(5);
		expect(
			appsMarketingAssistantConfig.quickReplies.some((reply) =>
				reply.label.toLowerCase().includes("más consultas"),
			),
		).toBe(true);

		const quickRepliesText = appsMarketingAssistantConfig.quickReplies
			.map((reply) => reply.label)
			.join(" ")
			.toLowerCase();

		expect(quickRepliesText).not.toMatch(/openai|cloud api|autom[aá]tic/);
	});
});
