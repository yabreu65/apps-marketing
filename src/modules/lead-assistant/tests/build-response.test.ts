import { describe, expect, it } from "vitest";

import { appsMarketingAssistantConfig } from "@/modules/lead-assistant/config/appsMarketingAssistantConfig";
import { buildPublicLeadAssistantResponse } from "@/modules/lead-assistant/core/build-response";

describe("buildPublicLeadAssistantResponse", () => {
	it("para lead_followup_priority prioriza dashboard sobre landing", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Pierdo consultas de WhatsApp e Instagram",
				detectedIntent: {
					intent: "lead_followup_priority",
					confidence: 0.93,
					signals: ["seguimiento"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain("dashboard");
		expect(reply.text.toLowerCase()).not.toContain("landing nueva");
		expect(reply.ctas).toHaveLength(2);
	});

	it("en pricing no inventa precio fijo", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Cuánto cuesta?",
				detectedIntent: {
					intent: "pricing",
					confidence: 0.9,
					signals: ["pricing"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain("depende");
		expect(reply.text).not.toMatch(/\$\d+/);
		expect(reply.text.toLowerCase()).toContain("siguiente paso recomendado");
		expect(reply.text.toLowerCase()).toMatch(/formulario|whatsapp manual/);
	});

	it("en not_sure orienta a diagnóstico como próximo paso", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "No sé qué necesito para empezar",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.87,
					signals: ["diagnóstico inicial"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain("siguiente paso recomendado");
		expect(reply.text.toLowerCase()).toContain("diagnóstico");
	});

	it("da una recomendación específica para negocio retail", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage:
					"Tengo un negocio de venta de artículos y vendo por Instagram.",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.87,
					signals: ["diagnóstico inicial"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain("venta de artículos");
		expect(reply.text.toLowerCase()).toContain("web catálogo");
		expect(reply.text.toLowerCase()).toContain("siguiente paso recomendado");
		expect(reply.followUpQuestion?.toLowerCase()).toContain(
			"qué artículos vendes",
		);
	});

	it('responde de forma orientativa cuando el usuario dice "vendo ropa"', () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: 'vendo ropa',
				detectedIntent: {
					intent: 'not_sure',
					confidence: 0.6,
					signals: ['ambiguo'],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toMatch(/diagnóstico|camino por fases/);
		expect(reply.text.toLowerCase()).toContain('siguiente paso recomendado');
	});

	it('responde retail para "tengo una tienda de ropa"', () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: 'tengo una tienda de ropa',
				detectedIntent: {
					intent: 'not_sure',
					confidence: 0.7,
					signals: ['retail'],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain('web catálogo');
	});

	it('responde retail para "vendo por instagram y whatsapp"', () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: 'vendo por instagram y whatsapp',
				detectedIntent: {
					intent: 'not_sure',
					confidence: 0.7,
					signals: ['retail'],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toMatch(/instagram|whatsapp/);
	});

	it('en "pierdo muchas consultas" prioriza seguimiento', () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: 'pierdo muchas consultas',
				detectedIntent: {
					intent: 'lead_followup_priority',
					confidence: 0.93,
					signals: ['seguimiento'],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain('seguimiento');
	});

	it("en retail con pérdida de consultas prioriza seguimiento antes de landing/web", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage:
					"Tengo un negocio de venta de artículos, vendo por Instagram y WhatsApp, pero pierdo muchas consultas. ¿Qué me recomiendas?",
				detectedIntent: {
					intent: "lead_followup_priority",
					confidence: 0.94,
					signals: ["seguimiento", "priorización"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const normalizedText = reply.text.toLowerCase();
		expect(normalizedText).toContain("seguimiento");
		expect(normalizedText).toMatch(/consultas|leads/);
		expect(normalizedText).toMatch(/instagram|whatsapp/);
		expect(normalizedText).toContain("estados");
		expect(normalizedText).toContain("prioridad");
		expect(normalizedText).toMatch(/recordatorios|responder primero/);
		expect(normalizedText).toMatch(/resumen diario|métricas básicas/);
		expect(normalizedText).toContain("siguiente paso recomendado");
		expect(reply.followUpQuestion?.toLowerCase()).toContain(
			"cuántas consultas",
		);
	});

	it("responde ecommerce completo por fases sin prometer todo de entrada", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Me puedes hacer una tienda online completa?",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.7,
					signals: ["tienda online"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("fases");
		expect(text).toMatch(/web cat[aá]logo|whatsapp/);
		expect(text).toContain("pagos online");
		expect(text).toContain("envíos");
		expect(text).toContain("siguiente paso recomendado");
	});

	it("en garantía de ventas evita promesas y propone mejora medible", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Me garantizan ventas?",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.7,
					signals: ["garantía"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("no sería responsable garantizar ventas");
		expect(text).toMatch(/conversi[oó]n|cta|seguimiento|m[eé]tricas/);
		expect(text).toContain("siguiente paso recomendado");
	});

	it("compara landing vs web profesional con criterio de decisión", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Qué diferencia hay entre landing y web profesional?",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.8,
					signals: ["comparación"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toMatch(/landing.*conversi[oó]n rápida|oferta puntual/);
		expect(text).toMatch(/web profesional.*confianza|negocio completo/);
		expect(text).toContain("siguiente paso recomendado");
	});

	it("para meta api aclara fase futura y propone manual + seguimiento interno", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Me conectas esto con Meta API ya?",
				detectedIntent: {
					intent: "human_help",
					confidence: 0.8,
					signals: ["meta"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("fase futura");
		expect(text).toMatch(/requisitos|costos|aprobaciones|configuraci[oó]n/);
		expect(text).toMatch(/contacto manual|seguimiento interno/);
		expect(text).toContain("siguiente paso recomendado");
	});

	it("para usuario perdido da guía humana por fases", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Estoy arrancando y estoy perdido.",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.7,
					signals: ["inicio"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("está bien");
		expect(text).toMatch(/por fases|oferta|objetivo inicial/);
		expect(text).toMatch(/landing|web m[ií]nima/);
		expect(text).toMatch(/seguimiento simple de consultas/);
		expect(text).toContain("siguiente paso recomendado");
	});

	it('trata "garantizar resultados" igual que garantía de ventas', () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Entonces ustedes no garantizan resultados?",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.7,
					signals: ["objeción"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("no sería responsable garantizar ventas");
		expect(text).toContain("siguiente paso recomendado");
	});

	it("aclara whatsapp automático como segunda etapa", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿WhatsApp automático sería para una segunda etapa?",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.7,
					signals: ["whatsapp"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("segunda etapa");
		expect(text).toMatch(/seguimiento manual|proceso claro/);
		expect(text).toContain("siguiente paso recomendado");
	});

	it("responde con checklist cuando preguntan qué preparar antes de una web", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Qué necesito tener listo antes de pedir una web?",
				detectedIntent: {
					intent: "web_professional",
					confidence: 0.84,
					signals: ["web"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toMatch(/oferta principal|público objetivo|canal de contacto/);
		expect(text).toContain("checklist");
		expect(text).toContain("siguiente paso recomendado");
	});

	it("cuando preguntan definición de landing responde concepto y no repite recomendación genérica", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Y qué es una landing?",
				detectedIntent: {
					intent: "landing",
					confidence: 0.84,
					signals: ["captación"],
				},
				memory: {
					summary: "Interés principal: captación con landing comercial.",
					interests: ["landing"],
					lastTopic: "captación",
					updatedAt: new Date().toISOString(),
				},
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("una landing es una página");
		expect(text).toMatch(
			/un solo objetivo comercial|convertir visitas en consultas/,
		);
		expect(text).not.toContain("si te sirve, tomo como referencia");
	});

	it("no reinyecta memoria cuando el mensaje ya coincide con el resumen previo", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Quiero captar más consultas",
				detectedIntent: {
					intent: "landing",
					confidence: 0.84,
					signals: ["captación"],
				},
				memory: {
					summary: "Interés principal: Quiero captar más consultas.",
					interests: ["landing"],
					lastTopic: "captación",
					updatedAt: new Date().toISOString(),
				},
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).not.toContain(
			"si te sirve, tomo como referencia",
		);
	});

	it("agrega apertura más humana en respuestas genéricas", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Quiero captar más consultas",
				detectedIntent: {
					intent: "landing",
					confidence: 0.84,
					signals: ["captación"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(
			reply.text.startsWith("Buen foco.") ||
				reply.text.startsWith("Tiene sentido lo que planteas."),
		).toBe(true);
	});

	it("adapta follow-up cuando faltan datos clave para landing", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Quiero una landing",
				detectedIntent: {
					intent: "landing",
					confidence: 0.84,
					signals: ["captación"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.followUpQuestion?.toLowerCase()).toContain("más consultas");
	});

	it("adapta cierre cuando la pregunta es de pricing", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Cuánto cuesta aprox?",
				detectedIntent: {
					intent: "pricing",
					confidence: 0.9,
					signals: ["pricing"],
					questionType: "pricing",
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		expect(reply.text.toLowerCase()).toContain(
			"para darte una estimación útil",
		);
	});

	it("usa memoria estructurada de forma natural sin repetir resumen técnico", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "¿Qué debería hacer primero?",
				detectedIntent: {
					intent: "not_sure",
					confidence: 0.8,
					signals: ["diagnóstico"],
				},
				memory: {
					summary:
						"Interés principal: seguimiento y priorización de consultas. Etapa: recommendation. Negocio: retail / venta de productos | Canales: Instagram, WhatsApp | Dolores: pierde consultas o seguimiento | Camino sugerido: seguimiento de leads primero; captación como complemento. Último contexto: Tengo una tienda",
					interests: ["lead_followup_priority"],
					lastTopic: "lead_followup_priority",
					updatedAt: new Date().toISOString(),
					conversationStage: "recommendation",
					facts: {
						businessType: "retail / venta de productos",
						channels: ["Instagram", "WhatsApp"],
						painPoints: ["pierde consultas o seguimiento"],
						goals: ["ordenar seguimiento"],
						recommendedPath:
							"seguimiento de leads primero; captación como complemento",
					},
				},
				conversationStage: "recommendation",
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(reply.conversationStage).toBe("recommendation");
		expect(text).toContain("tomo el contexto que ya me diste");
		expect(text).toContain("instagram");
		expect(text).not.toContain("interés principal:");
	});

	it("mantiene tono premium-comercial en landing con diagnóstico breve", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Quiero mejorar la captación con una landing",
				detectedIntent: {
					intent: "landing",
					confidence: 0.91,
					signals: ["captación"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("diagnóstico comercial breve");
		expect(text).toContain("siguiente paso recomendado");
		expect(text).toMatch(/formulario|contacto manual/);
	});

	it("en ia_automation conserva framing por fases sin prometer automatización inmediata", () => {
		const reply = buildPublicLeadAssistantResponse(
			{
				visitorMessage: "Quiero automatizar todo con IA desde el inicio",
				detectedIntent: {
					intent: "ai_automation",
					confidence: 0.9,
					signals: ["ia"],
				},
				memory: null,
			},
			appsMarketingAssistantConfig,
		);

		const text = reply.text.toLowerCase();
		expect(text).toContain("por fases");
		expect(text).toContain("sin prometer automatización inmediata");
		expect(text).toContain("siguiente paso recomendado");
	});

	it("mantiene copy scope-safe y evita claims fuera de fase activa", () => {
		const replies = [
			buildPublicLeadAssistantResponse(
				{
					visitorMessage: "Quiero captar más consultas",
					detectedIntent: {
						intent: "landing",
						confidence: 0.85,
						signals: ["captación"],
					},
					memory: null,
				},
				appsMarketingAssistantConfig,
			),
			buildPublicLeadAssistantResponse(
				{
					visitorMessage: "No sé por dónde empezar",
					detectedIntent: {
						intent: "not_sure",
						confidence: 0.84,
						signals: ["inicio"],
					},
					memory: null,
				},
				appsMarketingAssistantConfig,
			),
			buildPublicLeadAssistantResponse(
				{
					visitorMessage: "Quiero ordenar seguimiento y luego IA",
					detectedIntent: {
						intent: "ai_automation",
						confidence: 0.82,
						signals: ["ia"],
					},
					memory: null,
				},
				appsMarketingAssistantConfig,
			),
		];

		for (const reply of replies) {
			const text = reply.text.toLowerCase();
			expect(text).not.toMatch(/openai|whatsapp cloud api|meta webhook/);
			expect(text).not.toMatch(/enviamos.*autom[aá]tic|respondemos.*autom[aá]tic/);
			expect(text).not.toMatch(/garantizamos ventas|ventas garantizadas/);
		}
	});
});
