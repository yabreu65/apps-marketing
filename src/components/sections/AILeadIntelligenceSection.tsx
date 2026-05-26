import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const points = [
  {
    title: 'Asistente para consultas',
    description: 'Da una primera orientación comercial y ayuda a responder más rápido sin perder contexto.',
  },
  {
    title: 'Resumen de leads',
    description: 'Condensa información clave de cada conversación para seguir con criterio y continuidad.',
  },
  {
    title: 'Clasificación por intención',
    description: 'Prioriza oportunidades según señales comerciales para enfocar mejor el esfuerzo del equipo.',
  },
  {
    title: 'Próximos pasos recomendados',
    description: 'Sugiere acciones concretas y automatización gradual con control humano.',
  },
];

export function AILeadIntelligenceSection() {
  return (
    <section id="ia-local" className="section-product-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20">
      <Container className="relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeading
          eyebrow="Asistente comercial con IA"
          title="IA para responder mejor, priorizar oportunidades y reducir tareas repetitivas."
          description="Se aplica por etapas para mejorar decisiones comerciales sin perder supervisión humana."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <article key={point.title} className="glass-card rounded-3xl p-5">
              <h3 className="text-base font-semibold text-[var(--warm-white)]">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{point.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
