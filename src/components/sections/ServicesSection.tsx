import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const serviceGroups = [
  {
    number: '01',
    stage: 'Ideal para hoy',
    title: 'Presencia digital y captación',
    description:
      'Atraé consultas más claras y calificadas con una propuesta digital que explique mejor lo que vendés.',
    items: ['Landing comercial', 'Web catálogo conectada a WhatsApp'],
  },
  {
    number: '02',
    stage: 'Ideal para hoy',
    title: 'Sistemas y seguimiento',
    description:
      'Ordená consultas, tareas y oportunidades para que el seguimiento no dependa de mensajes sueltos.',
    items: ['Sistema web a medida', 'Panel simple de seguimiento'],
  },
  {
    number: '03',
    stage: 'Ideal para hoy',
    title: 'Marketing y contenido',
    description:
      'Mejorá visibilidad y confianza con contenido orientado a generar más consultas con intención de compra.',
    items: ['SEO inicial', 'Contenido orientado a conversión'],
  },
  {
    number: '04',
    stage: 'Escalable a futuro',
    title: 'Chat inteligente y automatización',
    description:
      'Escalá conversaciones y priorización comercial con automatización gradual, sin perder control humano.',
    items: ['Asistente comercial', 'Automatización gradual'],
  },
];

export function ServicesSection() {
  return (
    <section
      id="soluciones"
      className="section-product-depth relative overflow-hidden border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <p className="mb-10 text-center text-base font-semibold uppercase tracking-[0.22em] text-[var(--purple-soft)] sm:mb-12 sm:text-xl">
        Soluciones
      </p>
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Soluciones para captar, ordenar y crecer"
              description="Te orientamos según tu etapa actual para que avances con foco comercial y un plan claro."
            />

            <MotionReveal className="mt-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-shell-2)]/70 p-5 shadow-[0_18px_60px_rgba(2,6,23,0.35)]">
              <p className="text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                Empezamos por lo más rentable para hoy y dejamos lista la base para escalar por etapas.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-[var(--text-soft)] sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-soft)]" />
                  Claridad comercial desde la primera visita
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-soft)]" />
                  Seguimiento más ordenado y previsible
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-soft)]" />
                  Escalado progresivo sin rehacer todo
                </li>
              </ul>
              <Button
                href="#diagnostico"
                className="mt-5 w-full rounded-full px-5 py-2.5 text-sm sm:w-auto"
              >
                Quiero recomendación para mi caso
              </Button>
            </MotionReveal>
          </div>

          <MotionReveal className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
            {serviceGroups.map((group, index) => (
              <article
                key={group.title}
                className={`motion-fade-up hover-lift group border-b border-[var(--border-subtle)] p-5 last:border-b-0 hover:bg-[var(--bg-hover)]/40 sm:p-6 ${
                  index === 1
                    ? 'motion-delay-100'
                    : index === 2
                      ? 'motion-delay-200'
                      : index === 3
                        ? 'motion-delay-300'
                        : ''
                }`}
              >
                <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--purple-soft)]/30 bg-[var(--purple-primary)]/12 text-sm font-semibold text-[var(--text-bright)] shadow-[0_0_28px_rgba(124,58,237,0.18)]">
                    {group.number}
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--purple-soft)] sm:text-xs">
                      {group.stage}
                    </p>

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
          </MotionReveal>
        </div>

      </Container>
    </section>
  );
}
