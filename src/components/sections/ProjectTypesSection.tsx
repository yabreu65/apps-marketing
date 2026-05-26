import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const stages = [
  {
    title: 'Estoy empezando',
    recommendation: 'Ordenamos propuesta, oferta y presencia inicial para que el negocio se entienda y genere primeras consultas.',
  },
  {
    title: 'Ya recibo consultas',
    recommendation: 'Optimizamos mensaje, canales y web para mejorar calidad de consultas y aumentar conversaciones útiles.',
  },
  {
    title: 'Pierdo seguimiento',
    recommendation: 'Definimos un flujo de respuesta y continuidad para no perder oportunidades por falta de orden comercial.',
  },
  {
    title: 'Necesito sistema',
    recommendation: 'Diseñamos una base operativa con procesos claros, seguimiento y datos para decidir mejor.',
  },
  {
    title: 'Quiero IA',
    recommendation: 'Aplicamos IA en casos concretos para responder mejor, priorizar oportunidades y reducir tareas repetitivas.',
  },
  {
    title: 'Quiero validar SaaS',
    recommendation: 'Bajamos la idea a un MVP de alcance controlado para validar demanda y aprender rápido con riesgo acotado.',
  },
];

export function ProjectTypesSection() {
  return (
    <section id="ruta-etapa" className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20">
      <Container className="relative z-10 space-y-8">
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

        <div className="flex justify-center">
          <Button href="#contacto" className="rounded-full px-6 py-3 text-sm sm:text-base">
            Elegir mi punto de partida
          </Button>
        </div>
      </Container>
    </section>
  );
}
