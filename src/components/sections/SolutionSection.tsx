import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const pillars = [
  {
    title: 'Estrategia comercial clara',
    description: 'Mensaje directo para que el visitante entienda qué hacés, para quién es y cuál es el siguiente paso.',
  },
  {
    title: 'Contacto y conversión sin fricción',
    description: 'Canales de contacto simples para acelerar conversaciones reales con foco comercial.',
  },
  {
    title: 'Base tecnológica para crecer',
    description: 'Estructura web sólida para evolucionar hacia soluciones más avanzadas cuando el negocio lo requiera.',
  },
];

export function SolutionSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Solución"
          title="Soluciones digitales orientadas a acción"
          description="Creamos experiencias web claras, rápidas y alineadas a tus objetivos comerciales: desde una landing hasta un sistema o producto SaaS."
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
