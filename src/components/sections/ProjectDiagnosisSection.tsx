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
      'Siguiente paso: revisamos tu oferta, público objetivo y canal de captación para definir una landing clara y accionable.',
    'Sitio web profesional':
      'Siguiente paso: definimos las páginas clave, servicios y estructura de confianza que necesita tu negocio.',
    'Sistema web a medida':
      'Siguiente paso: mapeamos tus procesos actuales para detectar qué se puede ordenar, medir o digitalizar.',
    'Dashboard / panel interno':
      'Siguiente paso: identificamos qué datos necesitás ver y qué decisiones querés tomar más rápido.',
    'MVP SaaS':
      'Siguiente paso: bajamos tu idea a un primer producto viable, con usuarios, problema y funcionalidades esenciales.',
    'Automatización comercial':
      'Siguiente paso: revisamos tareas repetitivas, canales y datos antes de automatizar.',
    'IA aplicada al negocio (fase avanzada)':
      'Siguiente paso: identificamos casos de uso concretos donde la IA pueda ayudar sin agregar complejidad innecesaria.',
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
      'Esta recomendación es orientativa. Podemos revisarla con vos según el contexto real de tu negocio y tus prioridades comerciales.',
    nextAction: nextActionOverride ?? getNextAction(recommendedSolution),
  };
}

export function ProjectDiagnosisSection() {
  const [answers, setAnswers] = useState<Answers>({});

  const result = useMemo(() => getDiagnosis(answers), [answers]);

  const whatsappHref = useMemo(() => {
    const message = result
      ? `Hola, completé el diagnóstico y quiero avanzar con: ${result.recommendedSolution}.`
      : 'Hola, quiero ayuda para definir qué solución digital necesito para mi negocio.';

    return buildWhatsAppLink('+54 9 11 0000 0000', message);
  }, [result]);

  return (
    <section id="project-diagnosis" className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Diagnóstico orientativo"
          title="Descubrí qué tipo de solución digital te conviene"
          description="Respondé estas preguntas rápidas y obtené una recomendación inicial para tu proyecto."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {diagnosisQuestions.map((question) => (
            <Card key={question.id}>
              <h3 className="text-sm font-semibold text-[#FFFBF5]">{question.title}</h3>
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
                          ? 'border-[#F97316] bg-[#F97316]/15 text-[#FFFBF5]'
                          : 'border-[#26324A] bg-[#111827] text-[#CBD5E1] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10'
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
          <h3 className="text-base font-semibold text-[#FFFBF5]">Recomendación</h3>
          {result ? (
            <>
              <p className="mt-2 text-sm text-[#CBD5E1]">
                Según tus respuestas, el mejor punto de partida sería: <span className="font-semibold text-[#FDBA74]">{result.recommendedSolution}</span>
              </p>
              <p className="mt-3 text-sm text-[#E2E8F0]">{result.nextAction}</p>
              <p className="mt-3 text-xs text-[#94A3B8]">{result.rationale}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-[#CBD5E1]">Completá las tres preguntas para ver una recomendación orientativa.</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-[#F97316] px-4 py-2 text-sm font-semibold text-[#FFFBF5] hover:bg-[#EA580C]"
            >
              Hablar por WhatsApp
            </a>
            <a
              href="#contact-form"
              className="rounded-md border border-[#7C3AED]/50 px-4 py-2 text-sm font-semibold text-[#CBD5E1] hover:bg-[#7C3AED]/15"
            >
              Ir al formulario
            </a>
          </div>
        </Card>
      </Container>
    </section>
  );
}
