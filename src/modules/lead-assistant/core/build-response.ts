import {
	buildAssistantCtas,
	getNextDiagnosticQuestion,
} from "@/modules/lead-assistant/core/suggested-actions";
import type {
	AppsMarketingAssistantConfig,
	PublicAssistantReply,
	PublicAssistantReplyInput,
} from "@/modules/lead-assistant/types/lead-assistant";

function isRetailContext(message: string) {
	return /(venta de art[ií]culos|tienda|vendo productos|tengo un local|local f[ií]sico|vendo por instagram|vendo por whatsapp|cat[aá]logo)/i.test(
		message,
	);
}

function hasRetailFollowupPain(
	message: string,
	intent: PublicAssistantReply["intent"],
) {
	if (intent === "lead_followup_priority") {
		return true;
	}

	return /(pierdo muchas consultas|pierdo consultas|sin responder|sin seguimiento|desorden|se me olvidan|se me pasan|no llego a responder)/i.test(
		message,
	);
}

function isEcommerceFullRequest(message: string) {
	return /(tienda online completa|ecommerce completo|e-?commerce completo|shopify completo|tienda completa)/i.test(
		message,
	);
}

function asksSalesGuarantee(message: string) {
	return /(garantizan ventas|garant[ií]a de ventas|me garantizan|ventas garantizadas|garantizan resultados|resultados garantizados)/i.test(
		message,
	);
}

function asksLandingVsWeb(message: string) {
	return /(diferencia.*landing.*web|landing.*web profesional|landing o una web)/i.test(
		message,
	);
}

function asksMetaApi(message: string) {
	return /(meta api|whatsapp cloud api|conectar.*meta|integrar.*meta)/i.test(
		message,
	);
}

function asksWhatsappAutomationPhase(message: string) {
	return /(whatsapp autom[aá]tico|respuestas autom[aá]ticas.*whatsapp|segunda etapa.*whatsapp|automatizar.*whatsapp)/i.test(
		message,
	);
}

function isEarlyStageLost(message: string) {
	return /(estoy arrancando y estoy perdido|reci[eé]n arranco|estoy perdido|no s[eé] por d[oó]nde empezar)/i.test(
		message,
	);
}

function asksWebPreparation(message: string) {
	return /(qu[eé] necesito tener listo.*web|antes de pedir una web|preparar.*web profesional)/i.test(
		message,
	);
}

function asksDefinition(message: string) {
	return /(que es|qué es|defin[ií] (una|un)|explicame|expl[ií]came|en simple|en criollo)/i.test(
		message,
	);
}

function definitionReply(message: string): string | null {
	if (/landing/i.test(message)) {
		return "Una landing es una página enfocada en un solo objetivo comercial: convertir visitas en consultas (o ventas). No busca mostrar todo el negocio, sino una oferta concreta con mensaje claro y un acción de contacto clara. Siguiente paso recomendado: te puedo sugerir una estructura base de landing para tu caso y canal principal de captación.";
	}

	if (/web profesional|sitio web|p[aá]gina web/i.test(message)) {
		return "Una web profesional es un sitio más completo para presentar tu negocio: quién sos, qué ofrecés, cómo trabajás y cómo contactarte. Sirve para construir confianza y ordenar tu propuesta comercial. Siguiente paso recomendado: contame tu objetivo principal y te digo si conviene arrancar por web completa o por landing.";
	}

	if (/dashboard|panel/i.test(message)) {
		return "Un dashboard es un panel donde ves métricas clave para decidir rápido: consultas nuevas, estado de seguimiento, pendientes y resultados por canal. Sirve para ordenar operación y no perder oportunidades. Siguiente paso recomendado: decime qué decisiones te están costando hoy y te propongo métricas mínimas.";
	}

	if (/mvp|saas/i.test(message)) {
		return "Un MVP SaaS es la versión más simple de tu producto, hecha para validar rápido con usuarios reales antes de construir de más. El foco es aprender qué sí aporta valor, no lanzar algo gigante de entrada. Siguiente paso recomendado: si querés, definimos problema, usuario y 3 funcionalidades mínimas.";
	}

	if (/(ia|inteligencia artificial|automatiz)/i.test(message)) {
		return "IA aplicada es usar inteligencia artificial en una parte concreta del proceso para ahorrar tiempo o mejorar decisiones, sin vender humo. Primero se ordena proceso y datos, después se automatiza lo que tenga sentido. Siguiente paso recomendado: contame qué tarea repetitiva te consume más tiempo y evaluamos factibilidad.";
	}

	return null;
}

