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
    <section className="section-cosmic relative overflow-hidden border-b border-[#26324A] py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-[#7C3AED]/18 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] bottom-0 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[#F97316]/8 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 space-y-8">
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
