'use client';

import { useMemo, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { diagnosisQuestions } from '@/data/project-diagnosis';
import { getDiagnosisResponseCopy } from '@/data/diagnosis-response-copy';
import { saveDiagnosisContext } from '@/lib/diagnosis-context';
import type { DiagnosisResult, RecommendedSolution } from '@/types/diagnosis';
import type {
  LeadDiagnosisGoal,
  LeadDiagnosisStage,
  LeadDiagnosisUrgency,
} from '@/types/lead';

type Answers = {
  goal?: LeadDiagnosisGoal;
  stage?: LeadDiagnosisStage;
  urgency?: LeadDiagnosisUrgency;
};

function getNextAction(solution: RecommendedSolution): string {
  const nextActions: Record<RecommendedSolution, string> = {
    'Landing comercial':
      'Siguiente paso: revisamos tu oferta y canal de captación para definir una landing clara y accionable.',
    'Sitio web profesional':
      'Siguiente paso: definimos páginas clave, servicios y estructura de confianza para tu negocio.',
    'Sistema web a medida':
      'Siguiente paso: mapeamos tus procesos actuales para ordenar y digitalizar lo que más impacto tenga.',
    'Dashboard / panel interno':
      'Siguiente paso: identificamos qué datos necesitás ver para decidir más rápido.',
    'MVP SaaS':
      'Siguiente paso: bajamos tu idea a una versión inicial con funcionalidades esenciales.',
    'Automatización comercial':
      'Siguiente paso: revisamos tareas repetitivas y flujo comercial antes de automatizar.',
    'IA aplicada al negocio (fase avanzada)':
      'Siguiente paso: detectamos casos concretos donde IA sume valor real sin complejidad innecesaria.',
  };

  return nextActions[solution];
}

function getDiagnosis(answers: Answers): DiagnosisResult | null {
  if (!answers.goal || !answers.stage || !answers.urgency) return null;

  const goal = answers.goal;
  const stage = answers.stage;
  let recommendedSolution: RecommendedSolution = 'Sitio web profesional';
  let nextActionOverride: string | undefined;

  if (goal === 'leads') recommendedSolution = 'Landing comercial';
  else if (goal === 'web') recommendedSolution = 'Sitio web profesional';
  else if (goal === 'system') {
    recommendedSolution =
      answers.stage === 'manual' ? 'Dashboard / panel interno' : 'Sistema web a medida';
  } else if (goal === 'saas') recommendedSolution = 'MVP SaaS';
  else if (goal === 'automation') recommendedSolution = 'Automatización comercial';
  else if (goal === 'ai') {
    if (stage === 'manual') {
      recommendedSolution = 'Automatización comercial';
      nextActionOverride =
        'Siguiente paso: primero revisamos tus procesos manuales y detectamos qué parte conviene ordenar o automatizar sin perder control humano. Si aplica, sumamos un chat inteligente o asistente comercial por fases.';
    } else {
      recommendedSolution = 'IA aplicada al negocio (fase avanzada)';
    }
  }
  else if (goal === 'unsure') {
    nextActionOverride =
      'Siguiente paso: contanos tu situación actual y te ayudamos a elegir el camino correcto.';

    if (answers.stage === 'noconvert') recommendedSolution = 'Landing comercial';
    else if (answers.stage === 'manual') recommendedSolution = 'Sistema web a medida';
    else if (answers.stage === 'scale') recommendedSolution = 'MVP SaaS';
    else recommendedSolution = 'Sitio web profesional';
  }

  return {
    recommendedSolution,
    rationale:
      'Esta recomendación es orientativa. Podemos ajustarla según tu contexto real, presupuesto, urgencia y prioridad comercial.',
    nextAction: nextActionOverride ?? getNextAction(recommendedSolution),
  };
}

export function ProjectDiagnosisSection() {
  const [answers, setAnswers] = useState<Answers>({});
  const [mobileStep, setMobileStep] = useState(0);
  const [hasSubmittedDiagnosis, setHasSubmittedDiagnosis] = useState(false);

  const result = useMemo(() => getDiagnosis(answers), [answers]);
  const responseCopy = useMemo(() => {
    if (!answers.goal || !answers.stage || !answers.urgency) return null;
    return getDiagnosisResponseCopy(answers.goal, answers.stage, answers.urgency);
  }, [answers.goal, answers.stage, answers.urgency]);

  const answeredCount = diagnosisQuestions.filter(
    (question) => answers[question.id as keyof Answers],
  ).length;

  const progress = Math.round((answeredCount / diagnosisQuestions.length) * 100);

  const activeQuestion = diagnosisQuestions[mobileStep];
  const activeValue = answers[activeQuestion.id as keyof Answers];
  const canContinue = Boolean(activeValue);
  const isLastMobileStep = mobileStep === diagnosisQuestions.length - 1;
  const canShowRecommendation = Boolean(
    hasSubmittedDiagnosis && answers.goal && answers.stage && answers.urgency && result,
  );
  const canSubmitDiagnosis = Boolean(answers.goal && answers.stage && answers.urgency);

  function handleAnswerChange(field: keyof Answers, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasSubmittedDiagnosis(false);
  }

  function handleResetDiagnosis() {
    setAnswers({});
    setHasSubmittedDiagnosis(false);
    setMobileStep(0);
  }

  return (
    <section
      id="diagnostico"
      className="section-cosmic relative overflow-hidden scroll-mt-24 border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div id="project-diagnosis" className="absolute -top-24 h-px w-px" aria-hidden="true" />

      <div
        className="pointer-events-none absolute left-[-6rem] top-10 h-52 w-52 rounded-full bg-[var(--purple-primary)]/18 blur-3xl sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-[-4rem] bottom-0 h-52 w-52 rounded-full bg-[var(--cyan-accent)]/10 blur-3xl sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Diagnóstico orientativo"
              title="Si no sabés por dónde empezar, respondé 3 preguntas"
              description="Te recomendamos un primer paso claro según tu situación actual, sin vueltas y sin venderte algo que no necesitás."
            />

            <MotionReveal className="mt-6 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
              {canShowRecommendation ? (
                <div
                  key={`${answers.goal ?? ''}-${answers.stage ?? ''}-${answers.urgency ?? ''}`}
                  className="motion-scale-in mt-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--purple-soft)]">
                    Punto de partida sugerido
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[var(--text-bright)]">
                    {responseCopy?.displayTitle ?? responseCopy?.recommendation ?? result?.recommendedSolution}
                  </h3>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--purple-soft)]">
                    Situación actual
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                    {responseCopy?.situation}
                  </p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--purple-soft)]">
                    Siguiente paso recomendado
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {responseCopy?.nextStep ?? result?.nextAction}
                  </p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--purple-soft)]">
                    Qué evitaríamos por ahora
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {responseCopy?.avoid}
                  </p>

                  {responseCopy?.note ? (
                    <p className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/55 px-4 py-3 text-xs leading-5 text-[var(--text-soft)]">
                      {responseCopy.note}
                    </p>
                  ) : null}

                  <p className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/55 px-4 py-3 text-xs leading-5 text-[var(--text-soft)]">
                    {result?.rationale}
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-[var(--text-bright)]">
                    Completá las preguntas
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    Completá las 3 preguntas y presioná “Ver recomendación” para ver el resultado.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {canShowRecommendation ? (
                  <>
                    <p className="w-full text-sm leading-6 text-[var(--text-secondary)]">
                      Dejanos tus datos y te respondemos con una recomendación más concreta para tu caso.
                    </p>
                    <a
                      href="#contacto"
                      onClick={() => {
                        if (!result || !answers.goal || !answers.stage || !answers.urgency) return;

                        saveDiagnosisContext({
                          goal: answers.goal,
                          stage: answers.stage,
                          urgency: answers.urgency,
                          recommendedSolution:
                            responseCopy?.recommendation ?? result.recommendedSolution,
                        });
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--orange-cta)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(79,70,229,0.3)] transition hover:bg-[var(--orange-hover)]"
                    >
                      Completar formulario
                    </a>
                    <button
                      type="button"
                      onClick={handleResetDiagnosis}
                      className="inline-flex items-center justify-center rounded-full border border-[var(--purple-primary)]/50 px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--purple-primary)]/15"
                    >
                      Reiniciar diagnóstico
                    </button>
                  </>
                ) : null}
              </div>
            </MotionReveal>
          </div>

          <MotionReveal className="order-1 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 shadow-[0_24px_80px_rgba(2,6,23,0.45)] lg:order-2" delay="100">
            <div className="border-b border-[var(--border-subtle)] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[var(--text-bright)]">
                  Diagnóstico rápido
                </p>
                <p className="text-xs text-[var(--text-soft)]">
                  {answeredCount} de {diagnosisQuestions.length} respuestas
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg-primary)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--purple-primary)] to-[var(--cyan-accent)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="space-y-4 lg:hidden">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--purple-soft)]">
                    Paso {mobileStep + 1} de {diagnosisQuestions.length}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[var(--warm-white)]">
                    {activeQuestion.title}
                  </h3>

                  <div className="mt-4 flex flex-col gap-2">
                    {activeQuestion.options.map((option) => {
                      const isSelected =
                        answers[activeQuestion.id as keyof Answers] === option.value;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            handleAnswerChange(
                              activeQuestion.id as keyof Answers,
                              option.value,
                            )
                          }
                          className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                            isSelected
                              ? 'scale-[1.01] border-[var(--orange-cta)] bg-[var(--orange-cta)] text-white shadow-[0_14px_40px_rgba(79,70,229,0.22)]'
                              : 'border-[var(--purple-soft)]/20 bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] hover:border-[var(--purple-primary)]/50 hover:bg-[var(--purple-primary)]/10'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setMobileStep((prev) => Math.max(prev - 1, 0))}
                    disabled={mobileStep === 0}
                    className="rounded-full border border-[var(--border-subtle)] px-4 py-2.5 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] disabled:opacity-50"
                  >
                    Volver
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileStep((prev) =>
                        Math.min(prev + 1, diagnosisQuestions.length - 1),
                      )
                    }
                    disabled={!canContinue || isLastMobileStep}
                    className="rounded-full bg-[var(--orange-cta)] px-4 py-2.5 text-sm font-semibold text-[var(--warm-white)] transition hover:bg-[var(--orange-hover)] disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setHasSubmittedDiagnosis(true)}
                  disabled={!canSubmitDiagnosis}
                  className="rounded-full bg-[var(--orange-cta)] px-4 py-2.5 text-sm font-semibold text-[var(--warm-white)] transition hover:bg-[var(--orange-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {hasSubmittedDiagnosis ? 'Actualizar recomendación' : 'Ver recomendación'}
                </button>
              </div>

              <div className="hidden gap-4 lg:grid">
                {diagnosisQuestions.map((question, index) => (
                  <article
                    key={question.id}
                    className={`motion-fade-up rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/50 p-5 ${
                      index === 1 ? 'motion-delay-100' : index === 2 ? 'motion-delay-200' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[var(--purple-soft)]/30 bg-[var(--purple-primary)]/12 text-sm font-semibold text-[var(--text-bright)]">
                        0{index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-[var(--warm-white)]">
                          {question.title}
                        </h3>

                        <div className="mt-4">
                          <select
                            value={answers[question.id as keyof Answers] ?? ''}
                            onChange={(event) =>
                              handleAnswerChange(
                                question.id as keyof Answers,
                                event.target.value,
                              )
                            }
                            className="w-full rounded-2xl bg-[var(--orange-cta)] px-4 py-3 text-sm text-[var(--text-secondary)] outline-none transition focus:border-[var(--purple-primary)]/60 focus:ring-2 focus:ring-[var(--purple-primary)]/20"
                          >
                            <option value="" disabled>
                              Seleccioná una opción
                            </option>
                            {question.options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
                <button
                  type="button"
                  onClick={() => setHasSubmittedDiagnosis(true)}
                  disabled={!canSubmitDiagnosis}
                  className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[var(--orange-cta)] px-5 py-3 text-sm font-semibold text-[var(--warm-white)] transition hover:bg-[var(--orange-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {hasSubmittedDiagnosis ? 'Actualizar recomendación' : 'Ver recomendación'}
                </button>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
