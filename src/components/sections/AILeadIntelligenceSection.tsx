import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const points = [
  {
    title: 'Resumen comercial local',
    description: 'Generamos un resumen útil para seguimiento con reglas claras y opción de IA local controlada.',
  },
  {
    title: 'Lead scoring explicable',
    description: 'Priorización 0-100 con señales visibles para decidir el próximo paso sin automatizar decisiones.',
  },
  {
    title: 'Contexto operativo',
    description: 'Notas internas, timeline y estado del lead para mantener continuidad comercial con trazabilidad.',
  },
  {
    title: 'IA local opcional',
    description: 'Integración con Ollama local como capacidad opcional. Sin enviar datos a servicios externos.',
  },
];

export function AILeadIntelligenceSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="AI Lead Intelligence"
          title="Inteligencia comercial para leads"
          description="Combinamos estructura comercial y soporte de IA local opcional para priorizar oportunidades con criterio humano, sin automatizaciones externas."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <Card key={point.title}>
              <h3 className="text-base font-semibold text-[#FFFBF5]">{point.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{point.description}</p>
            </Card>
          ))}
        </div>

        <p className="text-xs text-[#94A3B8]">Capacidad local y controlada: sin envío de datos a terceros, sin IA externa productiva y sin acciones automáticas sobre leads.</p>
      </Container>
    </section>
  );
}
