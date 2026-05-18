import { appsMarketingAssistantConfig } from "@/modules/lead-assistant/config/appsMarketingAssistantConfig";
import { buildPublicLeadAssistantResponse } from "@/modules/lead-assistant/core/build-response";
import { detectLeadAssistantIntent } from "@/modules/lead-assistant/core/detect-intent";

type Case = { id: string; prompt: string };

type Score = {
	clarity: number;
	commercialUsefulness: number;
	conversionPush: number;
	scopeSafety: number;
	total: number;
};

const CASES: Case[] = [
	{
		id: "C01",
		prompt:
			"Tengo una clínica odontológica, necesito más turnos y no sé si hacer landing o web completa.",
	},
	{
		id: "C02",
		prompt: "¿Me pueden pasar precio exacto hoy mismo sin reunión?",
	},
	{
		id: "C03",
		prompt:
			"Vendo cursos, me llegan DMs y pierdo seguimiento, ¿qué harían primero?",
	},
	{
		id: "C04",
		prompt: "Quiero automatizar todo con WhatsApp API desde el día 1.",
	},
	{
		id: "C05",
		prompt:
			"Estoy arrancando solo, poco presupuesto, quiero resultados rápidos.",
	},
	{
		id: "C06",
		prompt: "¿Cuánto tardan en tener algo online que me traiga consultas?",
	},
	{
		id: "C07",
		prompt: "Tengo ecommerce chico, ¿hago tienda completa o catálogo primero?",
	},
	{
		id: "C08",
		prompt: "No entiendo nada técnico, necesito que me guíen simple.",
	},
	{ id: "C09", prompt: "Quiero un CRM con IA y dashboard en dos semanas." },
	{
		id: "C10",
		prompt: "Me sirve solo WhatsApp manual por ahora, ¿igual conviene web?",
	},
	{ id: "C11", prompt: "¿Ustedes garantizan duplicar ventas?" },
	{
		id: "C12",
		prompt:
			"Tengo agencia, quiero ordenar pipeline de leads y priorización diaria.",
	},
	{
		id: "C13",
		prompt: "Necesito presencia de marca fuerte, no solo captar rápido.",
	},
	{
		id: "C14",
		prompt: "¿Qué tengo que preparar antes de contratar una web profesional?",
	},
	{ id: "C15", prompt: "Me llegan pocos leads, ¿SEO o Ads o landing primero?" },
	{
		id: "C16",
		prompt: "¿Pueden integrarse con Meta API y OpenAI directo ahora?",
	},
	{
		id: "C17",
		prompt: "Quiero validar MVP SaaS para inmobiliarias, cero código todavía.",
	},
	{
		id: "C18",
		prompt: "No tengo tiempo, díganme solo el primer paso concreto.",
	},
	{
		id: "C19",
		prompt: "Tengo tráfico pero no convierto, ¿qué revisarían primero?",
	},
	{
		id: "C20",
		prompt: "¿Qué canal recomiendan para seguimiento comercial inicial?",
	},
];

function scoreReply(text: string): Score {
	const t = text.toLowerCase();

	const clarity =
		(/siguiente paso recomendado/.test(t) ? 2 : 0) +
		(t.length > 120 ? 1 : 0) +
		(/(primero|después|por fases|conviene)/.test(t) ? 2 : 0);

	const commercialUsefulness =
		(/(conversi|cta|seguimiento|diagnóstico|canal|objetivo)/.test(t) ? 2 : 0) +
		(/(landing|web|dashboard|mvp|ia|seo)/.test(t) ? 2 : 0) +
		(/(pregunta|contame|compart)/.test(t) ? 1 : 0);

	const conversionPush =
		(/(formulario|whatsapp manual)/.test(t) ? 2 : 0) +
		(/(siguiente paso recomendado)/.test(t) ? 2 : 0) +
		(/(contacto|evaluar|revisión)/.test(t) ? 1 : 0);

	const scopeSafety =
		(/(no sería responsable|fase futura|segunda etapa|no prometer)/.test(t)
			? 2
			: 0) +
		(!/(garantizamos|garantizado|meta api activa|whatsapp cloud api activa)/.test(
			t,
		)
			? 2
			: 0) +
		(/(manual|por fases|validar)/.test(t) ? 1 : 0);

	const total = clarity + commercialUsefulness + conversionPush + scopeSafety;
	return { clarity, commercialUsefulness, conversionPush, scopeSafety, total };
}

const results = CASES.map((c) => {
	const intent = detectLeadAssistantIntent(c.prompt);
	const reply = buildPublicLeadAssistantResponse(
		{ visitorMessage: c.prompt, detectedIntent: intent, memory: null },
		appsMarketingAssistantConfig,
	);
	const score = scoreReply(reply.text);
	return { ...c, intent: intent.intent, reply: reply.text, score };
});

const totals = results.reduce(
	(acc, r) => {
		acc.clarity += r.score.clarity;
		acc.commercialUsefulness += r.score.commercialUsefulness;
		acc.conversionPush += r.score.conversionPush;
		acc.scopeSafety += r.score.scopeSafety;
		acc.total += r.score.total;
		return acc;
	},
	{
		clarity: 0,
		commercialUsefulness: 0,
		conversionPush: 0,
		scopeSafety: 0,
		total: 0,
	},
);

const avg = {
	clarity: totals.clarity / results.length,
	commercialUsefulness: totals.commercialUsefulness / results.length,
	conversionPush: totals.conversionPush / results.length,
	scopeSafety: totals.scopeSafety / results.length,
	total: totals.total / results.length,
};

console.log(JSON.stringify({ results, avg }, null, 2));
