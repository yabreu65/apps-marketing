import type {
	DetectIntentResult,
	PublicAssistantConversationStage,
	PublicAssistantMemory,
} from "@/modules/lead-assistant/types/lead-assistant";

type DetermineConversationStageInput = {
	visitorMessage: string;
	detectedIntent: DetectIntentResult;
	memory: PublicAssistantMemory | null;
	previousVisitorMessages: number;
};

function asksForHandoff(message: string) {
	return /(whatsapp|formulario|contacto|resum|enviarlo|hablar con alguien|asesor|equipo)/i.test(
		message,
	);
}

function asksForRecommendation(message: string) {
	return /(qu[eé] hago primero|qu[eé] deber[ií]a hacer|qu[eé] me recomiendas|recomend[aá]s|conviene|siguiente paso|por d[oó]nde sigo)/i.test(
		message,
	);
}

export function determinePublicAssistantConversationStage(
	input: DetermineConversationStageInput,
): PublicAssistantConversationStage {
	const { detectedIntent, memory, previousVisitorMessages, visitorMessage } =
		input;

	if (detectedIntent.questionType === "objection") {
		return "objection";
	}

	if (detectedIntent.intent === "human_help" || asksForHandoff(visitorMessage)) {
		return "handoff";
	}

	if (
		previousVisitorMessages === 0 &&
		!memory &&
		detectedIntent.intent === "not_sure"
	) {
		return "first_contact";
	}

	if (
		asksForRecommendation(visitorMessage) ||
		[
			"lead_followup_priority",
			"dashboard",
			"mvp_saas",
			"ai_automation",
		].includes(detectedIntent.intent)
	) {
		return "recommendation";
	}

	return "diagnosis";
}
