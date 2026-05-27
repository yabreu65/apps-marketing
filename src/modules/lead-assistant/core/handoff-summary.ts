import type {
	PublicAssistantIntent,
	PublicAssistantMessage,
	PublicAssistantMemory,
	PublicLeadHandoffSummary,
} from "@/modules/lead-assistant/types/lead-assistant";

type BuildHandoffSummaryInput = {
	intent: PublicAssistantIntent;
	memory: PublicAssistantMemory | null;
	latestVisitorMessage: string | null;
};

const PROJECT_TYPE_LABELS: Record<PublicAssistantIntent, string> = {
	landing: "Captación con landing comercial",
	web_professional: "Sitio web profesional",
	dashboard: "Dashboard interno",
	mvp_saas: "MVP SaaS",
	ai_automation: "IA aplicada por fases",
	seo_marketing: "SEO / marketing digital",
	lead_followup_priority: "Seguimiento y priorización de consultas",
	pricing: "Definición de alcance y estimación",
	not_sure: "Diagnóstico inicial",
	human_help: "Acompañamiento comercial manual",
};

const PROBABLE_SERVICE_LABELS: Record<PublicAssistantIntent, string> = {
	landing: "Landing comercial",
	web_professional: "Sitio web profesional",
	dashboard: "Dashboard / panel interno",
	mvp_saas: "MVP SaaS",
	ai_automation: "IA aplicada al negocio",
	seo_marketing: "SEO / marketing digital",
	lead_followup_priority: "Sistema de seguimiento de consultas",
	pricing: "Dato pendiente",
	not_sure: "Dato pendiente",
	human_help: "Diagnóstico comercial",
};

const NEXT_STEP_LABELS: Record<PublicAssistantIntent, string> = {
	landing:
		"Completar formulario con público objetivo, oferta y canal de captación principal.",
	web_professional:
		"Compartir secciones clave y objetivo comercial para definir estructura inicial.",
	dashboard:
		"Indicar qué decisiones quieres acelerar para diseñar un panel mínimo.",
	mvp_saas:
		"Definir usuario inicial, problema principal y alcance mínimo validable.",
	ai_automation:
		"Elegir un proceso puntual para evaluar IA de forma controlada.",
	seo_marketing:
		"Definir canal prioritario y capacidad de seguimiento comercial.",
	lead_followup_priority:
		"Describir flujo actual de consultas para priorizar seguimiento.",
	pricing:
		"Enviar objetivo, urgencia y alcance por formulario o WhatsApp manual.",
	not_sure: "Realizar diagnóstico breve para definir camino por fases.",
	human_help:
		"Usar WhatsApp manual o formulario para revisión comercial del equipo.",
};

export function getLatestVisitorMessage(
	messages: PublicAssistantMessage[],
): string | null {
	for (let index = messages.length - 1; index >= 0; index -= 1) {
		if (messages[index]?.role === "visitor") {
			return messages[index].content;
		}
	}

	return null;
}

function inferUrgencyLevel(message: string | null) {
	if (!message) return "Dato pendiente";

	if (/(urgente|ya|hoy|esta semana|rápido|cuanto antes)/i.test(message)) {
		return "Alta";
	}

	if (
		/(este mes|pr[oó]ximas semanas|prioridad media|cuando se pueda)/i.test(
			message,
		)
	) {
		return "Media";
	}

	return "Dato pendiente";
}

function inferMainGoalOrProblem(
	message: string | null,
	memory: PublicAssistantMemory | null,
) {
	if (message && message.trim().length >= 12) {
		return message.trim().slice(0, 180);
	}

	if (memory?.summary) {
		return memory.summary.slice(0, 180);
	}

	return "Dato pendiente";
}

function inferClarityLevel(message: string | null) {
	if (!message) return "Dato pendiente";

	const normalized = message.trim();
	if (
		normalized.length >= 80 ||
		/(objetivo|presupuesto|plazo|canal|servicio|problema)/i.test(normalized)
	) {
		return "Alta";
	}

	if (normalized.length >= 30) {
		return "Media";
	}

	return "Baja";
}

function inferTimelineSignal(message: string | null) {
	if (!message) return "Dato pendiente";

	if (/(hoy|esta semana|cuanto antes|urgente|ya)/i.test(message))
		return "Inmediato";
	if (/(este mes|pr[oó]ximo mes|pr[oó]ximas semanas)/i.test(message))
		return "Corto plazo";
	return "Sin plazo explícito";
}

function inferCommercialPriority(params: {
	intent: PublicAssistantIntent;
	urgencyLevel: string;
	clarityLevel: string;
	timelineSignal: string;
}): "high" | "medium" | "low" {
	let score = 0;

	if (params.intent === "pricing" || params.intent === "lead_followup_priority")
		score += 2;
	if (params.urgencyLevel === "Alta") score += 2;
	if (params.clarityLevel === "Alta") score += 1;
	if (params.timelineSignal === "Inmediato") score += 1;

	if (score >= 4) return "high";
	if (score >= 2) return "medium";
	return "low";
}

export function buildPublicLeadHandoffSummary(
	input: BuildHandoffSummaryInput,
): PublicLeadHandoffSummary {
	const urgencyLevel = inferUrgencyLevel(input.latestVisitorMessage);
	const clarityLevel = inferClarityLevel(input.latestVisitorMessage);
	const timelineSignal = inferTimelineSignal(input.latestVisitorMessage);

	return {
		projectType: PROJECT_TYPE_LABELS[input.intent],
		mainGoalOrProblem: inferMainGoalOrProblem(
			input.latestVisitorMessage,
			input.memory,
		),
		probableService: PROBABLE_SERVICE_LABELS[input.intent],
		urgencyLevel,
		clarityLevel,
		timelineSignal,
		commercialPriority: inferCommercialPriority({
			intent: input.intent,
			urgencyLevel,
			clarityLevel,
			timelineSignal,
		}),
		nextRecommendedStep: NEXT_STEP_LABELS[input.intent],
	};
}

export function formatPublicLeadHandoffSummary(
	summary: PublicLeadHandoffSummary,
) {
	return [
		`Tipo de proyecto: ${summary.projectType}`,
		`Objetivo/problema: ${summary.mainGoalOrProblem}`,
		`Servicio probable: ${summary.probableService}`,
		`Urgencia: ${summary.urgencyLevel}`,
		`Claridad del caso: ${summary.clarityLevel}`,
		`Plazo detectado: ${summary.timelineSignal}`,
		`Prioridad comercial: ${summary.commercialPriority}`,
		`Siguiente paso recomendado: ${summary.nextRecommendedStep}`,
	].join("\n");
}

export function buildPublicLeadHandoffWhatsAppMessage(
	summary: PublicLeadHandoffSummary,
) {
	return [
		"Hola, quiero continuar esta conversación del asistente comercial.",
		"",
		"Resumen para contacto:",
		formatPublicLeadHandoffSummary(summary),
	].join("\n");
}
