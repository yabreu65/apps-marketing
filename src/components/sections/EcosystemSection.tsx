import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ecosystemItems = [
  {
    name: 'BuildingOS',
    //badge: 'Producto propio',
    description: 'Administración de edificios, unidades, procesos y operación diaria.',
    proof: 'Experiencia en sistemas operativos y datos reales.',
  },
  {
    name: 'JurisManager',
    //badge: 'Solución especializada',
    description: 'Gestión legal de casos, clientes, estados y seguimiento interno.',
    proof: 'Experiencia ordenando flujos complejos de trabajo.',
  },
  {
    name: 'SEO / Marketing Tools',
    //badge: 'Marketing y crecimiento',
    description: 'Herramientas para visibilidad, contenido y generación de consultas.',
    proof: 'Experiencia conectando presencia digital con oportunidades.',
  },
];

export function EcosystemSection() {
  return (
    <section
      id="ecosistema"
      className="section-ecosystem-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--purple-soft)]/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[var(--purple-primary)]/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="relative top-[-50px] mb-4 text-xl text-center sm:text-2xl font-semibold uppercase tracking-[0.32em] text-[var(--purple-soft)]">
              Ecosistema real
            </p>

            <SectionHeading
              title="Experiencia construyendo productos, no solo páginas"
              description="Aplicamos aprendizajes de sistemas reales, herramientas de marketing y procesos comerciales para crear soluciones más claras, útiles y escalables."
            />

            <div className="motion-fade-up motion-delay-100 mt-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-shell-2)]/70 p-5 shadow-[0_18px_60px_rgba(2,6,23,0.35)]">
              <p className="text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                Apps Marketing es el punto de entrada: empezamos con una web, landing o sistema simple,
                y podemos evolucionar por fases hacia seguimiento, dashboard, automatización o IA aplicada.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
            {ecosystemItems.map((item, index) => (
              <article
                key={item.name}
                className={`motion-fade-up hover-lift group border-b border-[var(--border-subtle)] p-5 last:border-b-0 hover:bg-[var(--bg-hover)]/40 sm:p-6 ${
                  index === 1 ? 'motion-delay-100' : index === 2 ? 'motion-delay-200' : ''
                }`}
              >
                <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--purple-soft)]/30 bg-[var(--purple-primary)]/12 text-sm font-semibold text-[var(--text-bright)] shadow-[0_0_28px_rgba(124,58,237,0.18)]">
                    0{index + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-[var(--warm-white)] sm:text-xl">
                        {item.name}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                      {item.description}
                    </p>

                    <p className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/55 px-4 py-3 text-sm leading-6 text-[var(--text-soft)]">
                      {item.proof}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
