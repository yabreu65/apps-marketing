import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const serviceGroups = [
  {
    number: '01',
    title: 'Presencia digital y captación',
    description:
      'Para negocios que necesitan explicar mejor lo que venden y recibir consultas más calificadas.',
    items: ['Landing comercial', 'Web catálogo conectada a WhatsApp'],
  },
  {
    number: '02',
    title: 'Sistemas y seguimiento',
    description:
      'Para ordenar consultas, tareas y oportunidades sin depender solo de mensajes sueltos.',
    items: ['Sistema web a medida', 'Panel simple de seguimiento'],
  },
  {
    number: '03',
    title: 'Marketing y contenido',
    description:
      'Para mejorar visibilidad, confianza y entrada de consultas desde canales digitales.',
    items: ['SEO inicial', 'Contenido orientado a conversión'],
  },
  {
    number: '04',
    title: 'Chat inteligente y automatización',
    description:
      'Para asistir conversaciones, priorizar oportunidades y automatizar por fases sin perder control humano.',
    items: ['Asistente comercial', 'Automatización gradual'],
  },
];

export function ServicesSection() {
  return (
    <section
      id="soluciones"
      className="section-product-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <p className="text-xl sm:text-2xl mb-12 text-center font-semibold uppercase tracking-[0.32em] text-[var(--purple-soft)]">
        Soluciones
      </p>
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Qué podemos construir para tu negocio"
              description="Elegimos el camino según tu etapa, tus canales actuales y el nivel de seguimiento que necesitás."
            />

            <div className="mt-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-shell-2)]/70 p-5 shadow-[0_18px_60px_rgba(2,6,23,0.35)]">
              <p className="text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                Podemos empezar simple con una landing o catálogo, y evolucionar
                por fases hacia dashboard, automatización o IA aplicada.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
            {serviceGroups.map((group) => (
              <article
                key={group.title}
                className="group border-b border-[var(--border-subtle)] p-5 transition duration-300 last:border-b-0 hover:bg-[var(--bg-hover)]/40 sm:p-6"
              >
                <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--purple-soft)]/30 bg-[var(--purple-primary)]/12 text-sm font-semibold text-[var(--text-bright)] shadow-[0_0_28px_rgba(124,58,237,0.18)]">
                    {group.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--warm-white)] sm:text-xl">
                      {group.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                      {group.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/65 px-3 py-1.5 text-xs font-medium text-[var(--text-soft)] sm:text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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