function shouldAppendPreviousContext(
	visitorMessage: string,
	memorySummary?: string | null,
) {
	if (!memorySummary) return false;
	if (asksDefinition(visitorMessage)) return false;

	const message = visitorMessage.trim().toLowerCase();
	const summary = memorySummary.trim().toLowerCase();

	if (!message || !summary) return false;
	if (summary.includes(message) || message.includes(summary)) return false;

	return true;
}

function buildPreviousContext(memory: PublicAssistantReplyInput["memory"]) {
	const facts = memory?.facts;
	if (!memory?.summary) return "";

	const contextParts = [
		facts?.businessType ? `negocio: ${facts.businessType}` : null,
		facts?.channels.length ? `canales: ${facts.channels.join(", ")}` : null,
		facts?.painPoints.length ? `dolor: ${facts.painPoints[0]}` : null,
		facts?.recommendedPath ? `camino previo: ${facts.recommendedPath}` : null,
	].filter(Boolean);

	if (contextParts.length > 0) {
		return ` Tomo el contexto que ya me diste (${contextParts.join("; ")}).`;
	}

	return ` Tomo como contexto lo que veníamos hablando: ${memory.summary}.`;
}

function responseByIntent(intent: PublicAssistantReply["intent"]) {
	switch (intent) {
		case "lead_followup_priority":
			return {
				text: "Tiene sentido: si hoy se te pierden consultas, primero conviene ordenar seguimiento y priorización. En ese escenario, un dashboard interno suele dar más impacto inicial que sumar más demanda, y la IA puede sumar como segunda capa de apoyo. Siguiente paso recomendado: hacemos un diagnóstico corto de tu flujo actual y definimos el panel mínimo para que no se enfríen leads.",
				rationale: "Prioriza operación comercial antes de captación adicional.",
			};
		case "landing":
			return {
				text: "Si tu prioridad es captar consultas rápido, una landing comercial clara suele ser el primer paso más eficiente. Ahí enfocamos oferta, público y acción de contacto para convertir mejor. Siguiente paso recomendado: completá el formulario para hacer un diagnóstico comercial breve, definir canal principal y proponerte un alcance inicial realista.",
				rationale: "Enfoque de captación inicial.",
			};
		case "web_professional":
			return {
				text: "Una web profesional te ayuda a mejorar confianza y claridad comercial. Es ideal cuando necesitás presentar servicios de forma sólida y ordenada. Siguiente paso recomendado: contanos secciones clave y objetivo comercial para definir una estructura web realista por fases.",
				rationale: "Enfoque de presencia y credibilidad.",
			};
		case "dashboard":
			return {
				text: "Si necesitás visibilidad para decidir más rápido, el camino correcto suele ser dashboard/panel interno. Primero definimos qué métricas importan y qué decisiones querés acelerar. Siguiente paso recomendado: compartinos qué decisiones te cuestan hoy y armamos un diagnóstico de métricas prioritarias.",
				rationale: "Enfoque de datos para decisión operativa.",
			};
		case "mvp_saas":
			return {
				text: "Para un MVP SaaS, lo más sano es validar problema, usuario y funcionalidades mínimas antes de construir una plataforma completa. Siguiente paso recomendado: definimos juntos el alcance mínimo validable y una primera versión enfocada en aprendizaje comercial.",
				rationale: "Evita sobreconstrucción temprana.",
			};
		case "ai_automation":
			return {
				text: "IA aplicada puede sumar mucho, pero conviene usarla por fases: primero proceso y datos, después resumen/priorización/sugerencias, sin prometer automatización inmediata. Nada de “IA mágica” sin base. Siguiente paso recomendado: elegimos un proceso puntual para diagnosticar factibilidad y definir una prueba controlada.",
				rationale: "IA como capa de apoyo, no punto de partida ciego.",
			};
		case "seo_marketing":
			return {
				text: "Si el foco es visibilidad y demanda, SEO/marketing puede ser un frente clave, pero sin prometer resultados mágicos: primero alineamos canal, oferta y capacidad real de seguimiento comercial. Siguiente paso recomendado: definimos tu canal prioritario y el flujo de seguimiento para convertir mejor las consultas; si querés, lo activamos ahora por formulario o WhatsApp manual.",
				rationale: "Enfoque de adquisición sostenible con cierre comercial.",
			};
		case "pricing":
			return {
				text: "El costo depende del alcance real, urgencia y complejidad. Para estimarte de forma responsable, ese precio lo define Yoryi después de revisar tu caso. Siguiente paso recomendado: completá el formulario con objetivo, tiempos y alcance para coordinar llamada y darte una estimación real.",
				rationale: "Pricing responsable, definido por revisión humana.",
			};
		case "human_help":
			return {
				text: "Perfecto, podemos orientarte por canal manual para revisar tu caso en detalle. Siguiente paso recomendado: usá WhatsApp o el formulario para que el equipo lo evalúe.",
				rationale: "Derivación humana explícita.",
			};
		case "not_sure":
		default:
			return {
				text: "Para recomendarte bien, primero conviene separar si hoy necesitás captación (landing), presencia profesional (web), orden operativo (dashboard) o evolución por fases con IA, siempre con validación realista y sin promesas cerradas. Siguiente paso recomendado: hacemos un diagnóstico breve y te proponemos un camino por fases según tu contexto; si te sirve, seguí ahora por formulario o WhatsApp manual.",
				rationale: "Caso ambiguo requiere diagnóstico guiado con cierre.",
			};
	}
}

