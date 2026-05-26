import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const marketingPillars = [
  {
    title: 'Claridad de oferta y mensaje',
    description:
      'Traducimos tu propuesta a una comunicación simple para que el cliente entienda rápido qué resolvés y por qué elegirte.',
  },
  {
    title: 'Adquisición y canales con intención',
    description:
      'Alineamos canales, campañas y llamadas a la acción para atraer consultas más calificadas.',
  },
  {
    title: 'Contenido y medición para decidir',
    description:
      'Medimos señales de conversión para optimizar oferta, mensaje y próximos pasos comerciales.',
  },
];

export function MarketingSection() {
  return (
    <section
      id="marketing"
      className="section-cosmic relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--orange-soft)]/45 to-transparent"
        aria-hidden="true"
      />
      <Container className="relative z-10 space-y-8 sm:space-y-10">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="Marketing digital"
            title="Captación y conversión con foco comercial"
            description="Trabajamos mensaje, oferta, adquisición, contenido, campañas y medición para convertir atención en oportunidades reales."
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionReveal className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
            {marketingPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`motion-fade-up border-b border-[var(--border-subtle)] p-6 last:border-b-0 sm:p-7 ${
                  index === 1 ? 'motion-delay-100' : index === 2 ? 'motion-delay-200' : ''
                }`}
              >
                <h3 className="text-xl font-semibold text-[var(--warm-white)] sm:text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{pillar.description}</p>
              </article>
            ))}
          </MotionReveal>

          <MotionReveal delay="100" className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-shell-2)]/72 p-6 shadow-[0_20px_65px_rgba(2,6,23,0.4)] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange-soft)]">
              Enfoque comercial
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-[var(--text-bright)]">
              Menos ruido táctico, más decisiones que convierten.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Priorizamos canales, mensajes y pasos de seguimiento para que el esfuerzo de marketing termine en oportunidades reales de negocio.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--text-soft)]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--orange-soft)]" />
                Lectura de señales comerciales
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--orange-soft)]" />
                Priorización por impacto
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--orange-soft)]" />
                Iteración continua por etapas
              </li>
            </ul>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
