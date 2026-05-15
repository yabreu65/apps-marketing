import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const pillars = [
  {
    title: 'Producto antes que código',
    description: 'Definimos objetivo, usuario y valor antes de implementar, para evitar features sin impacto real.',
  },
  {
    title: 'Web + sistemas en un solo flujo',
    description: 'Conectamos captación comercial y operación interna para que marketing y ejecución trabajen alineados.',
  },
  {
    title: 'IA local y controlada',
    description: 'Aplicamos inteligencia comercial con enfoque local y opcional, sin depender de proveedores externos.',
  },
  {
    title: 'Conversión + operación',
    description: 'Diseñamos soluciones que ayudan a vender mejor y a sostener el crecimiento con procesos más claros.',
  },
];

export function WhyUsSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Why us"
          title="Por qué trabajar con Yoryi AI Studio"
          description="Combinamos enfoque de producto, ingeniería web y visión comercial para construir soluciones útiles desde el día uno."
        />

        <div className="grid gap-4 md:grid-cols-2">
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