function selectVariant(message: string, variants: string[]) {
	if (variants.length === 0) return "Perfecto.";

	const seed = message
		.toLowerCase()
		.split("")
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);

	return variants[seed % variants.length];
}

function humanIntro(
	intent: PublicAssistantReply["intent"],
	visitorMessage: string,
) {
	const byIntent: Record<PublicAssistantReply["intent"], string[]> = {
		lead_followup_priority: [
			"Te entiendo, eso pasa mucho cuando crece la demanda.",
			"Tiene todo el sentido lo que te está pasando.",
		],
		landing: ["Buen foco.", "Tiene sentido lo que planteás."],
		web_professional: ["Buena decisión pensarlo así.", "Muy buena pregunta."],
		dashboard: [
			"Perfecto, ahí hay una oportunidad clara.",
			"Buen punto, eso suele destrabar decisiones.",
		],
		mvp_saas: [
			"Excelente pregunta para no sobreconstruir.",
			"Buen enfoque para validar sin quemar tiempo.",
		],
		ai_automation: [
			"Buen enfoque: IA con criterio.",
			"Muy buen punto para evaluar por fases.",
		],
		seo_marketing: ["Bien visto.", "Buena lectura del problema."],
		pricing: ["Buena pregunta.", "Perfecto, te explico cómo estimarlo bien."],
		human_help: ["Perfecto.", "Dale, vamos por ahí."],
		not_sure: [
			"Tranqui, es normal esa duda al inicio.",
			"Súper válido, pasa mucho al empezar.",
		],
	};

	return selectVariant(visitorMessage, byIntent[intent] ?? ["Perfecto."]);
}

function withHumanTone(
	intent: PublicAssistantReply["intent"],
	baseText: string,
	visitorMessage: string,
) {
	if (/^buena pregunta|^tranqui|^sí,|^perfecto|^dale/i.test(baseText.trim())) {
		return baseText;
	}

	return `${humanIntro(intent, visitorMessage)} ${baseText}`;
}

function buildDynamicFollowUpQuestion(
	intent: PublicAssistantReply["intent"],
	visitorMessage: string,
	defaultQuestion: string,
) {
	const hasChannel =
		/(whatsapp|instagram|web|ads|google|referidos|email)/i.test(visitorMessage);
	const hasUrgency = /(hoy|urgente|esta semana|este mes|ya)/i.test(
		visitorMessage,
	);
	const hasGoal = /(captar|vender|consultas|leads|conversion|conversión)/i.test(
		visitorMessage,
	);

	if (intent === "landing") {
		if (!hasGoal)
			return "¿Qué querés lograr primero con la landing: más consultas o mejor calidad de lead?";
		if (!hasChannel)
			return "¿Hoy qué canal te trae más consultas: WhatsApp, Instagram, web o ads?";
		if (!hasUrgency)
			return "¿En qué plazo te gustaría tener esto funcionando: semanas o meses?";
	}

	if (intent === "pricing" && !hasUrgency) {
		return "Para estimar mejor, ¿en qué plazo lo querés lanzar y qué alcance mínimo necesitás?";
	}

	return defaultQuestion;
}

