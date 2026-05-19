import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const stages = [
  {
    title: 'Estoy empezando y necesito presencia',
    recommendation: 'Landing o web profesional para presentar tu propuesta y facilitar contacto.',
  },
  {
    title: 'Ya vendo y quiero recibir más consultas',
    recommendation: 'Landing enfocada en conversión con oferta y llamada clara a la acción.',
  },
  {
    title: 'Recibo consultas pero pierdo seguimiento',
    recommendation: 'Web catálogo + orden de consultas para responder con continuidad.',
  },
  {
    title: 'Tengo procesos manuales y necesito sistema',
    recommendation: 'Sistema web a medida para ordenar operación y decisiones.',
  },
  {
    title: 'Quiero validar un producto digital',
    recommendation: 'MVP por fases para aprender con bajo riesgo inicial.',
  },
  {
    title: 'Quiero sumar IA o automatización',
    recommendation: 'Implementación gradual con foco en impacto real y control.',
  },
];

export function ProjectTypesSection() {
  return (
    <section id="ruta-etapa" className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16">
      <Container className="relative z-10 space-y-7">
        <SectionHeading
          eyebrow="Ruta según tu etapa"
          title="Elegí tu siguiente paso"
          description="Ubicá tu etapa actual y mirá qué camino te conviene hoy."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage) => (
            <Card key={stage.title} className="p-4">
              <h3 className="text-sm font-semibold text-[var(--warm-white)]">{stage.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{stage.recommendation}</p>
              <p className="mt-2 text-xs font-medium text-[var(--text-accent)]">Me pasa esto</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
