import { buildWhatsAppLink } from "@/lib/whatsapp";
import type {
	AppsMarketingAssistantConfig,
	AssistantCta,
	PublicAssistantIntent,
} from "@/modules/lead-assistant/types/lead-assistant";

export function prioritizeAssistantCtas(ctas: AssistantCta[]): AssistantCta[] {
	const primaryForm = ctas.find((cta) => cta.kind === "form");
	const secondaryWhatsapp = ctas.find(
		(cta) => cta.kind === "whatsapp_manual",
	);

	return [primaryForm, secondaryWhatsapp].filter(
		(cta): cta is AssistantCta => Boolean(cta),
	);
}

export function buildAssistantCtas(
	intent: PublicAssistantIntent,
	config: AppsMarketingAssistantConfig,
): AssistantCta[] {
	const whatsappByIntent: Record<PublicAssistantIntent, string> = {
		landing:
			"Hola, quiero orientación para una landing comercial enfocada en captar más consultas.",
		web_professional:
			"Hola, quiero evaluar una web profesional para mi negocio.",
		dashboard:
			"Hola, quiero ordenar datos y operación con un dashboard interno.",
		mvp_saas: "Hola, quiero validar un MVP SaaS y definir alcance inicial.",
		ai_automation:
			"Hola, quiero evaluar IA aplicada por fases para mi negocio.",
		seo_marketing:
			"Hola, quiero mejorar visibilidad y captación con marketing/SEO.",
		lead_followup_priority:
			"Hola, pierdo consultas en WhatsApp/Instagram y quiero priorizarlas mejor.",
		pricing: "Hola, quiero estimar costos y alcance para mi proyecto.",
		not_sure:
			"Hola, necesito diagnóstico para definir si me conviene landing, web, dashboard o IA.",
		human_help:
			"Hola, quiero hablar con una persona del equipo para revisar mi caso.",
	};

	const whatsappCta: AssistantCta = {
		kind: "whatsapp_manual",
		label: "Continuar por WhatsApp",
		href: buildWhatsAppLink(config.whatsappNumber, whatsappByIntent[intent]),
	};

	const formCta: AssistantCta = {
		kind: "form",
		label: "Completar formulario",
		href: config.contactFormAnchor,
	};

	const primaryByIntent: Record<PublicAssistantIntent, AssistantCta["kind"]> = {
		landing: "form",
		web_professional: "form",
		dashboard: "form",
		mvp_saas: "form",
		ai_automation: "form",
		seo_marketing: "form",
		lead_followup_priority: "form",
		pricing: "form",
		not_sure: "form",
		human_help: "form",
	};

	return prioritizeAssistantCtas(
		primaryByIntent[intent] === "whatsapp_manual"
			? [whatsappCta, formCta]
			: [formCta, whatsappCta],
	);
}

export function getNextDiagnosticQuestion(intent: PublicAssistantIntent) {
	switch (intent) {
		case "lead_followup_priority":
			return "¿Cuántas consultas recibes por semana y cómo las priorizan hoy?";
		case "landing":
			return "¿Tu prioridad hoy es captar más consultas o mejorar la calidad de las que llegan?";
		case "web_professional":
			return "¿Qué páginas clave necesitas sí o sí para que tu web te ayude comercialmente?";
		case "dashboard":
			return "¿Qué decisiones te cuesta tomar hoy por falta de visibilidad en datos?";
		case "mvp_saas":
			return "¿Quién es el usuario inicial y cuál es el problema principal que quieres validar?";
		case "ai_automation":
			return "¿Qué tarea repetitiva te genera más fricción hoy y con qué datos la ejecutan?";
		case "seo_marketing":
			return "¿Qué canal te trae hoy más consultas y cuál te gustaría escalar primero?";
		case "pricing":
			return "Para estimar bien, ¿puedes contarme objetivo, urgencia y alcance esperado?";
		case "human_help":
			return "Si quieres, te dejo contacto directo para que lo revisen contigo en detalle.";
		case "not_sure":
		default:
			return "¿Qué te preocupa más hoy: captar consultas, ordenar seguimiento o validar producto?";
	}
}