function adaptTextByQuestionType(
	text: string,
	questionType: PublicAssistantReplyInput["detectedIntent"]["questionType"],
) {
	if (!questionType) return text;

	if (questionType === "definition") {
		return text.replace(
			/Siguiente paso recomendado:/i,
			"Si querés, como siguiente paso te propongo:",
		);
	}

	if (questionType === "comparison") {
		return text.replace(
			/Siguiente paso recomendado:/i,
			"Para decidir sin vueltas:",
		);
	}

	if (questionType === "pricing") {
		return text.replace(
			/Siguiente paso recomendado:/i,
			"Para darte una estimación útil:",
		);
	}

	return text;
}

function limitTextLength(
	baseText: string,
	intent: PublicAssistantReply["intent"],
) {
	const softLimitByIntent: Record<PublicAssistantReply["intent"], number> = {
		landing: 430,
		web_professional: 430,
		dashboard: 440,
		mvp_saas: 430,
		ai_automation: 440,
		seo_marketing: 440,
		lead_followup_priority: 520,
		pricing: 420,
		not_sure: 460,
		human_help: 360,
	};

	const softLimit = softLimitByIntent[intent];
	if (baseText.length <= softLimit) return baseText;

	const firstSentence = baseText.split(". ")[0]?.trim();
	const actionMatch = baseText.match(/(Siguiente paso recomendado:[\s\S]*)$/i);
	if (!firstSentence) return baseText;
	if (!actionMatch) return baseText.slice(0, softLimit).trimEnd() + "...";

	return `${firstSentence}. ${actionMatch[1]}`;
}

