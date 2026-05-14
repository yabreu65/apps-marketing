import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/data/services';

export function ServicesSection() {
  return (
    <section id="servicios" className="border-b border-[#26324A] bg-[#111827] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Servicios"
          title="Desarrollo web y productos digitales para cada etapa de crecimiento"
          description="Desde soluciones comerciales de entrada hasta proyectos a medida y evoluciones avanzadas, según tu objetivo y el momento de tu negocio."
        />
        <p className="text-xs text-[#94A3B8]">
          <span className="font-semibold text-[#FDBA74]">Disponible ahora:</span> entregas que podés iniciar hoy.{' '}
          <span className="font-semibold text-[#C4B5FD]">Fase avanzada / Proyecto a medida:</span> evoluciones según roadmap y validación.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className={service.phase === 'future' ? 'border-dashed border-[#7C3AED]/40 bg-[#111827]' : ''}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-[#FFFBF5]">{service.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    service.phase === 'phase-1' ? 'bg-[#F97316]/15 text-[#FDBA74]' : 'bg-[#7C3AED]/20 text-[#C4B5FD]'
                  }`}
                >
                  {service.phase === 'phase-1' ? 'Disponible ahora' : 'Fase avanzada'}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#CBD5E1]">{service.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
