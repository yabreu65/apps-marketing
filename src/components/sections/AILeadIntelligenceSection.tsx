import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const points = [
  {
    title: 'Atención inicial más rápida',
    description: 'El asistente comercial con IA responde primeras consultas y ayuda a orientar próximos pasos.',
  },
  {
    title: 'Más orden en el seguimiento',
    description: 'Permite resumir contexto y mantener continuidad para no perder oportunidades comerciales.',
  },
  {
    title: 'Recomendaciones accionables',
    description: 'Sugiere caminos realistas según negocio, canal y objetivo, siempre con validación humana.',
  },
  {
    title: 'Implementación por fases',
    description: 'Se integra de forma controlada para acompañar crecimiento, sin promesas exageradas.',
  },
];

export function AILeadIntelligenceSection() {
  return (
    <section id="ia-local" className="section-product-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20">
      <Container className="relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeading
          eyebrow="Asistente comercial con IA"
          title="IA aplicada para orientar y ordenar consultas"
          description="No reemplaza tu equipo: lo ayuda a responder mejor, detectar prioridades y sostener continuidad comercial."
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
