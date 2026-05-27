export const PUBLIC_ASSISTANT_INTENTS = [
	"landing",
	"web_professional",
	"dashboard",
	"mvp_saas",
	"ai_automation",
	"seo_marketing",
	"lead_followup_priority",
	"pricing",
	"not_sure",
	"human_help",
] as const;

export type PublicAssistantIntent = (typeof PUBLIC_ASSISTANT_INTENTS)[number];

export type PublicAssistantRole = "assistant" | "visitor";

export type PublicAssistantMessage = {
	id: string;
	role: PublicAssistantRole;
	content: string;
	intent?: PublicAssistantIntent;
	createdAt: string;
};

export type PublicAssistantMemory = {
	summary: string;
	interests: PublicAssistantIntent[];
	lastTopic: string;
	updatedAt: string;
	conversationStage?: PublicAssistantConversationStage;
	facts?: PublicAssistantMemoryFacts;
};

export type PublicAssistantState = {
	visitorKey: string;
	messages: PublicAssistantMessage[];
	memory: PublicAssistantMemory | null;
};

export type PublicAssistantSource = "rules" | "gemini" | "rules_fallback";

export type PublicAssistantConversationStage =
	| "first_contact"
	| "diagnosis"
	| "recommendation"
	| "objection"
	| "handoff";

export type PublicAssistantMemoryFacts = {
	businessType?: string;
	channels: string[];
	painPoints: string[];
	goals: string[];
	recommendedPath?: string;
	lastObjection?: string;
};

export type AssistantCta = {
	label: string;
	href: string;
	kind: "form" | "whatsapp_manual";
};

export type PublicAssistantReply = {
	text: string;
	intent: PublicAssistantIntent;
	followUpQuestion?: string;
	rationale: string;
	source: PublicAssistantSource;
	ctas: AssistantCta[];
	conversationStage?: PublicAssistantConversationStage;
};

export type PublicLeadHandoffSummary = {
	projectType: string;
	mainGoalOrProblem: string;
	probableService: string;
	urgencyLevel: string;
	clarityLevel: string;
	timelineSignal: string;
	commercialPriority: "high" | "medium" | "low";
	nextRecommendedStep: string;
};

export type PublicAssistantQuestionType =
	| "definition"
	| "comparison"
	| "pricing"
	| "implementation"
	| "objection"
	| "diagnostic"
	| "unknown";

export type DetectIntentResult = {
	intent: PublicAssistantIntent;
	confidence: number;
	signals: string[];
	questionType?: PublicAssistantQuestionType;
};

export type PublicAssistantQuickReply = {
	id: string;
	label: string;
	intentHint: PublicAssistantIntent;
};

export type AppsMarketingAssistantConfig = {
	businessName: string;
	whatsappNumber: string;
	contactFormAnchor: string;
	greeting: string;
	privacyNote: string;
	quickReplies: PublicAssistantQuickReply[];
};

export type PublicAssistantReplyInput = {
	visitorMessage: string;
	detectedIntent: DetectIntentResult;
	memory: PublicAssistantMemory | null;
	conversationStage?: PublicAssistantConversationStage;
};

export type PublicChatAIInput = {
	visitorMessage: string;
	detectedIntent: PublicAssistantIntent;
	memorySummary?: string;
	memoryFacts?: PublicAssistantMemoryFacts;
	conversationStage?: PublicAssistantConversationStage;
};

export type PublicChatDecision = {
	intent: PublicAssistantIntent;
	userMessage: string;
	conversationSummary: string;
	detectedContext: {
		businessType?: string;
		channels: string[];
		painPoints: string[];
		goals: string[];
		lastObjection?: string;
		conversationStage?: PublicAssistantConversationStage;
	};
	recommendedPath: string;
	nextQuestion: string;
	commercialGoal: string;
	cta: AssistantCta[];
	constraints: string[];
};

export type PublicChatTurnRequest = {
	visitorKey: string;
	message: string;
};

export type PublicChatApiResponse = {
	ok: boolean;
	message: string;
	state?: PublicAssistantState;
	reply?: PublicAssistantReply;
	suggestedActions?: AssistantCta[];
};

export type PublicMemoryApiResponse = {
	ok: boolean;
	message: string;
};
