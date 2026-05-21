"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackChatFunnelEvent } from "@/lib/chat-funnel";
import {
	clearDiagnosisContext,
	readDiagnosisContext,
} from "@/lib/diagnosis-context";
import { buildPublicApiUrl } from "@/lib/public-api-url";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LeadApiResponse, LeadInterest, LeadPayload } from "@/types/lead";

type FormValues = {
	name: string;
	email: string;
	phone: string;
	businessType: string;
	serviceInterest: string;
	message: string;
	website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>> & {
	general?: string;
};

const INITIAL_VALUES: FormValues = {
	name: "",
	email: "",
	phone: "",
	businessType: "",
	serviceInterest: "",
	message: "",
	website: "",
};

const SERVICE_OPTIONS = [
	"Landing comercial",
	"Sitio web profesional",
	"Sistema web a medida",
	"Dashboard / panel interno",
	"MVP SaaS",
	"Automatización comercial",
	"IA aplicada al negocio",
	"SEO / marketing digital",
	"No estoy seguro (quiero orientación)",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
	const errors: FormErrors = {};

	if (!values.name.trim()) {
		errors.name = "El nombre es obligatorio.";
	} else if (values.name.trim().length < 2) {
		errors.name = "Ingresá un nombre válido (mínimo 2 caracteres).";
	} else if (values.name.trim().length > 80) {
		errors.name = "El nombre es demasiado largo (máximo 80 caracteres).";
	}

	const hasEmail = values.email.trim().length > 0;
	const hasPhone = values.phone.trim().length > 0;

	if (!hasEmail && !hasPhone) {
		errors.general =
			"Necesitamos al menos un medio de contacto: email o WhatsApp/teléfono.";
	}

	if (hasEmail && !EMAIL_REGEX.test(values.email.trim())) {
		errors.email = "Ingresá un email válido.";
	}

	if (hasPhone && values.phone.trim().length < 7) {
		errors.phone = "Ingresá un número válido (mínimo 7 caracteres).";
	}

	if (values.businessType.trim().length > 120) {
		errors.businessType = "El tipo de negocio no puede superar 120 caracteres.";
	}

	if (!values.message.trim()) {
		errors.message = "Contanos brevemente tu necesidad principal.";
	} else if (values.message.trim().length < 10) {
		errors.message = "Agregá más detalle (mínimo 10 caracteres).";
	} else if (values.message.trim().length > 1000) {
		errors.message = "El mensaje es demasiado largo (máximo 1000 caracteres).";
	}

	return errors;
}

export function ContactFormSection() {
	const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<"idle" | "success">("idle");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [diagnosisContext, setDiagnosisContext] =
		useState<LeadPayload["diagnosis"] | null>(null);
	const hasTrackedFormStart = useRef(false);

	const messageLength = useMemo(
		() => values.message.trim().length,
		[values.message],
	);

	useEffect(() => {
		setDiagnosisContext(readDiagnosisContext());
	}, []);

	function handleChange<K extends keyof FormValues>(
		field: K,
		value: FormValues[K],
	) {
		setValues((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
		setStatus("idle");
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const nextErrors = validate(values);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			setStatus("idle");
			return;
		}

		const payload: LeadPayload = {
			name: values.name.trim(),
			email: values.email.trim(),
			phone: values.phone.trim(),
			businessType: values.businessType.trim(),
			serviceInterest: values.serviceInterest as LeadInterest,
			message: values.message.trim(),
			source: "contact_form",
			diagnosis: diagnosisContext ?? undefined,
		};

		setIsSubmitting(true);

		try {
			const response = await fetch(buildPublicApiUrl("/api/leads"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...payload,
					website: values.website.trim(),
				}),
			});

			const data = (await response.json()) as LeadApiResponse;

			if (!response.ok || !data.ok) {
				const apiErrors: FormErrors = {};

				if (data.errors?.length) {
					for (const error of data.errors) {
						if (error.field in INITIAL_VALUES) {
							apiErrors[error.field as keyof FormValues] = error.message;
						} else {
							apiErrors.general = error.message;
						}
					}
				}

				if (!apiErrors.general) {
					apiErrors.general =
						data.message ||
						"No pudimos procesar tu consulta. Intentá nuevamente.";
				}

				setErrors(apiErrors);
				setStatus("idle");
				return;
			}

			setStatus("success");
			setValues(INITIAL_VALUES);
			setErrors({});
			clearDiagnosisContext();
			setDiagnosisContext(null);
			trackChatFunnelEvent("chat_form_submit", { source: "contact_form" });
		} catch {
			setErrors({
				general:
					"No pudimos enviar tu consulta por un problema de conexión. Intentá nuevamente en unos minutos.",
			});
			setStatus("idle");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section
			id="contacto"
			className="section-form-cosmos relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16"
		>
			<div id="contact-form" className="absolute -top-24 h-px w-px" aria-hidden="true" />
			<div className="pointer-events-none absolute -left-24 top-8 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-[var(--purple-primary)]/18 blur-2xl sm:blur-3xl" />
			<div className="pointer-events-none absolute right-[-8rem] bottom-0 h-56 w-56 sm:h-96 sm:w-96 rounded-full bg-[var(--orange-cta)]/10 blur-2xl sm:blur-3xl" />
			<Container className="relative z-10 space-y-8">
				<SectionHeading
					eyebrow="Contacto"
					title="Dejanos tu caso y te orientamos el próximo paso"
					description="Te pedimos estos datos para recomendarte el mejor próximo paso y contactarte de forma manual."
				/>
				{diagnosisContext ? (
					<p className="motion-fade-up rounded-2xl border border-[var(--purple-soft)]/25 bg-[var(--purple-primary)]/10 px-4 py-3 text-sm text-[var(--text-secondary)]">
						Vamos a enviar también tu diagnóstico orientativo:{" "}
						<span className="font-semibold text-[var(--text-bright)]">
							{diagnosisContext.recommendedSolution}
						</span>
						.
					</p>
				) : null}

				<MotionReveal>
					<Card className="overflow-hidden p-0">
					<form
						noValidate
						onSubmit={handleSubmit}
						onFocusCapture={() => {
							if (!hasTrackedFormStart.current) {
								trackChatFunnelEvent("chat_form_start", {
									source: "contact_form",
								});
								hasTrackedFormStart.current = true;
							}
						}}
						className="space-y-6 p-6 sm:p-8"
						aria-describedby="privacy-note"
					>
						<div className="grid gap-5 sm:grid-cols-2">
							<div className="hidden" aria-hidden="true">
								<label htmlFor="website">Website</label>
								<input
									id="website"
									name="website"
									tabIndex={-1}
									autoComplete="off"
									value={values.website}
									onChange={(e) => handleChange("website", e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium text-[var(--text-primary)]"
								>
									Nombre *
								</label>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									value={values.name}
									onChange={(e) => handleChange("name", e.target.value)}
									placeholder="Ej: Juan Pérez"
									className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] premium-focus"
									required
									maxLength={80}
									aria-invalid={Boolean(errors.name)}
									aria-describedby={errors.name ? "name-error" : undefined}
								/>
								{errors.name ? (
									<p
										id="name-error"
										className="text-xs text-[var(--orange-soft)]"
									>
										{errors.name}
									</p>
								) : null}
							</div>

							<div className="space-y-2">
								<label
									htmlFor="businessType"
									className="text-sm font-medium text-[var(--text-primary)]"
								>
									Tipo de negocio
								</label>
								<input
									id="businessType"
									name="businessType"
									type="text"
									value={values.businessType}
									onChange={(e) => handleChange("businessType", e.target.value)}
									placeholder="Ej: Estudio contable, clínica, e-commerce"
									className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] premium-focus"
									maxLength={120}
									aria-invalid={Boolean(errors.businessType)}
									aria-describedby={
										errors.businessType ? "businessType-error" : undefined
									}
								/>
								{errors.businessType ? (
									<p
										id="businessType-error"
										className="text-xs text-[var(--orange-soft)]"
									>
										{errors.businessType}
									</p>
								) : null}
							</div>

							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-[var(--text-primary)]"
								>
									Email
								</label>
								<input
									id="email"
									inputMode="email"
									name="email"
									type="email"
									autoComplete="email"
									value={values.email}
									onChange={(e) => handleChange("email", e.target.value)}
									placeholder="tu@email.com"
									className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] premium-focus"
									aria-invalid={Boolean(errors.email)}
									aria-describedby={errors.email ? "email-error" : undefined}
								/>
								{errors.email ? (
									<p
										id="email-error"
										className="text-xs text-[var(--orange-soft)]"
									>
										{errors.email}
									</p>
								) : null}
							</div>

							<div className="space-y-2">
								<label
									htmlFor="phone"
									className="text-sm font-medium text-[var(--text-primary)]"
								>
									WhatsApp o teléfono
								</label>
								<input
									id="phone"
									inputMode="tel"
									name="phone"
									type="tel"
									autoComplete="tel"
									value={values.phone}
									onChange={(e) => handleChange("phone", e.target.value)}
									placeholder="Ej: +54 9 11 1234 5678"
									className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] premium-focus"
									aria-invalid={Boolean(errors.phone)}
									aria-describedby={errors.phone ? "phone-error" : undefined}
								/>
								{errors.phone ? (
									<p
										id="phone-error"
										className="text-xs text-[var(--orange-soft)]"
									>
										{errors.phone}
									</p>
								) : null}
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="serviceInterest"
								className="text-sm font-medium text-[var(--text-primary)]"
							>
								Servicio de interés
							</label>
							<select
								id="serviceInterest"
								name="serviceInterest"
								value={values.serviceInterest}
								onChange={(e) =>
									handleChange("serviceInterest", e.target.value)
								}
								className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] premium-focus"
							>
								<option value="" className="text-slate-800">
									Opcional: seleccioná una opción
								</option>
								{SERVICE_OPTIONS.map((option) => (
									<option
										key={option}
										value={option}
										className="text-slate-800"
									>
										{option}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="message"
								className="text-sm font-medium text-[var(--text-primary)]"
							>
								Contanos tu necesidad principal *
							</label>
							<textarea
								required
								maxLength={1000}
								id="message"
								name="message"
								rows={4}
								value={values.message}
								onChange={(e) => handleChange("message", e.target.value)}
								placeholder="Ej: Quiero lanzar una web, ordenar procesos internos o validar un MVP SaaS para mi negocio."
								className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] premium-focus"
								aria-invalid={Boolean(errors.message)}
								aria-describedby={
									errors.message ? "message-error" : "message-help"
								}
							/>
							<div className="flex items-center justify-between gap-3">
								<p
									id="message-help"
									className="text-xs text-[var(--text-soft)]"
								>
									No compartas contraseñas, datos bancarios ni información
									sensible.
								</p>
								<span className="text-xs text-[var(--text-soft)]">
									{messageLength}/1000
								</span>
							</div>
							{errors.message ? (
								<p
									id="message-error"
									className="text-xs text-[var(--orange-soft)]"
								>
									{errors.message}
								</p>
							) : null}
						</div>

						{errors.general ? (
							<p
								role="alert"
								className="motion-fade-up rounded-md border border-[var(--orange-hover)]/35 bg-[var(--orange-hover)]/10 px-3 py-2 text-sm text-[var(--orange-soft)]"
							>
								{errors.general}
							</p>
						) : null}

						{status === "success" ? (
							<p
								role="status"
								aria-live="polite"
								className="motion-fade-up rounded-md border border-[var(--purple-primary)]/40 bg-[var(--purple-primary)]/10 px-3 py-2 text-sm text-[var(--text-accent)]"
							>
								¡Gracias! Recibimos tu consulta y te vamos a responder de forma
								manual por el medio que indicaste.
							</p>
						) : null}

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<p
								id="privacy-note"
								className="max-w-2xl text-xs leading-5 text-[var(--text-soft)]"
							>
								Usaremos tus datos solo para responder tu consulta comercial. No
								pedimos información sensible.
							</p>
							<Button
								type="submit"
								variant="primary"
								className="w-full rounded-xl py-3 text-sm font-semibold shadow-[0_12px_30px_rgba(251,146,60,0.28)] sm:w-auto"
								disabled={isSubmitting}
							>
								{isSubmitting
									? "Enviando consulta..."
									: "Quiero que evalúen mi proyecto"}
							</Button>
						</div>
					</form>
					</Card>
				</MotionReveal>
			</Container>
		</section>
	);
}
