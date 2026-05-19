import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ecosystemItems = [
  {
    name: 'BuildingOS',
    description: 'Administración de edificios, unidades y operación diaria.',
    badge: 'Producto propio',
  },
  {
    name: 'JurisManager',
    description: 'Gestión legal de casos, clientes y procesos internos.',
    badge: 'Solución especializada',
  },
  {
    name: 'SEO / Marketing Tools',
    description: 'Herramientas para visibilidad, contenido y consultas.',
    badge: 'Marketing y crecimiento',
  },
  {
    name: 'Apps Marketing',
    description: 'Web, sistemas, marketing e IA aplicada por etapas.',
    badge: 'Servicio principal',
  },
];

export function EcosystemSection() {
  return (
    <section id="ecosistema" className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16">
      <Container className="relative z-10 space-y-7">
        <SectionHeading
          eyebrow="Ecosistema de soluciones"
          title="Experiencia real en productos y servicios"
          description="Mostramos capacidades que usamos para resolver captación, seguimiento y operación sin distraer del objetivo comercial."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemItems.map((item) => (
            <Card key={item.name} className="p-4">
              <span className="inline-flex rounded-full border border-[var(--purple-soft)]/30 bg-[var(--purple-primary)]/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-accent)]">
                {item.badge}
              </span>
              <h3 className="mt-2.5 text-sm font-semibold text-[var(--warm-white)]">{item.name}</h3>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