export function buildPublicLeadAssistantResponse(
	input: PublicAssistantReplyInput,
	config: AppsMarketingAssistantConfig,
): PublicAssistantReply {
	const visitorMessage = input.visitorMessage;
	const retailContext = isRetailContext(input.visitorMessage);
	const response = responseByIntent(input.detectedIntent.intent);
	const followUpQuestion = getNextDiagnosticQuestion(
		input.detectedIntent.intent,
	);
	const ctas = buildAssistantCtas(input.detectedIntent.intent, config);

	const previousContext = shouldAppendPreviousContext(
		input.visitorMessage,
		input.memory?.summary,
	)
		? buildPreviousContext(input.memory)
		: "";

	const retailFollowupPain = hasRetailFollowupPain(
		input.visitorMessage,
		input.detectedIntent.intent,
	);

	const retailOverrideText = retailContext
		? retailFollowupPain
			? "Por lo que me contaste, ya tenés volumen suficiente de consultas como para que el problema principal sea organizar el seguimiento, no solo captar más personas. Un sistema simple para tu caso puede empezar en formato manual/local: una bandeja de consultas o leads con canal de origen (Instagram, WhatsApp, formulario o carga manual), producto de interés y fecha; estados de seguimiento para saber en qué etapa está cada contacto; prioridad para responder primero lo urgente; recordatorios manuales para que no se enfríen oportunidades; y un resumen diario con métricas básicas de entradas, respuestas y pendientes. Siguiente paso recomendado: definir el panel mínimo para tu negocio: qué datos guardar, qué estados usar y cómo priorizar clientes."
			: "Perfecto. Para un negocio de venta de artículos, primero conviene definir si necesitás vender más, mostrar mejor tus productos o no perder consultas. Si hoy vendés por WhatsApp, Instagram o local físico, suele funcionar arrancar con una landing o web catálogo enfocada en productos clave y contacto rápido. Siguiente paso recomendado: contame qué tipo de artículos vendés, por dónde te contactan hoy y si querés vender online o recibir más consultas."
		: null;

	const definedConceptText = asksDefinition(visitorMessage)
		? definitionReply(visitorMessage)
		: null;

	const edgeCaseText = definedConceptText
		? definedConceptText
		: isEcommerceFullRequest(visitorMessage)
			? "Sí, se puede pensar una tienda online completa, pero como estrategia comercial conviene validarlo por fases. Primero definimos si hoy necesitás ecommerce full o si una web catálogo con contacto por WhatsApp ya cubre tu operación inicial. Siguiente paso recomendado: contame cuántos productos manejás, si necesitás pagos online, cómo resolvés envíos y cómo vendés hoy para proponerte la fase correcta."
			: asksSalesGuarantee(visitorMessage)
				? "No sería responsable garantizar ventas exactas. Lo que sí podemos hacer es mejorar conversión con propuesta clara, mejor llamada a la acción, seguimiento comercial y métricas para optimizar decisiones. Siguiente paso recomendado: compartime tu oferta actual, canal principal y cómo estás midiendo resultados para definir un plan realista."
				: asksLandingVsWeb(visitorMessage)
					? "Buena pregunta: una landing está pensada para una oferta puntual y conversión rápida; una web profesional sirve para presentar tu negocio completo, generar confianza y ordenar servicios. Si tu objetivo es captar consultas ya, suele convenir empezar por landing; si necesitás presencia sólida de marca, conviene web profesional. Siguiente paso recomendado: contame tu objetivo principal de este mes y te digo qué opción conviene arrancar primero."
					: asksMetaApi(visitorMessage)
						? "Se puede evaluar como fase futura, pero integrar Meta API requiere revisar requisitos técnicos, costos, aprobaciones y configuración del flujo completo. Para no frenar resultados, conviene empezar con contacto manual y seguimiento interno bien ordenado, y luego escalar integración. Siguiente paso recomendado: contame tu volumen de consultas y tu proceso actual para definir si conviene planificar esa fase ahora o más adelante."
						: asksWhatsappAutomationPhase(visitorMessage)
							? "Sí, WhatsApp automático suele evaluarse como segunda etapa. Primero conviene ordenar el seguimiento manual y el criterio comercial de respuesta para no automatizar desorden. Después, con proceso claro, se define si tiene sentido automatizar parte del flujo. Siguiente paso recomendado: contame cuántas consultas recibís, cómo las seguís hoy y qué parte te consume más tiempo."
							: asksWebPreparation(visitorMessage)
								? "Para pedir una web con buen resultado, lo ideal es llegar con base clara: oferta principal, público objetivo, servicios/productos prioritarios, ejemplos de contenido y canal de contacto principal. Eso acelera decisiones y evita retrabajo. Siguiente paso recomendado: armemos una checklist corta con esos puntos y definimos si te conviene landing o web profesional como primer paso."
								: isEarlyStageLost(visitorMessage)
									? "Tranqui, es normal arrancar así. Para avanzar sin complicarte, te propongo ir por fases: primero definimos oferta y objetivo inicial, después armamos una landing o web mínima según prioridad, y en paralelo dejamos un seguimiento simple de consultas para no perder oportunidades. Siguiente paso recomendado: contame qué vendés, cómo te contactan hoy y cuál sería tu objetivo de corto plazo."
									: null;

	const rawText = edgeCaseText
		? `${edgeCaseText}${previousContext}`
		: retailOverrideText
			? `${retailOverrideText}${previousContext}`
			: `${response.text}${previousContext}`;

	const questionTypeAdjustedText = adaptTextByQuestionType(
		rawText,
		input.detectedIntent.questionType,
	);

	const shouldShorten = !edgeCaseText && !retailOverrideText;
	const text = shouldShorten
		? limitTextLength(questionTypeAdjustedText, input.detectedIntent.intent)
		: questionTypeAdjustedText;

	const dynamicFollowUp = buildDynamicFollowUpQuestion(
		input.detectedIntent.intent,
		input.visitorMessage,
		followUpQuestion,
	);

	return {
		intent: input.detectedIntent.intent,
		followUpQuestion: retailContext
			? retailFollowupPain
				? "¿Qué artículos vendés, cuántas consultas te llegan por día y cómo las seguís hoy para no perder contactos?"
				: "¿Qué artículos vendés, por dónde te llegan hoy las consultas y si querés vender online o captar más contactos?"
			: dynamicFollowUp,
		rationale: response.rationale,
		text: withHumanTone(
			input.detectedIntent.intent,
			text,
			input.visitorMessage,
		),
		source: "rules",
		ctas,
		conversationStage: input.conversationStage,
	};
}
