'use client';

import { useMemo, useState } from 'react';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { diagnosisQuestions } from '@/data/project-diagnosis';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { DiagnosisResult, RecommendedSolution } from '@/types/diagnosis';

type Answers = {
  goal?: string;
  stage?: string;
  urgency?: string;
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
  let recommendedSolution: RecommendedSolution = 'Sitio web profesional';
  let nextActionOverride: string | undefined;

  if (goal === 'leads') recommendedSolution = 'Landing comercial';
  else if (goal === 'web') recommendedSolution = 'Sitio web profesional';
  else if (goal === 'system') {
    recommendedSolution = answers.stage === 'manual' ? 'Dashboard / panel interno' : 'Sistema web a medida';
  } else if (goal === 'saas') recommendedSolution = 'MVP SaaS';
  else if (goal === 'automation') recommendedSolution = 'Automatización comercial';
  else if (goal === 'ai') recommendedSolution = 'IA aplicada al negocio (fase avanzada)';
  else if (goal === 'unsure') {
    nextActionOverride = 'Siguiente paso: contanos tu situación actual y te ayudamos a elegir el camino correcto.';
    if (answers.stage === 'noconvert') recommendedSolution = 'Landing comercial';
    else if (answers.stage === 'manual') recommendedSolution = 'Sistema web a medida';
    else if (answers.stage === 'scale') recommendedSolution = 'MVP SaaS';
    else recommendedSolution = 'Sitio web profesional';
  }

  return {
    recommendedSolution,
    rationale:
      'Esta recomendación es orientativa. Podemos revisarla según tu contexto real y prioridad comercial.',
    nextAction: nextActionOverride ?? getNextAction(recommendedSolution),
  };
}

export function ProjectDiagnosisSection() {
  const [answers, setAnswers] = useState<Answers>({});
  const [mobileStep, setMobileStep] = useState(0);

  const result = useMemo(() => getDiagnosis(answers), [answers]);

  const whatsappHref = useMemo(() => {
    const messagesBySolution: Record<RecommendedSolution, string> = {
      'Landing comercial':
        'Hola, hice el diagnóstico y creo que necesito una landing comercial. Quiero orientación para mi proyecto.',
      'Sitio web profesional':
        'Hola, hice el diagnóstico y quiero evaluar un sitio web profesional para mi negocio.',
      'Sistema web a medida':
        'Hola, hice el diagnóstico y quiero evaluar un sistema web a medida para mi negocio.',
      'Dashboard / panel interno':
        'Hola, hice el diagnóstico y quiero evaluar un dashboard/panel interno para mi equipo.',
      'MVP SaaS': 'Hola, hice el diagnóstico y quiero evaluar un MVP SaaS para mi idea.',
      'Automatización comercial':
        'Hola, hice el diagnóstico y quiero evaluar automatización comercial para mi negocio.',
      'IA aplicada al negocio (fase avanzada)':
        'Hola, hice el diagnóstico y quiero evaluar IA aplicada para mi negocio en una fase avanzada.',
    };

    const message = result
      ? messagesBySolution[result.recommendedSolution]
      : 'Hola, quiero ayuda para definir qué solución digital necesito para mi negocio.';

    return buildWhatsAppLink('+54 9 11 0000 0000', message);
  }, [result]);

  const activeQuestion = diagnosisQuestions[mobileStep];
  const activeValue = answers[activeQuestion.id as keyof Answers];
  const canContinue = Boolean(activeValue);

  return (
    <section id="project-diagnosis" className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-12 sm:py-16">
      <div className="pointer-events-none absolute left-[-6rem] top-10 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[var(--purple-primary)]/18 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-0 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[var(--orange-cta)]/8 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 space-y-6 sm:space-y-8">
        <SectionHeading
          eyebrow="Diagnóstico orientativo"
          title="Si no sabés por dónde empezar, respondé 3 preguntas"
          description="Te recomendamos un primer paso claro según tu situación actual."
        />

        <div className="space-y-4 lg:hidden">
          <Card className="p-4">
            <p className="mb-2 text-xs text-[var(--text-soft)]">Paso {mobileStep + 1} de {diagnosisQuestions.length}</p>
            <h3 className="text-sm font-semibold text-[var(--warm-white)]">{activeQuestion.title}</h3>
            <div className="mt-3 flex flex-col gap-1.5">
              {activeQuestion.options.map((option) => {
                const isSelected = answers[activeQuestion.id as keyof Answers] === option.value;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [activeQuestion.id]: option.value }))}
                    className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                      isSelected
                        ? 'border-[var(--orange-cta)] bg-[var(--orange-cta)]/15 text-[var(--warm-white)]'
                        : 'border-[var(--purple-soft)]/20 bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] hover:border-[var(--purple-primary)]/50 hover:bg-[var(--purple-primary)]/10'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setMobileStep((prev) => Math.max(prev - 1, 0))}
                disabled={mobileStep === 0}
                className="rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-xs text-[var(--text-secondary)] disabled:opacity-50"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => setMobileStep((prev) => Math.min(prev + 1, diagnosisQuestions.length - 1))}
                disabled={!canContinue || mobileStep === diagnosisQuestions.length - 1}
                className="rounded-md bg-[var(--orange-cta)] px-3 py-1.5 text-xs font-semibold text-[var(--warm-white)] disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </Card>
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-3">
          {diagnosisQuestions.map((question) => (
            <Card key={question.id}>
              <h3 className="text-sm font-semibold text-[var(--warm-white)]">{question.title}</h3>
              <div className="mt-3 flex flex-col gap-2">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.value;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                      className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                        isSelected
                          ? 'border-[var(--orange-cta)] bg-[var(--orange-cta)]/15 text-[var(--warm-white)]'
                          : 'border-[var(--purple-soft)]/20 bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] hover:border-[var(--purple-primary)]/50 hover:bg-[var(--purple-primary)]/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="text-base font-semibold text-[var(--warm-white)]">Recomendación</h3>
          {result ? (
            <>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Punto de partida sugerido: <span className="font-semibold text-[var(--orange-soft)]">{result.recommendedSolution}</span>
              </p>
              <p className="mt-3 text-sm text-[var(--text-bright)]">{result.nextAction}</p>
              <p className="mt-3 text-xs text-[var(--text-soft)]">{result.rationale}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Completá las tres preguntas para ver la recomendación.</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-[var(--orange-cta)] px-4 py-2 text-sm font-semibold text-[var(--warm-white)] hover:bg-[var(--orange-hover)]"
            >
              Continuar por WhatsApp
            </a>
            <a
              href="#contact-form"
              className="rounded-md border border-[var(--purple-primary)]/50 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--purple-primary)]/15"
            >
              Completar formulario
            </a>
          </div>
        </Card>
      </Container>
    </section>
  );
}
