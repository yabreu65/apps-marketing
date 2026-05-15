import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const problems = [
  'Tu propuesta no se entiende en pocos segundos.',
  'Tenés tráfico o alcance, pero pocas conversaciones útiles.',
  'El canal digital no está diseñado para convertir interés en contacto.',
];

export function ProblemSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#111827] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Problema"
          title="El problema no es tener web: es no tener sistema comercial digital"
          description="Cuando el canal digital no está diseñado como sistema de captación y seguimiento, el crecimiento se vuelve impredecible."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((item) => (
            <Card key={item}>
              <p className="text-sm text-[#CBD5E1] sm:text-base">{item}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
