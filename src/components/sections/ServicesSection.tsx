import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/data/services';

export function ServicesSection() {
  return (
    <section id="soluciones" className="section-product-depth relative overflow-hidden border-b border-[#26324A] py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-[#4C1D95]/24 blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-[#7C3AED]/12 blur-2xl sm:blur-3xl" />
      <Container className="relative z-10 space-y-9">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow="Soluciones"
            title="Construimos, integramos y escalamos productos digitales"
            description="Desde una landing que valida oferta hasta sistemas internos y MVP SaaS: elegimos la solución según etapa, riesgo y oportunidad."
          />
          <div className="glass-card rounded-2xl p-4 text-xs leading-6 text-[#A8B6CC]">
            <span className="font-semibold text-[#FDBA74]">Disponible ahora:</span> entregas que podés iniciar hoy.{' '}
            <span className="font-semibold text-[#C4B5FD]">Fase avanzada / Proyecto a medida:</span> evoluciones según roadmap, datos y validación.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="glass-card group rounded-3xl p-5 transition hover:-translate-y-1 hover:border-[#A78BFA]/40">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="h-11 w-11 rounded-2xl border border-[#A78BFA]/30 bg-[radial-gradient(circle_at_30%_30%,rgba(167,139,250,0.38),rgba(124,58,237,0.16)_55%,transparent)] shadow-[0_0_24px_rgba(124,58,237,0.28)]" />
                <span
                  className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    service.phase === 'phase-1' ? 'bg-[#F97316]/15 text-[#FDBA74]' : 'bg-[#7C3AED]/20 text-[#C4B5FD]'
                  }`}
                >
                  {service.phase === 'phase-1' ? 'Disponible ahora' : 'Fase avanzada'}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#FFFBF5]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">{service.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
