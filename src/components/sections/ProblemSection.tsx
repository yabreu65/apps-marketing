import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const problems = [
  'Dependés solo de Instagram o WhatsApp y cuesta ordenar la atención.',
  'Llegan consultas, pero se pierden por falta de seguimiento.',
  'Tu página actual no convierte o no transmite confianza.',
  'Hay procesos manuales que te hacen perder tiempo y foco comercial.',
  'No hay una presencia digital clara para mostrar servicios o productos.',
  'No tenés visibilidad para priorizar oportunidades reales.',
];

export function ProblemSection() {
  return (
    <section className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20">
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Problemas frecuentes"
          title="Muchos negocios no fallan por falta de trabajo, fallan por falta de sistema"
          description="Cuando la captación y el seguimiento no están ordenados, se pierden oportunidades."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((item) => (
            <Card key={item}>
              <p className="text-sm text-[var(--text-secondary)] sm:text-base">{item}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
