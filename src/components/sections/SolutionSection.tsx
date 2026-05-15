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
    <section className="section-violet-depth relative overflow-hidden border-b border-[#26324A] py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/3 top-0 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-[#A78BFA]/12 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[#7C3AED]/18 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 space-y-8">
        <SectionHeading
          eyebrow="Solución"
          title="Soluciones digitales orientadas a acción"
          description="Creamos experiencias web claras, rápidas y alineadas a tus objetivos comerciales: desde una landing hasta un sistema o producto SaaS."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title}>
              <div className="mb-4 h-9 w-9 rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/16 shadow-[0_0_24px_rgba(124,58,237,0.25)]" />
              <h3 className="text-lg font-semibold text-[#FFFBF5]">{pillar.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
