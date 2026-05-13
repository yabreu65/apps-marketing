import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const pillars = [
  {
    title: 'Narrativa comercial clara',
    description: 'Mensaje directo para que el visitante entienda qué hacés, para quién y qué acción tomar.',
  },
  {
    title: 'CTA manual de alta intención',
    description: 'WhatsApp manual y contacto simple para acelerar conversaciones reales sin fricción técnica.',
  },
  {
    title: 'Base preparada para crecer',
    description: 'Arquitectura frontend sólida para evolucionar por fases cuando la validación comercial lo justifique.',
  },
];

export function SolutionSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Solución"
          title="Landing comercial orientada a acción"
          description="Fase 1 se enfoca en comunicar valor, activar contacto y medir señales de conversión iniciales sin complejidad innecesaria."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title}>
              <h3 className="text-lg font-semibold text-[#FFFBF5]">{pillar.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
